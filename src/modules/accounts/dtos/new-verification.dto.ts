import { IsNotEmpty, Matches } from 'class-validator'

export class NewVerificationDto {
	@IsNotEmpty({ message: 'Yêu cầu Verification Key' })
	verificationKey: string

	@IsNotEmpty({ message: 'Vui lòng nhập OTP' })
	@Matches(/^\d{1,6}$/, { message: 'Otp không đúng định dạng' })
	otp: string
}
