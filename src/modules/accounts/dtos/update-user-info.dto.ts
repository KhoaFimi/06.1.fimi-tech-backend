import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsOptional, ValidateNested } from 'class-validator'

import { DocumentDto } from '@/modules/users/dtos/common/document.dto'
import { ProfileDto } from '@/modules/users/dtos/common/profile.dto'

// Pick < UpdateUserDto, 'fullname' | 'phone' | 'profile'

export class UpdateUserInfoDto {
	@ApiProperty()
	@IsOptional()
	fullname: string

	@ApiProperty()
	@IsOptional()
	@ValidateNested()
	@Type(() => ProfileDto)
	profile: ProfileDto

	@ApiProperty()
	@IsOptional()
	@ValidateNested()
	@Type(() => DocumentDto)
	document: DocumentDto
}
