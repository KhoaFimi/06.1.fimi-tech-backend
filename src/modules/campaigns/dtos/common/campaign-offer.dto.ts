import { ApiProperty } from '@nestjs/swagger'
import { ArrayMinSize, IsArray, IsNotEmpty } from 'class-validator'

export class CampaignOfferDto {
	@ApiProperty()
	@IsNotEmpty({ message: 'Vui lòng thêm tóm tắt cho ưu đãi' })
	summary: string

	@ApiProperty()
	@IsArray()
	@ArrayMinSize(1, { message: 'Vui lòng thêm ít nhất 1 ưu đãi' })
	offers: string[]
}
