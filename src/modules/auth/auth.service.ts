import {
	ConflictException,
	Injectable,
	NotAcceptableException,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter'
import * as argon2 from 'argon2'

import { ErrorCode } from '@/constraints/code.constraints'
import { SignInDto } from '@/modules/auth/dto/sign-in.dto'
import { SignUpDto } from '@/modules/auth/dto/sign-up.dto'
import { PartnersService } from '@/modules/partners/partners.service'
import { SendOtpDto } from '@/modules/queues/dtos/send-otp.dto'
import { AccessTokenService } from '@/modules/tokens/services/access-token.service'
import { RefreshTokenService } from '@/modules/tokens/services/refresh-token.service'
import { UsersService } from '@/modules/users/users.service'

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly partnersService: PartnersService,
		private readonly accessTokenService: AccessTokenService,
		private readonly refreshTokenService: RefreshTokenService,
		private readonly eventEmiter: EventEmitter2
	) {}

	public async signUp(signUpDto: SignUpDto) {
		const { fullname, email, password, phone, ref, tnc } = signUpDto

		if (!tnc)
			throw new NotAcceptableException(
				'Vui lòng chấp nhận các điểu khoản sử dụng của chúng tôi !',
				{
					description: ErrorCode.NO_TNC_ERROR
				}
			)

		if (!signUpDto.partnerCode)
			throw new NotAcceptableException('Yêu cầu mã Partner', {
				description: ErrorCode.MISSING_ERROR
			})

		const [existingUser, existingPartner] = await Promise.all([
			this.usersService.findOneByUnique({ email }),
			this.partnersService.findOneByUnique({ code: signUpDto.partnerCode })
		])

		if (existingUser)
			throw new ConflictException('Người dùng đã tồn tại trong hệ thống', {
				description: ErrorCode.DUPLICATED_ERROR
			})

		if (!existingPartner)
			throw new NotFoundException('Mã partner không chính xác', {
				description: ErrorCode.NOT_FOUND_ERROR
			})

		const hashedPassword = await argon2.hash(password)

		if (ref) {
			const existingManager = await this.usersService.findOneByUnique({
				id: ref
			})

			if (!existingManager)
				throw new NotFoundException('Link tuyển dụng không chính xác', {
					description: ErrorCode.NOT_FOUND_ERROR
				})

			const newPublisher = await this.usersService.create({
				code: `${existingPartner.code}${phone.substring(1)}`,
				fullname,
				email,
				phone,
				password: hashedPassword,
				tnc,
				manager: {
					connect: {
						id: existingManager.id
					}
				},
				partner: {
					connect: {
						id: existingPartner.id
					}
				}
			})

			this.eventEmiter.emit(
				'send.verification',
				new SendOtpDto({
					id: newPublisher.id,
					email: newPublisher.email,
					partner: existingPartner
				})
			)

			return {
				verificationKey: newPublisher.id
			}
		}

		const newPublisher = await this.usersService.create({
			code: `${existingPartner.code}${phone.substring(1)}`,
			fullname,
			email,
			phone,
			password: hashedPassword,
			tnc,
			partner: {
				connect: {
					id: existingPartner.id
				}
			}
		})

		this.eventEmiter.emit(
			'send.verification',
			new SendOtpDto({
				id: newPublisher.id,
				email: newPublisher.email,
				partner: existingPartner
			})
		)

		return {
			verificationKey: newPublisher.id
		}
	}

	public async signIn(signInDto: SignInDto) {
		const { email, password } = signInDto

		const existingUser = await this.usersService.findOneByUnique(
			{
				email
			},
			{
				include: {
					partner: true
				},
				omit: {}
			}
		)

		if (!existingUser)
			throw new NotFoundException('Thông tin đăng nhập không chính xác', {
				description: ErrorCode.WRONG_CREDENTIALS_ERROR,
				cause: {
					credentialError: [
						{
							field: 'email',
							detail: 'Email không chính xác'
						}
					]
				}
			})

		if (!existingUser.emailVerified) {
			this.eventEmiter.emit(
				'send.verification',
				new SendOtpDto({
					id: existingUser.id,
					email: existingUser.email,
					partner: existingUser.partner
				})
			)

			throw new NotAcceptableException('Tài khoản chưa được xác thực', {
				description: ErrorCode.NOT_VERIFIED,
				cause: {
					data: {
						verificationKey: existingUser.id
					}
				}
			})
		}

		const verifyPassword = await argon2.verify(existingUser.password, password)

		if (!verifyPassword)
			throw new UnauthorizedException('Thông tin đăng nhập không chính xác', {
				description: ErrorCode.WRONG_CREDENTIALS_ERROR,
				cause: {
					credentialError: [
						{
							field: 'password',
							detail: 'Password không chính xác'
						}
					]
				}
			})

		const res = await this.genTokenPair(existingUser.id, existingUser.roles)

		return {
			user: existingUser,
			...res
		}
	}

	@OnEvent('logout')
	public async signOut(id: string) {
		const existingUser = await this.usersService.findOneByUnique({
			id
		})

		if (!existingUser)
			throw new NotFoundException('Người dùng không tồn tại', {
				description: ErrorCode.NOT_FOUND_ERROR
			})

		await this.usersService.update(id, {
			refreshToken: null
		})
	}

	public async genTokenPair(id: string, roles: number) {
		const { accessToken } = await this.accessTokenService.generate({
			sub: id,
			roles
		})

		const { refreshToken } = await this.refreshTokenService.generate({
			sub: id
		})

		return {
			accessToken,
			refreshToken
		}
	}
}
