import { IsEmail, IsNotEmpty } from 'class-validator'

export class ForgotPasswordDto {
	@IsNotEmpty({ message: 'Vui lòng nhập Email' })
	@IsEmail({}, { message: 'Email không đúng định dạng' })
	email: string
}
