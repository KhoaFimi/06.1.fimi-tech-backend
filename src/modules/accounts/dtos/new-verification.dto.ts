import { IsNotEmpty } from 'class-validator'

export class NewVerificationDto {
	@IsNotEmpty({ message: 'Yêu cầu Verification Key' })
	verificationKey: string

	@IsNotEmpty({ message: 'Yêu cầu token' })
	token: string
}
