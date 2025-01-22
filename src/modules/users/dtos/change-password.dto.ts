import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsStrongPassword } from 'class-validator'

export class ChangePasswordDto {
	@ApiProperty()
	@IsNotEmpty({ message: 'Vui lòng nhập mật khẩu cũ' })
	oldPassword: string

	@ApiProperty()
	@IsNotEmpty({ message: 'Vui lòng nhập mật khẩu mới' })
	@IsStrongPassword(
		{
			minLength: 8,
			minLowercase: 1,
			minUppercase: 1,
			minNumbers: 1,
			minSymbols: 0
		},
		{
			message: 'Mật khẩu không đủ mạnh'
		}
	)
	newPassword: string
}
