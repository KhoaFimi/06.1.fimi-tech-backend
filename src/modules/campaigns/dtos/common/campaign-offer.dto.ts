import { ApiProperty } from '@nestjs/swagger'
import { ArrayMinSize, IsArray, IsNotEmpty, IsOptional } from 'class-validator'

export class CampaignOfferDto {
	@ApiProperty()
	@IsNotEmpty({ message: 'Vui lòng điền tiêu đề của ưu đãi' })
	title: string

	@ApiProperty()
	@IsOptional()
	summary: string

	@ApiProperty()
	@IsArray()
	@ArrayMinSize(1, { message: 'Vui lòng thêm ít nhất 1 ưu đãi' })
	offers: string[]
}
