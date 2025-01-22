import { ApiProperty } from '@nestjs/swagger'
import { ArrayMinSize, IsArray, IsNotEmpty, IsOptional } from 'class-validator'

export class CampaignRecognitionRulesDto {
	@ApiProperty()
	@IsNotEmpty({ message: 'Vui lòng thêm mô tả cho quy tắc ghi nhận' })
	summary: string

	@ApiProperty()
	@IsArray()
	@ArrayMinSize(1, {
		message: 'Vui lòng thêm ít nhất 1 điều khoản ghi nhận'
	})
	description: string[]

	@ApiProperty()
	@IsOptional()
	note: string
}
