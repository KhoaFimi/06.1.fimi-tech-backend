import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional } from 'class-validator'

export class CampaignInfoDto {
	@ApiProperty()
	@IsOptional()
	supportArea: string[]

	@ApiProperty()
	@IsNotEmpty({ message: 'Vui lòng nhập thời gian phê duyệt' })
	approveTime: string

	@ApiProperty()
	@IsNotEmpty({ message: 'Vui lòng nhập thời gian trả kết quả' })
	finalResultTime: string
}
