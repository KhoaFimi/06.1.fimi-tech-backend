import { ApiProperty } from '@nestjs/swagger'
import {
	Document,
	Partner,
	Profile,
	ROLES,
	User as UserModel
} from '@prisma/client'
import { Exclude } from 'class-transformer'

export class User {
	id: string

	code: string

	fullname: string

	phone: string

	email: string

	@Exclude()
	emailVerified: Date

	@Exclude()
	password: string

	@ApiProperty({ type: () => Document })
	document?: Document

	profile?: Profile

	@Exclude()
	tnc: boolean

	@Exclude()
	partnerId: string

	partner: Partner

	@Exclude()
	managerId: string

	manager: UserModel

	manage: UserModel[]

	createdAt: Date

	@Exclude()
	isDelete: boolean

	updatedAt: Date

	@Exclude()
	refreshToken: string

	roles: ROLES
}
