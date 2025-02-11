import { Partner } from '@prisma/client'

export class SendOtpDto {
	id: string
	email: string
	partner: Partner

	constructor({ id, email, partner }: Partial<SendOtpDto>) {
		this.id = id
		this.email = email
		this.partner = partner
	}
}
