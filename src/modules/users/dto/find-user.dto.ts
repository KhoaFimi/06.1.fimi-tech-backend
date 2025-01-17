import { Prisma } from '@prisma/client'

export type FindUserDto = {
	include: Prisma.UserInclude
	omit: Prisma.UserOmit
}

export type FindUniqueUserDto = Prisma.UserWhereUniqueInput
export type FindUserByDto = Prisma.UserWhereInput
