import { Processor, WorkerHost } from '@nestjs/bullmq'
import { MailerService } from '@nestjs-modules/mailer'
import { Partner } from '@prisma/client'
import { Job } from 'bullmq'

import { OTP_QUEUE_NAME } from '@/constants/queue.constant'
import { ChangeEmailTokenService } from '@/modules/tokens/services/change-email-token.service'
import { ResetPasswordTokenService } from '@/modules/tokens/services/reset-password-token.service'
import { VerificationTokenService } from '@/modules/tokens/services/verification-token.service'
import { ApiConfigService } from '@/shared/services/api-config.service'

@Processor(OTP_QUEUE_NAME)
export class VerifyProcessor extends WorkerHost {
	constructor(
		private readonly config: ApiConfigService,
		private readonly verificationTokenService: VerificationTokenService,
		private readonly resetPasswordTokenService: ResetPasswordTokenService,
		private readonly changeEmailTokenService: ChangeEmailTokenService,
		private readonly mailerService: MailerService
	) {
		super()
	}

	async process(job: Job<any, any, string>, _token?: string): Promise<any> {
		switch (job.name) {
			case 'verification':
				await this.sendVerificationMail(
					job.data.id,
					job.data.email,
					job.data.partner
				)
				break
			case 'reset-password':
				await this.sendResetPasswordOtpMail(
					job.data.id,
					job.data.email,
					job.data.partner
				)
				break
			case 'change-email':
				await this.sendChangeEmailOtpMail(job.data.id, job.data.email)
				break
			default:
				throw new Error('No job name match')
		}
	}

	private async sendVerificationMail(
		id: string,
		email: string,
		partner: Partner
	) {
		const res = await this.verificationTokenService.generate(id)

		await this.mailerService.sendMail({
			subject: `[${partner.name}] - Xác thực tài khoản`,
			text: `Link: ${this.config.frontendBaseUrl}/account/verification?token=${res.token}&key=${id}
        logo: ${partner.assest.logo.url},
        primary color: ${partner.assest.priamaryColor},
        secondary color: ${partner.assest.secondaryColor}
      `,
			to: email
		})
	}

	private async sendResetPasswordOtpMail(
		id: string,
		email: string,
		partner: Partner
	) {
		const res = await this.resetPasswordTokenService.generate(id)

		await this.mailerService.sendMail({
			subject: `[${partner.name}] - Lấy lại mật khẩu`,
			text: `Link: ${this.config.frontendBaseUrl}/account/reset-password?token=${res.token}&key=${id}
      logo: ${partner.assest.logo.url},
      primary color: ${partner.assest.priamaryColor},
      secondary color: ${partner.assest.secondaryColor}
    `,
			to: email
		})
	}

	private async sendChangeEmailOtpMail(id: string, newEmail: string) {
		const res = await this.changeEmailTokenService.generate(id, newEmail)

		await this.mailerService.sendMail({
			subject: 'OTP thay đổi email',
			text: `OTP: ${res.otp}`,
			to: newEmail
		})
	}
}
