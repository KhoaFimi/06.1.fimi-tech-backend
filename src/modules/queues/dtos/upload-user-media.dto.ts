export class UploadUserAvatarDto {
	id: string
	avatar: Express.Multer.File

	constructor({ id, avatar }: Partial<UploadUserAvatarDto>) {
		this.id = id
		this.avatar = avatar
	}
}
