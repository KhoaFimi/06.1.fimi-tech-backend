import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, Matches } from 'class-validator'

export class ChangeUserPhoneDto {
	@ApiProperty()
	@IsOptional()
	@Matches(/^\d{10}$/, { message: 'Số điện thoại không đúng định dạng' })
	phone: string
}
