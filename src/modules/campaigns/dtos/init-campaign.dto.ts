import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class InitCampaignDto {
	@ApiProperty()
	@IsNotEmpty({ message: 'Vui lòng mã chiến dịch' })
	code: string

	@ApiProperty()
	@IsNotEmpty({ message: 'Vui lòng nhập tên chiến dịch' })
	name: string

	@ApiProperty()
	@IsNotEmpty({ message: 'Vui lòng chọn danh mục cho chiến dịch' })
	categoryId: string
}
