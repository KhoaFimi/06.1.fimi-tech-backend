import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq'
import { Job } from 'bullmq'
import { CloudinaryService } from 'nestjs-cloudinary'

import { UPLOAD_USER_MEDIA_QUEUE_NAME } from '@/constants/queue.constant'
import { UsersService } from '@/modules/users/users.service'

@Processor(UPLOAD_USER_MEDIA_QUEUE_NAME)
export class UploadUserMediaProcessor extends WorkerHost {
	constructor(
		private readonly cloudinaryService: CloudinaryService,
		private readonly usersSerice: UsersService
	) {
		super()
	}

	@OnWorkerEvent('failed')
	onQueueFailed(job: Job, err: any) {
		console.log(`Job has been failed: ${job.id}`)
		console.log({ err })
	}

	async process(job: Job<any, any, string>, _token?: string): Promise<any> {
		switch (job.name) {
			case 'upload-avatar':
				await this.uploadAvatar(job.data.id, job.data.avatar)
				break
			default:
				throw new Error('No job name match')
		}
	}

	private async uploadAvatar(
		id: string,
		avatar: Express.Multer.File,
		folder: string = 'avatar'
	) {
		const existingUserAvatar = await this.usersSerice.findOneById(id)

		if (existingUserAvatar.profile.avatar) {
			await this.cloudinaryService.cloudinary.uploader.destroy(
				existingUserAvatar.profile.avatar.key
			)
		}

		const uploadRes = await this.cloudinaryService.uploadFile(
			{
				...avatar,
				buffer: Buffer.from(avatar.buffer)
			},
			{ folder }
		)

		await this.usersSerice.update(id, {
			profile: {
				avatar: {
					key: uploadRes.public_id,
					url: uploadRes.secure_url
				}
			}
		})
	}
}
