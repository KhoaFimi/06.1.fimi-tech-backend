import { Prisma } from '@prisma/client'

export type FindCampaignDto = {
	include?: Prisma.CampaignInclude
	omit?: Prisma.CampaignOmit
}

export type FindUniqueCampaignDto = Prisma.CampaignWhereUniqueInput
export type FindCampaignByDto = Prisma.CampaignWhereInput
