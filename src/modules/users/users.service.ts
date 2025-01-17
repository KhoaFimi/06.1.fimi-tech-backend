import { Injectable } from '@nestjs/common'

import { CreateUserDto } from '@/modules/users/dto/create-user.dto'
import { FindAllUserDto } from '@/modules/users/dto/find-all-user.dto'
import {
	FindUniqueUserDto,
	FindUserByDto,
	FindUserDto
} from '@/modules/users/dto/find-user.dto'
import { UpdateUserDto } from '@/modules/users/dto/update-user.dto'
import { PrismaService } from '@/shared/services/prisma.service'
import { FindAllParams } from '@/types/common.type'

@Injectable()
export class UsersService {
	constructor(private readonly db: PrismaService) {}

	async create(createUserDto: CreateUserDto) {
		return await this.db.user.create({
			data: {
				...createUserDto
			}
		})
	}

	async findAll(
		where: FindAllUserDto,
		{ page = 0, limit = 10 }: FindAllParams
	) {
		const take = limit
		const skip = (page + 1) * limit

		const [users, count] = await this.db.$transaction([
			this.db.user.findMany({
				where,
				take,
				skip
			}),
			this.db.user.count({ where })
		])

		return {
			users,
			count
		}
	}

	async findOneById(id: string, options?: FindUserDto) {
		return await this.db.user.findUnique({
			where: { id },
			...options
		})
	}

	async findOneByUnique(where: FindUniqueUserDto, options?: FindUserDto) {
		return await this.db.user.findUnique({
			where,
			...options
		})
	}

	async findOneBy(where: FindUserByDto, options?: FindUserDto) {
		return await this.db.user.findFirst({ where, ...options })
	}

	async update(id: string, updateUserDto: UpdateUserDto) {
		return await this.db.user.update({
			where: { id },
			data: {
				...updateUserDto
			}
		})
	}

	async softDelete(id: string) {
		return await this.db.user.update({
			where: { id },
			data: {
				isDelete: true
			}
		})
	}

	async pernamentDeltete(id: string) {
		return this.db.user.delete({
			where: { id }
		})
	}
}
