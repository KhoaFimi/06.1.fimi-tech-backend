import { InjectQueue } from '@nestjs/bullmq'
import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { Queue } from 'bullmq'

import {
	ADD_CAMPAIGN_MEDIA_QUEUE_NAME,
	OTP_QUEUE_NAME,
	UPLOAD_USER_MEDIA_QUEUE_NAME
} from '@/constants/queue.constant'
import { AddCampaignMediaDto } from '@/modules/queues/dtos/add-campaign-media.dto'
import { AddIdentifierCardImageDto } from '@/modules/queues/dtos/add-identifier-card-image.dto'
import { AddPotraitImageDto } from '@/modules/queues/dtos/add-potrait-image.dto'
import { AddUserAvatarDto } from '@/modules/queues/dtos/add-user-media.dto'
import { SendOtpDto } from '@/modules/queues/dtos/send-otp.dto'

@Injectable()
export class QueuesService {
	constructor(
		@InjectQueue(OTP_QUEUE_NAME)
		private readonly otpQueue: Queue,
		@InjectQueue(ADD_CAMPAIGN_MEDIA_QUEUE_NAME)
		private readonly campaignQueue: Queue,
		@InjectQueue(UPLOAD_USER_MEDIA_QUEUE_NAME)
		private readonly uploadUserMediaQueue: Queue
	) {}

	@OnEvent('send.verification')
	async addSendVerificationQueue(payload: SendOtpDto) {
		await this.otpQueue.add(
			'verification',
			{
				id: payload.id,
				email: payload.email,
				partner: payload.partner
			},
			{ removeOnComplete: true }
		)
	}

	@OnEvent('send.reset-password')
	async addSendResetPasswordOtpQueue(payload: SendOtpDto) {
		await this.otpQueue.add(
			'reset-password',
			{
				id: payload.id,
				email: payload.email,
				partner: payload.partner
			},
			{ removeOnComplete: true }
		)
	}

	@OnEvent('send.change-email')
	async addSendChangeEmailOtpQueue(payload: SendOtpDto) {
		await this.otpQueue.add(
			'change-email',
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

	@OnEvent('add.user-avatar')
	async addUserAvatar(payload: AddUserAvatarDto) {
		await this.uploadUserMediaQueue.add('upload-avatar', {
			id: payload.id,
			avatar: payload.avatar
		})
	}

	@OnEvent('add.user-identifier-image')
	async addUserIdentifierImage(payload: AddIdentifierCardImageDto) {
		await this.uploadUserMediaQueue.add('upload-identifier-card-image', {
			id: payload.id,
			front: payload.front,
			back: payload.back
		})
	}

	@OnEvent('add.user-potrait')
	async addUserPotrait(payload: AddPotraitImageDto) {
		await this.uploadUserMediaQueue.add('upload-potrait', {
			id: payload.id,
			potrait: payload.potrait
		})
	}
}
