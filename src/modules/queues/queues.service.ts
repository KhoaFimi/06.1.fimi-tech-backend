import { InjectQueue } from '@nestjs/bullmq'
import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { Queue } from 'bullmq'

import {
	ADD_CAMPAIGN_MEDIA_QUEUE_NAME,
	OTP_QUEUE_NAME
} from '@/constants/queue.constant'
import { AddCampaignMediaDto } from '@/modules/queues/dtos/add-campaign-media.dto'
import { SendOtpDto } from '@/modules/queues/dtos/send-otp.dto'

@Injectable()
export class QueuesService {
	constructor(
		@InjectQueue(OTP_QUEUE_NAME)
		private readonly otpQueue: Queue,
		@InjectQueue(ADD_CAMPAIGN_MEDIA_QUEUE_NAME)
		private readonly campaignQueue: Queue
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

	@OnEvent('add.campaign-media')
	async addCampaignMediaQueue(payload: AddCampaignMediaDto) {
		await this.campaignQueue.add('upload-campaign-image', {
			images: payload.images,
			video: payload.video,
			id: payload.id
		})
	}
}
