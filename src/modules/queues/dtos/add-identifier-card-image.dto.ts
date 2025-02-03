export class AddIdentifierCardImageDto {
	id: string
	front?: Express.Multer.File
	back?: Express.Multer.File

	constructor({ id, front, back }: Partial<AddIdentifierCardImageDto>) {
		this.id = id
		this.front = front
		this.back = back
	}
}
