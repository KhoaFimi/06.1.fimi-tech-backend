import { Processor, WorkerHost } from '@nestjs/bullmq'
import { Job } from 'bullmq'
import { CloudinaryService } from 'nestjs-cloudinary'

import { ADD_CAMPAIGN_MEDIA_QUEUE_NAME } from '@/constants/queue.constant'
import { CampaignsService } from '@/modules/campaigns/campaigns.service'

@Processor(ADD_CAMPAIGN_MEDIA_QUEUE_NAME)
export class AddCampaignMediaProcessor extends WorkerHost {
	constructor(
		private readonly cloudinaryService: CloudinaryService,
		private readonly campaignService: CampaignsService
	) {
		super()
	}

	async process(job: Job<any, any, string>, _token?: string): Promise<any> {
		switch (job.name) {
			case 'upload-campaign-image':
				await this.uploadCampaignImages(
					job.data.id,
					job.data.images,
					job.data.video,
					'campaign-image'
				)
				break
			default:
				throw new Error('No job name match')
		}
	}

	private async uploadCampaignImages(
		id: string,
		files: Express.Multer.File[],
		video: string,
		folder: string = 'public'
	) {
		const images: {
			key: string
			url: string
		}[] = []

		for (const file of files) {
			const res = await this.cloudinaryService.uploadFile(
				{
					...file,
					buffer: Buffer.from(file.buffer)
				},
				{
					folder
				}
			)

			images.push({
				key: res.public_id,
				url: res.secure_url
			})
		}

		const res = await this.campaignService.update(id, {
			images,
			video
		})

		return res
	}
}
