export class AddPotraitImageDto {
	id: string
	potrait?: Express.Multer.File

	constructor({ id, potrait }: Partial<AddPotraitImageDto>) {
		this.id = id
		this.potrait = potrait
	}
}
