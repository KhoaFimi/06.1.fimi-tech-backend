import { ApiProperty } from '@nestjs/swagger'
import { ArrayMinSize, IsArray, IsNotEmpty, IsOptional } from 'class-validator'

export class CampaignSubCommissionPolicyDto {
	@ApiProperty()
	@IsOptional()
	add: number

	@ApiProperty()
	@IsOptional()
	description: number
}

export class CampaignCommissionPolicyDto {
	@ApiProperty()
	@IsOptional()
	orderStatus: string

	@ApiProperty()
	@IsNotEmpty({
		message: 'Vui lòng thêm mô tả về điều kiện và chính sách nhận hoa hồng'
	})
	description: string

	@ApiProperty()
	@IsArray()
	@ArrayMinSize(1, {
		message: 'Vui lòng thêm ít nhất 1 mốc hoa hồng và điều kiện nhận'
	})
	commissions: string[]

	@ApiProperty()
	@IsOptional()
	note: string

	@ApiProperty({ type: CampaignSubCommissionPolicyDto })
	@IsArray()
	subCom: CampaignSubCommissionPolicyDto
}
