import { InjectQueue } from '@nestjs/bullmq'
import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { Queue } from 'bullmq'

import { ADD_CAMPAIGN_MEDIA_QUEUE_NAME } from '@/constants/queue.constant'
import { AddCampaignMediaDto } from '@/modules/queues/dtos/add-campaign-media.dto'

@Injectable()
export class QueuesService {
	constructor(
		@InjectQueue(ADD_CAMPAIGN_MEDIA_QUEUE_NAME)
		private readonly campaignQueue: Queue
	) {}

	@OnEvent('add.campaign-media')
	async addCampaignMediaQueue(payload: AddCampaignMediaDto) {
		await this.campaignQueue.add('upload-campaign-image', {
			images: payload.images,
			video: payload.video,
			id: payload.id
		})
	}
}
