import { ApiProperty } from '@nestjs/swagger'

export class AddressDto {
	@ApiProperty()
	detail: string

	@ApiProperty()
	ward: string

	@ApiProperty()
	district: string

	@ApiProperty()
	province: string
}
