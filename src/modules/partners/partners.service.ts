import { Injectable } from '@nestjs/common'

import { CreatePartnerDto } from '@/modules/partners/dto/create-partner.dto'
import { FindAllPartnerDto } from '@/modules/partners/dto/find-all-partner.dto'
import {
	FindPartnerByDto,
	FindPartnerOptionsDto,
	FindUniquePartnerDto
} from '@/modules/partners/dto/find-partner.dto'
import { UpdatePartnerDto } from '@/modules/partners/dto/update-partner.dto'
import { PrismaService } from '@/shared/services/prisma.service'
import { FindAllParams } from '@/types/common.type'

@Injectable()
export class PartnersService {
	constructor(private readonly db: PrismaService) {}

	async create(createUserDto: CreatePartnerDto) {
		return await this.db.partner.create({
			data: {
				...createUserDto
			}
		})
	}

	async findAll(
		where: FindAllPartnerDto,
		{ page = 0, limit = 10 }: FindAllParams
	) {
		const take = limit
		const skip = (page + 1) * limit

		const [users, count] = await this.db.$transaction([
			this.db.partner.findMany({
				where,
				take,
				skip
			}),
			this.db.partner.count({ where })
		])

		return {
			users,
			count
		}
	}

	async findOneById(id: string, options?: FindPartnerOptionsDto) {
		return await this.db.partner.findUnique({
			where: { id },
			...options
		})
	}

	async findOneByUnique(
		where: FindUniquePartnerDto,
		options?: FindPartnerOptionsDto
	) {
		try {
			return await this.db.partner.findUnique({
				where,
				...options
			})
		} catch (error) {
			console.log(error)
		}
	}

	async findOneBy(where: FindPartnerByDto, options?: FindPartnerOptionsDto) {
		return await this.db.partner.findFirst({ where, ...options })
	}

	async update(id: string, updateUserDto: UpdatePartnerDto) {
		return await this.db.partner.update({
			where: { id },
			data: {
				...updateUserDto
			}
		})
	}

	async softDelete(id: string) {
		return await this.db.partner.update({
			where: { id },
			data: {
				isDelete: true
			}
		})
	}

	async pernamentDeltete(id: string) {
		return this.db.partner.delete({
			where: { id }
		})
	}
}
