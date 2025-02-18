import { Processor, WorkerHost } from '@nestjs/bullmq'
import { Job } from 'bullmq'

import { ADD_CAMPAIGN_MEDIA_QUEUE_NAME } from '@/constants/queue.constant'
import { CampaignsService } from '@/modules/campaigns/campaigns.service'
import { ApiConfigService } from '@/shared/services/api-config.service'
import { FilesService } from '@/shared/services/files.service'

@Processor(ADD_CAMPAIGN_MEDIA_QUEUE_NAME)
export class AddCampaignMediaProcessor extends WorkerHost {
	constructor(
		private readonly campaignService: CampaignsService,
		private readonly apiConfigService: ApiConfigService,
		private readonly filesService: FilesService
	) {
		super()
	}

	async process(job: Job<any, any, string>, _token?: string): Promise<any> {
		switch (job.name) {
			case 'upload-campaign-image':
				await this.uploadCampaignImages(
					job.data.id,
					job.data.images,
					job.data.video
				)
				break
			default:
				throw new Error('No job name match')
		}
	}

	private async uploadCampaignImages(
		id: string,
		files: Express.Multer.File[],
		video: string
	) {
		const images: {
			key: string
			url: string
		}[] = []

		for (const file of files) {
			const res = await this.filesService.uploadFile(file, {
				fileName: file.originalname,
				folderId: this.apiConfigService.driveCampaignAssetsFolderId
			})

			images.push({
				key: res.fileId,
				url: res.fileUrl
			})
		}

		const res = await this.campaignService.update(id, {
			images,
			video
		})

		return res
	}
}
