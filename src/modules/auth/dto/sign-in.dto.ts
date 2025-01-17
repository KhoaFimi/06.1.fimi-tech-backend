import { IsEmail, IsNotEmpty } from 'class-validator'

export class SignInDto {
	@IsNotEmpty({ message: 'Vui lòng nhập email' })
	@IsEmail({}, { message: 'Email không đúng định dang' })
	email: string

	@IsNotEmpty({ message: 'Vui lòng nhập mật khẩu' })
	password: string
}
