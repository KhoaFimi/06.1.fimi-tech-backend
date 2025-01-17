import { IsNotEmpty, IsStrongPassword, Matches } from 'class-validator'

export class ResetPasswordDto {
	@IsNotEmpty({ message: 'Yêu cầu Verification Key' })
	verificationKey: string

	@IsNotEmpty({ message: 'Vui lòng nhập OTP' })
	@Matches(/^\d{1,6}$/, { message: 'Otp không đúng định dạng' })
	otp: string

	@IsNotEmpty({ message: 'Vui lòng nhập mật khẩu' })
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
	password: string
}
