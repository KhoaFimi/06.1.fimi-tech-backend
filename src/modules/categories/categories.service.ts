import { Injectable } from '@nestjs/common'

import { CreateCategoryDto } from '@/modules/categories/dtos/create-category.dto'
import { FindAllCategoryDto } from '@/modules/categories/dtos/find-all-category.dto'
import {
	FindCategoryByDto,
	FindCategoryDto,
	FindUniqueCategoryDto
} from '@/modules/categories/dtos/find-category.dto'
import { UpdateCategoryDto } from '@/modules/categories/dtos/update-category.dto'
import { PrismaService } from '@/shared/services/prisma.service'

@Injectable()
export class CategoriesService {
	constructor(private readonly db: PrismaService) {}

	async create(createCategoryDto: CreateCategoryDto) {
		return await this.db.category.create({
			data: {
				...createCategoryDto
			}
		})
	}

	async findAll(where: FindAllCategoryDto) {
		const [categories, count] = await this.db.$transaction([
			this.db.category.findMany({
				where
			}),
			this.db.category.count({ where })
		])

		return {
			categories,
			count
		}
	}

	async findOneById(id: string, options?: FindCategoryDto) {
		return await this.db.category.findUnique({
			where: { id },
			...options
		})
	}

	async findOneByUnique(
		where: FindUniqueCategoryDto,
		options?: FindCategoryDto
	) {
		return await this.db.category.findUnique({
			where,
			...options
		})
	}

	async findOneBy(where: FindCategoryByDto, options?: FindCategoryDto) {
		return await this.db.category.findFirst({ where, ...options })
	}

	async update(id: string, updateCategoryDto: UpdateCategoryDto) {
		return await this.db.category.update({
			where: { id },
			data: {
				...updateCategoryDto
			}
		})
	}

	async pernamentDeltete(id: string) {
		return this.db.category.delete({
			where: { id }
		})
	}
}
