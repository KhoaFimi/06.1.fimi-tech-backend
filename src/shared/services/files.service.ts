import { BadRequestException, Injectable } from '@nestjs/common'
import { google } from 'googleapis'
import * as stream from 'stream'

import { ErrorCode } from '@/constraints/code.constraints'
import { ApiConfigService } from '@/shared/services/api-config.service'

@Injectable()
export class FilesService {
	constructor(private readonly apiConfig: ApiConfigService) {}

	// #region: Upload file
	async uploadFile(
		file: Express.Multer.File,
		{ fileName, folderId }: { folderId?: string; fileName?: string }
	) {
		try {
			const driveService = this.getDriveService()

			const bufferStream = new stream.PassThrough()

			bufferStream.end(Buffer.from(file.buffer))

			const response = await driveService.files.create({
				requestBody: {
					name: fileName ?? file.originalname,
					mimeType: file.mimetype,
					parents: [folderId]
				},
				media: {
					body: bufferStream,
					mimeType: file.mimetype
				},
				fields: 'id'
			})

			const { id: fileId } = response.data

			return {
				fileId,
				fileUrl: await this.getFileUrl(fileId)
			}
		} catch (_error) {
			throw new BadRequestException('Uplooad file không thành công', {
				description: ErrorCode.WRONG_CREDENTIALS_ERROR
			})
		}
	}
	// #endregion

	// #region: get file url
	async getFileUrl(fileId: string) {
		const drive = this.getDriveService()

		await drive.permissions.create({
			fileId,
			requestBody: {
				role: 'reader',
				type: 'anyone'
			}
		})

		const result = await drive.files.get({
			fileId,
			fields: 'webViewLink, webContentLink'
		})

		const fileUrl = result.data.webContentLink

		return fileUrl
	}
	// #endregion

	// #region: delete file
	async deleteFile(fileId: string) {
		try {
			const drive = this.getDriveService()

			await drive.files.delete({
				fileId
			})
		} catch (_error) {
			throw new BadRequestException('Xóa file không thành công', {
				description: ErrorCode.WRONG_CREDENTIALS_ERROR
			})
		}
	}
	// #endregion

	// #region: base method
	private getAuth() {
		const Oauth2 = google.auth.OAuth2

		const oauth2Client = new Oauth2(
			this.apiConfig.googleClientId,
			this.apiConfig.googleClientSecret
		)

		oauth2Client.setCredentials({
			refresh_token: this.apiConfig.googleRefreshToken
		})

		return oauth2Client
	}

	private getDriveService() {
		const auth = this.getAuth()

		const DRIVE_SERVICE = 'v3'

		return google.drive({ version: DRIVE_SERVICE, auth })
	}

	// #endregion
}
