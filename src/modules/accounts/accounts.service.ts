import { Injectable, NotFoundException } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import * as argon2 from 'argon2'

import { ErrorCode } from '@/constraints/code.constraints'
import { ForgotPasswordDto } from '@/modules/accounts/dtos/forgot-password.dto'
import { NewVerificationDto } from '@/modules/accounts/dtos/new-verification.dto'
import { ResetPasswordDto } from '@/modules/accounts/dtos/reset-password.dto'
import { SendOtpDto } from '@/modules/queues/dtos/send-otp.dto'
import { ResetPasswordTokenService } from '@/modules/tokens/services/reset-password-token.service'
import { VerificationTokenService } from '@/modules/tokens/services/verification-token.service'
import { UsersService } from '@/modules/users/users.service'

@Injectable()
export class AccountsService {
	constructor(
		private readonly usersService: UsersService,
		private readonly verificationTokenService: VerificationTokenService,
		private readonly resetPasswordTokenService: ResetPasswordTokenService,
		private readonly eventEmiter: EventEmitter2
	) {}

	public async newVerification(newVerificationDto: NewVerificationDto) {
		const { verificationKey, otp } = newVerificationDto

		const res = await this.verificationTokenService.verify(otp, verificationKey)

		await this.usersService.update(res.identifier, {
			emailVerified: new Date()
		})
	}

	public async getNewOtp(verificationKey: string) {
		const existingUser = await this.usersService.findOneByUnique({
			id: verificationKey
		})

		if (!existingUser)
			throw new NotFoundException('Verification key không chính xác', {
				description: ErrorCode.NOT_FOUND_ERROR
			})

		this.eventEmiter.emit(
			'send.verification-otp',
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
		const existingUser = await this.usersService.findOneByUnique({
			email: forgotPasswordDto.email
		})

		if (!existingUser)
			throw new NotFoundException('Email không chính xác', {
				description: ErrorCode.WRONG_CREDENTIALS_ERROR
			})

		this.eventEmiter.emit(
			'send.reset-password-otp',
			new SendOtpDto({
				id: existingUser.id,
				email: existingUser.email
			})
		)

		return {
			verificationKey: existingUser.id
		}
	}

	public async resetPassword(resetPasswordDto: ResetPasswordDto) {
		const { verificationKey, otp, password } = resetPasswordDto

		const res = await this.resetPasswordTokenService.verify(
			otp,
			verificationKey
		)

		const hashedPassword = await argon2.hash(password)

		await this.usersService.update(res.identifier, {
			password: hashedPassword
		})
	}
}
