import { InjectQueue } from '@nestjs/bullmq'
import {
	BadRequestException,
	ConflictException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import * as argon2 from 'argon2'
import { Queue } from 'bullmq'

import {
	OTP_QUEUE_NAME,
	UPLOAD_USER_MEDIA_QUEUE_NAME
} from '@/constants/queue.constant'
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
import { AuthService } from '@/modules/auth/auth.service'
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
		private readonly authService: AuthService,
		@InjectQueue(UPLOAD_USER_MEDIA_QUEUE_NAME)
		private readonly uploadUserMediaQueue: Queue,
		@InjectQueue(OTP_QUEUE_NAME)
		private readonly otpQueue: Queue
	) {}

	public async newVerification(newVerificationDto: NewVerificationDto) {
		const { verificationKey, token } = newVerificationDto

		const res = await this.verificationTokenService.verify(
			token,
			verificationKey
		)

		if (res.isVerified) {
			return
		}

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

		await this.otpQueue.add(
			'verification',
			{
				id: existingUser.id,
				email: existingUser.email,
				partner: existingUser.partner
			},
			{ removeOnComplete: true }
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

		await this.otpQueue.add(
			'reset-password',
			{
				id: existingUser.id,
				email: existingUser.email,
				partner: existingUser.partner
			},
			{ removeOnComplete: true }
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

		await this.authService.signOut(existingUser.id)
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

		await this.otpQueue.add(
			'change-email',
			{
				id: existingUser.id,
				email: existingUser.email
			},
			{ removeOnComplete: true }
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
		await this.uploadUserMediaQueue.add(
			'upload-avatar',
			{
				id,
				avatar
			},
			{ removeOnComplete: 1000, removeOnFail: 1000 }
		)
	}

	async addIdentifierCardImage(
		id: string,
		files: { front?: Express.Multer.File[]; back?: Express.Multer.File[] }
	) {
		await this.uploadUserMediaQueue.add(
			'upload-identifier-card-image',
			{
				id,
				front: files.front[0],
				back: files.back[0]
			},
			{ removeOnComplete: 1000, removeOnFail: 1000 }
		)
	}

	async addPotraitImage(id: string, potrait: Express.Multer.File) {
		await this.uploadUserMediaQueue.add(
			'upload-potrait',
			{
				id,
				potrait
			},
			{
				removeOnComplete: 1000,
				removeOnFail: 1000
			}
		)
	}
}
