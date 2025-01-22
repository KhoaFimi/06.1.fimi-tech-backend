import { ApiProperty } from '@nestjs/swagger'
import { ArrayMinSize, IsArray, IsNotEmpty } from 'class-validator'

export class CampaignSpecDto {
	@ApiProperty()
	@IsNotEmpty({ message: 'Vui lòng nhập tiêu đề đặc điểm cho chiến dịch' })
	title: string

	@ApiProperty()
	@IsArray()
	@ArrayMinSize(1, {
		message: 'Vui lòng nhập ít nhất mô tả đặc điểm cho chiến dịch'
	})
	description: string[]
}
