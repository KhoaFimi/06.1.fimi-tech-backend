import {
	BadRequestException,
	ConflictException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import * as argon2 from 'argon2'

import { ErrorCode } from '@/constraints/code.constraints'
import {
	ChangeEmaiDto,
	RequestChangeEmailDto
} from '@/modules/accounts/dtos/change-email.dto'
import { ChangePasswordDto } from '@/modules/accounts/dtos/change-password.dto'
import { ChangeUserPhoneDto } from '@/modules/accounts/dtos/change-user-phone.dto'
import { ForgotPasswordDto } from '@/modules/accounts/dtos/forgot-password.dto'
import { NewVerificationDto } from '@/modules/accounts/dtos/new-verification.dto'
import { ResetPasswordDto } from '@/modules/accounts/dtos/reset-password.dto'
import { UpdateUserInfoDto } from '@/modules/accounts/dtos/update-user-info.dto'
import { AddIdentifierCardImageDto } from '@/modules/queues/dtos/add-identifier-card-image.dto'
import { AddPotraitImageDto } from '@/modules/queues/dtos/add-potrait-image.dto'
import { AddUserAvatarDto } from '@/modules/queues/dtos/add-user-media.dto'
import { SendOtpDto } from '@/modules/queues/dtos/send-otp.dto'
import { ChangeEmailTokenService } from '@/modules/tokens/services/change-email-token.service'
import { ResetPasswordTokenService } from '@/modules/tokens/services/reset-password-token.service'
import { VerificationTokenService } from '@/modules/tokens/services/verification-token.service'
import { UsersService } from '@/modules/users/users.service'

@Injectable()
export class AccountsService {
	constructor(
		private readonly usersService: UsersService,
		private readonly verificationTokenService: VerificationTokenService,
		private readonly resetPasswordTokenService: ResetPasswordTokenService,
		private readonly changeEmailTokenService: ChangeEmailTokenService,
		private readonly eventEmiter: EventEmitter2
	) {}

	public async newVerification(newVerificationDto: NewVerificationDto) {
		const { verificationKey, token } = newVerificationDto

		const res = await this.verificationTokenService.verify(
			token,
			verificationKey
		)

		await this.usersService.update(res.identifier, {
			emailVerified: new Date()
		})
	}

	public async getNewVerifySession(verificationKey: string) {
		const existingUser = await this.usersService.findOneByUnique({
			id: verificationKey
		})

		if (!existingUser)
			throw new NotFoundException('Verification key không chính xác', {
				description: ErrorCode.NOT_FOUND_ERROR
			})

		if (existingUser.emailVerified)
			throw new ConflictException('Người dùng đã xác thực', {
				description: ErrorCode.DUPLICATED_ERROR
			})

		this.eventEmiter.emit(
			'send.verification',
			new SendOtpDto({
				id: existingUser.id,
				email: existingUser.email
			})
		)
		return {
			verificationKey: existingUser.id
		}
	}

	public async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
		const existingUser = await this.usersService.findOneByUnique(
			{
				email: forgotPasswordDto.email
			},
			{
				include: {
					partner: true
				},
				omit: {}
			}
		)

		if (!existingUser)
			throw new NotFoundException('Email không chính xác', {
				description: ErrorCode.WRONG_CREDENTIALS_ERROR
			})

		this.eventEmiter.emit(
			'send.reset-password',
			new SendOtpDto({
				id: existingUser.id,
				email: existingUser.email,
				partner: existingUser.partner
			})
		)

		return {
			verificationKey: existingUser.id
		}
	}

	public async resetPassword(resetPasswordDto: ResetPasswordDto) {
		const { verificationKey, token, password } = resetPasswordDto

		const res = await this.resetPasswordTokenService.verify(
			token,
			verificationKey
		)

		const hashedPassword = await argon2.hash(password)

		await this.usersService.update(res.identifier, {
			password: hashedPassword
		})
	}

	async checkExistingUser(id: string) {
		const existinngUser = await this.usersService.findOneById(id)

		if (!existinngUser)
			throw new NotFoundException('Không tìm thấy người dùng tương ứng', {
				description: ErrorCode.NOT_FOUND_ERROR,
				cause: {
					validationError: [{ field: 'id', detail: 'Id không chính xác' }]
				}
			})

		return existinngUser
	}

	async changeInfo(id: string, updateUserDto: UpdateUserInfoDto) {
		const existingUser = await this.checkExistingUser(id)

		const res = await this.usersService.update(existingUser.id, {
			...updateUserDto,
			profile: {
				set: {
					...updateUserDto.profile
				}
			},
			document: {
				set: {
					...updateUserDto.document
				}
			}
		})

		return res
	}

	async changePassword(id: string, changePasswordDto: ChangePasswordDto) {
		const existingUser = await this.checkExistingUser(id)

		const verifyOldPassword = await argon2.verify(
			existingUser.password,
			changePasswordDto.oldPassword
		)

		if (!verifyOldPassword)
			throw new BadRequestException('Mật khẩu không chính xác', {
				description: ErrorCode.WRONG_CREDENTIALS_ERROR,
				cause: {
					validationError: [
						{
							field: 'oldPassword',
							detail: 'Mật khẩu hiện tại không chính xác'
						}
					]
				}
			})

		const hashedNewPassword = await argon2.hash(changePasswordDto.newPassword)

		await this.usersService.update(id, {
			password: hashedNewPassword
		})

		this.eventEmiter.emit('logout', id)
	}

	async changePhone(id: string, changePhoneDto: ChangeUserPhoneDto) {
		const [existingUser, existingUserPhone] = await Promise.all([
			this.usersService.findOneById(id),
			this.usersService.findOneByUnique({ phone: changePhoneDto.phone })
		])

		if (!existingUser)
			throw new NotFoundException('Không tìm thấy người dùng tương ứng', {
				description: ErrorCode.NOT_FOUND_ERROR,
				cause: {
					validationError: [{ field: 'id', detail: 'Id không chính xác' }]
				}
			})

		if (existingUserPhone)
			throw new ConflictException('Số điện thoại đã tồn tại', {
				description: ErrorCode.DUPLICATED_ERROR,
				cause: {
					validationError: [
						{ field: 'phone', detail: 'Số điện thoại đã tồn tại trên hệ thống' }
					]
				}
			})

		const res = await this.usersService.update(existingUser.id, {
			phone: changePhoneDto.phone
		})

		return res
	}

	async requestChangeEmail(
		id: string,
		requestChangeEmailDto: RequestChangeEmailDto
	) {
		const [existingUser, existingUserEmail] = await Promise.all([
			this.usersService.findOneById(id),
			this.usersService.findOneByUnique({
				email: requestChangeEmailDto.newEmail
			})
		])

		if (!existingUser)
			throw new NotFoundException('Không tìm thấy người dùng tương ứng', {
				description: ErrorCode.NOT_FOUND_ERROR,
				cause: {
					validationError: [{ field: 'id', detail: 'Id không chính xác' }]
				}
			})

		if (existingUserEmail)
			throw new ConflictException('Email đã được sử dụng', {
				description: ErrorCode.DUPLICATED_ERROR,
				cause: {
					validationError: [
						{
							field: 'newEmail',
							detail: 'Email đã được sử dụng bởi người dúng khác'
						}
					]
				}
			})

		this.eventEmiter.emit(
			'send.change-email',
			new SendOtpDto({
				id: existingUser.id,
				email: requestChangeEmailDto.newEmail
			})
		)

		return {
			verificationKey: existingUser.id
		}
	}

	async changeEmail(changeEmailDto: ChangeEmaiDto) {
		const { verificationKey, otp } = changeEmailDto

		const { identifier, newEmail } = await this.changeEmailTokenService.verify(
			otp,
			verificationKey
		)

		const res = await this.usersService.update(identifier, {
			email: newEmail,
			emailVerified: new Date()
		})

		return res
	}

	async changeAvatar(id: string, avatar: Express.Multer.File) {
		const existingUser = await this.checkExistingUser(id)

		await this.eventEmiter.emit(
			'add.user-avatar',
			new AddUserAvatarDto({
				id: existingUser.id,
				avatar: avatar
			})
		)
	}

	async addIdentifierCardImage(
		id: string,
		files: { front?: Express.Multer.File[]; back?: Express.Multer.File[] }
	) {
		const existingUser = await this.checkExistingUser(id)

		await this.eventEmiter.emit(
			'add.user-identifier-image',
			new AddIdentifierCardImageDto({
				id: existingUser.id,
				front: files.front[0],
				back: files.back[0]
			})
		)
	}

	async addPotraitImage(id: string, potrait: Express.Multer.File) {
		const existingUser = await this.checkExistingUser(id)

		await this.eventEmiter.emit(
			'add.user-potrait',
			new AddPotraitImageDto({
				id: existingUser.id,
				potrait
			})
		)
	}
}
