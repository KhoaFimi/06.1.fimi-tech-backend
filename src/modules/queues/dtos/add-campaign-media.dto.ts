export class AddCampaignMediaDto {
	id: string
	video?: string
	images: Express.Multer.File[]

	constructor({
		id,
		video,
		images
	}: {
		id: string
		video?: string
		images: Express.Multer.File[]
	}) {
		this.id = id
		this.video = video
		this.images = images
	}
}
