import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsOptional, ValidateNested } from 'class-validator'

import { AddressDto } from '@/modules/users/dtos/common/address.dto'
import { BankDto } from '@/modules/users/dtos/common/bank.dto'

enum GENDER {
	MALE = 'MALE',
	FEMALE = 'FEMALE'
}

export class ProfileDto {
	@ApiProperty({ type: Date })
	@IsOptional()
	dateOfBirth: Date

	@ApiProperty()
	@IsOptional()
	placeOfBirth: string

	@ApiProperty({ enum: GENDER })
	@IsOptional()
	gender: GENDER

	@ApiProperty()
	@IsOptional()
	workAt: string

	@ApiProperty()
	@IsOptional()
	@ValidateNested()
	@Type(() => AddressDto)
	currentAddress: AddressDto

	@ApiProperty()
	@IsOptional()
	@ValidateNested()
	@Type(() => BankDto)
	bank: BankDto
}
