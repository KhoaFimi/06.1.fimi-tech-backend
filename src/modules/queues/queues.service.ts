import { InjectQueue } from '@nestjs/bullmq'
import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { Queue } from 'bullmq'

import { OTP_QUEUE_NAME } from '@/constants/queue.constant'
import { SendOtpDto } from '@/modules/queues/dtos/send-otp.dto'

@Injectable()
export class QueuesService {
	constructor(
		@InjectQueue(OTP_QUEUE_NAME)
		private readonly otpQueue: Queue
	) {}

	@OnEvent('send.verification-otp')
	async addSendVerificationOtpQueue(payload: SendOtpDto) {
		await this.otpQueue.add(
			'verification',
			{
				id: payload.id,
				email: payload.email
			},
			{ removeOnComplete: true }
		)
	}

	@OnEvent('send.reset-password-otp')
	async addSendResetPasswordOtpQueue(payload: SendOtpDto) {
		await this.otpQueue.add(
			'reset-password',
			{
				id: payload.id,
				email: payload.email
			},
			{ removeOnComplete: true }
		)
	}
}
