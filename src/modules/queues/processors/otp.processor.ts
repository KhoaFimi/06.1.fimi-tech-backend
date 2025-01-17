import { Processor, WorkerHost } from '@nestjs/bullmq'
import { MailerService } from '@nestjs-modules/mailer'
import { Job } from 'bullmq'

import { OTP_QUEUE_NAME } from '@/constants/queue.constant'
import { ResetPasswordTokenService } from '@/modules/tokens/services/reset-password-token.service'
import { VerificationTokenService } from '@/modules/tokens/services/verification-token.service'

@Processor(OTP_QUEUE_NAME)
export class OtpProcessor extends WorkerHost {
	constructor(
		private readonly verificationTokenService: VerificationTokenService,
		private readonly resetPasswordTokenService: ResetPasswordTokenService,
		private readonly mailerService: MailerService
	) {
		super()
	}

	async process(job: Job<any, any, string>, _token?: string): Promise<any> {
		switch (job.name) {
			case 'verification':
				await this.sendVerificationOtpMail(job.data.id, job.data.email)
				break
			case 'reset-password':
				await this.sendResetPasswordOtpMail(job.data.id, job.data.email)
				break
			default:
				throw new Error('No job name match')
		}
	}

	private async sendVerificationOtpMail(id: string, email: string) {
		const res = await this.verificationTokenService.generate(id)

		await this.mailerService.sendMail({
			subject: 'OTP xác nhận tài khoản',
			text: `OTP: ${res.otp}`,
			to: email
		})
	}

	private async sendResetPasswordOtpMail(id: string, email: string) {
		const res = await this.resetPasswordTokenService.generate(id)

		await this.mailerService.sendMail({
			subject: 'OTP lấy lại mật khẩu',
			text: `OTP: ${res.otp}`,
			to: email
		})
	}
}
