import { Prisma } from '@prisma/client'

export type FindCategoryDto = {
	include: Prisma.CategoryInclude
	omit: Prisma.CategoryOmit
}

export type FindUniqueCategoryDto = Prisma.CategoryWhereUniqueInput
export type FindCategoryByDto = Prisma.CategoryWhereInput
