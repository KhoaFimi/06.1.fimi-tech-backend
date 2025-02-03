import { ApiProperty } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'

export class DocumentDto {
	@ApiProperty()
	@IsOptional()
	citizenIdentification: string

	@ApiProperty({ type: Date })
	@IsOptional()
	dateOfIssue: string

	@ApiProperty()
	@IsOptional()
	placeOfIssue: string
}
