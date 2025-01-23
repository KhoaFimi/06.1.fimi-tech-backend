import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsOptional, ValidateNested } from 'class-validator'

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
}
