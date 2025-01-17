import { Prisma } from '@prisma/client'

export type FindPartnerOptionsDto = {
	include: Prisma.PartnerInclude
	omit: Prisma.PartnerOmit
}

export type FindUniquePartnerDto = Prisma.PartnerWhereUniqueInput
export type FindPartnerByDto = Prisma.PartnerWhereInput
