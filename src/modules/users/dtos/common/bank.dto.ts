import { ApiProperty } from '@nestjs/swagger'

export class BankDto {
	@ApiProperty()
	accountName: string

	@ApiProperty()
	accountNumber: string

	@ApiProperty()
	name: string
}
