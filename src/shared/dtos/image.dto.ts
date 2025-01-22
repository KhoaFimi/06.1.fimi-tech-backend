import { ApiProperty } from '@nestjs/swagger'

export class ImageDto {
	@ApiProperty()
	key: string

	@ApiProperty()
	url: string
}
