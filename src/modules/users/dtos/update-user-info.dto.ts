import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsOptional, Matches, ValidateNested } from 'class-validator'

import { ProfileDto } from '@/modules/users/dtos/common/profile.dto'

// Pick < UpdateUserDto, 'fullname' | 'phone' | 'profile'

export class UpdateUserInfoDto {
	@ApiProperty()
	@IsOptional()
	fullname: string

	@ApiProperty()
	@IsOptional()
	@Matches(/^\d{10}$/, { message: 'Số điện thoại không đúng định dạng' })
	phone: string

	@ApiProperty()
	@IsOptional()
	@ValidateNested()
	@Type(() => ProfileDto)
	profile: ProfileDto
}
