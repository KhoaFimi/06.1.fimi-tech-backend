import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, Matches } from 'class-validator'

export class RequestChangeEmailDto {
	@ApiProperty()
	@IsNotEmpty({ message: 'Vui lòng nhập email mới' })
	@IsEmail({}, { message: 'Email không đúng định dạng' })
	newEmail: string
}

export class ChangeEmaiDto {
	@ApiProperty()
	@IsNotEmpty({ message: 'Yêu cầu Verification Key' })
	verificationKey: string

	@ApiProperty()
	@IsNotEmpty({ message: 'Vui lòng nhập OTP' })
	@Matches(/^\d{1,6}$/, { message: 'Otp không đúng định dạng' })
	otp: string
}
