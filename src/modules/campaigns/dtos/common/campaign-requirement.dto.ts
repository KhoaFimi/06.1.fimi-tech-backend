import { ApiProperty } from '@nestjs/swagger'
import {
	ArrayMinSize,
	IsArray,
	IsInt,
	IsNotEmpty,
	IsOptional
} from 'class-validator'

export class CampaignRequirementDto {
	@ApiProperty({ type: 'number' })
	@IsNotEmpty({ message: 'Vui lòng nhập điều kiện giới hạn độ tuổi' })
	@IsInt({ message: 'Không đúng định dạng' })
	minAge: number

	@ApiProperty({ type: 'number' })
	@IsOptional()
	@IsInt({ message: 'Không đúng định dạng' })
	maxAge: number

	@ApiProperty()
	@IsArray()
	@ArrayMinSize(1, { message: 'Vui lòng thêm ít nhất 1 hồ sờ/giấy tờ yêu cầu' })
	documents: string[]
}
