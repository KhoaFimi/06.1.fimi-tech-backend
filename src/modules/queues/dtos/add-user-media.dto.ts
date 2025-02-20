export class AddUserAvatarDto {
	id: string
	avatar: Express.Multer.File
	fileId: string

	constructor({ id, avatar, fileId }: Partial<AddUserAvatarDto>) {
		this.id = id
		this.avatar = avatar
		this.fileId = fileId
	}
}
