import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq'
import { Job } from 'bullmq'
import { CloudinaryService } from 'nestjs-cloudinary'

import { UPLOAD_USER_MEDIA_QUEUE_NAME } from '@/constants/queue.constant'
import { AddIdentifierCardImageDto } from '@/modules/queues/dtos/add-identifier-card-image.dto'
import { AddPotraitImageDto } from '@/modules/queues/dtos/add-potrait-image.dto'
import { AddUserAvatarDto } from '@/modules/queues/dtos/add-user-media.dto'
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
				await this.uploadAvatar({
					id: job.data.id,
					avatar: job.data.avatar
				})
				break
			case 'upload-identifier-card-image':
				await this.uploadIdentifierCardImage({
					id: job.data.id,
					front: job.data.front,
					back: job.data.back
				})
				break
			case 'upload-potrait':
				await this.uploadPotraitImage({
					id: job.data.id,
					potrait: job.data.potrait
				})
				break
			default:
				throw new Error('No job name match')
		}
	}

	private async uploadIdentifierCardImage(
		params: Partial<AddIdentifierCardImageDto>
	) {
		const existingUser = await this.usersSerice.findOneById(params.id)

		if (!existingUser) return

		const [uploadFrontRes, uploadBackRes] = await Promise.all([
			this.cloudinaryService.uploadFile(
				{
					...params.front,
					buffer: Buffer.from(params.front.buffer)
				},
				{ folder: `document/${existingUser.code}` }
			),
			this.cloudinaryService.uploadFile(
				{
					...params.back,
					buffer: Buffer.from(params.back.buffer)
				},
				{ folder: `document/${existingUser.code}` }
			)
		])

		await this.usersSerice.update(params.id, {
			document: {
				...existingUser.document,
				imageFront: {
					key: uploadFrontRes.public_id,
					url: uploadFrontRes.secure_url
				},
				imageBack: {
					key: uploadBackRes.public_id,
					url: uploadBackRes.secure_url
				}
			}
		})
	}

	private async uploadPotraitImage(params: Partial<AddPotraitImageDto>) {
		const existingUser = await this.usersSerice.findOneById(params.id)

		if (!existingUser) return

		const uploadPotraitRes = await this.cloudinaryService.uploadFile(
			{
				...params.potrait,
				buffer: Buffer.from(params.potrait.buffer)
			},
			{
				folder: `document/${existingUser.code}`
			}
		)

		await this.usersSerice.update(params.id, {
			document: {
				...existingUser.document,
				potrait: {
					key: uploadPotraitRes.public_id,
					url: uploadPotraitRes.secure_url
				}
			}
		})
	}

	private async uploadAvatar(params: Partial<AddUserAvatarDto>) {
		const existingUser = await this.usersSerice.findOneById(params.id)

		if (existingUser.profile.avatar) {
			await this.cloudinaryService.cloudinary.uploader.destroy(
				existingUser.profile.avatar.key
			)
		}

		const uploadRes = await this.cloudinaryService.uploadFile(
			{
				...params.avatar,
				buffer: Buffer.from(params.avatar.buffer)
			},
			{ folder: 'avatar' }
		)

		await this.usersSerice.update(params.id, {
			profile: {
				avatar: {
					...existingUser.profile,
					key: uploadRes.public_id,
					url: uploadRes.secure_url
				}
			}
		})
	}
}
