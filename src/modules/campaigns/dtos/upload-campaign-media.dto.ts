import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsUrl } from 'class-validator'

export class UploadCampaignMediaDto {
	@ApiProperty()
	@IsOptional()
	@IsUrl({}, { message: 'Link video không hợp lệ' })
	video: string

	@ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
	images: Express.Multer.File[]
}
