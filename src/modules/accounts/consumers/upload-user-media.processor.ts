import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq'
import { Job } from 'bullmq'

import { UPLOAD_USER_MEDIA_QUEUE_NAME } from '@/constants/queue.constant'
import { AddIdentifierCardImageDto } from '@/modules/queues/dtos/add-identifier-card-image.dto'
import { AddPotraitImageDto } from '@/modules/queues/dtos/add-potrait-image.dto'
import { AddUserAvatarDto } from '@/modules/queues/dtos/add-user-media.dto'
import { UsersService } from '@/modules/users/users.service'
import { ApiConfigService } from '@/shared/services/api-config.service'
import { FilesService } from '@/shared/services/files.service'

@Processor(UPLOAD_USER_MEDIA_QUEUE_NAME)
export class UploadUserMediaProcessor extends WorkerHost {
	constructor(
		private readonly usersService: UsersService,
		private readonly filesService: FilesService,
		private readonly apiConfig: ApiConfigService
	) {
		super()
	}

	@OnWorkerEvent('failed')
	onQueueFailed(job: Job, err: any) {
		console.log(`Job has been failed: ${job.id}`)
		console.log({ err })

		return {
			jobId: job.id,
			isCompleted: false
		}
	}

	async process(job: Job<any, any, string>, _token?: string): Promise<any> {
		switch (job.name) {
			case 'upload-avatar':
				await this.uploadAvatar({
					id: job.data.id,
					fileId: job.data.fileId,
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
		const existingUser = await this.usersService.findOneById(params.id)

		if (!existingUser) return

		const [uploadFrontRes, uploadBackRes] = await Promise.all([
			this.filesService.uploadFile(params.front, {
				fileName: `${existingUser.id}-front`,
				folderId: this.apiConfig.driveDocuementsFolderId
			}),
			this.filesService.uploadFile(params.back, {
				fileName: `${existingUser.id}-back`,
				folderId: this.apiConfig.driveDocuementsFolderId
			})
		])

		await this.usersService.update(params.id, {
			document: {
				set: {
					...existingUser.document,
					imageFront: {
						key: uploadFrontRes.fileId,
						url: uploadFrontRes.fileUrl
					},
					imageBack: {
						key: uploadBackRes.fileId,
						url: uploadBackRes.fileUrl
					}
				}
			}
		})
	}

	private async uploadPotraitImage(params: Partial<AddPotraitImageDto>) {
		const existingUser = await this.usersService.findOneById(params.id)

		if (!existingUser) return

		const uploadPotraitRes = await this.filesService.uploadFile(
			params.potrait,
			{
				fileName: `${existingUser.id}-potrait`,
				folderId: this.apiConfig.driveDocuementsFolderId
			}
		)

		await this.usersService.update(params.id, {
			document: {
				set: {
					...existingUser.document,
					potrait: {
						key: uploadPotraitRes.fileId,
						url: uploadPotraitRes.fileUrl
					}
				}
			}
		})
	}

	private async uploadAvatar(params: Partial<AddUserAvatarDto>) {
		const existingUser = await this.usersService.findOneById(params.id)

		if (existingUser.profile && existingUser.profile.avatar) {
			await this.filesService.deleteFile(existingUser.profile.avatar.key)
		}

		const uploadRes = await this.filesService.uploadFile(params.avatar, {
			fileName: `${existingUser.id}-avatar`,
			folderId: this.apiConfig.driveAvatarFolderId
		})

		await this.usersService.update(params.id, {
			profile: {
				// ...existingUser.profile,
				set: {
					...existingUser.profile,
					avatar: {
						key: uploadRes.fileId,
						url: uploadRes.fileUrl
					}
				}
			}
		})

		return {
			newAvatar: uploadRes.fileUrl
		}
	}
}
