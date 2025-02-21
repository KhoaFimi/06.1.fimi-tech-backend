export class AddUserAvatarDto {
	id: string
	avatar: Express.Multer.File

	constructor({ id, avatar }: Partial<AddUserAvatarDto>) {
		this.id = id
		this.avatar = avatar
	}
}
