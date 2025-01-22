import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import * as argon2 from 'argon2'

import { ErrorCode } from '@/constraints/code.constraints'
import { ChangePasswordDto } from '@/modules/users/dtos/change-password.dto'
import { CreateUserDto } from '@/modules/users/dtos/create-user.dto'
import { FindAllUserDto } from '@/modules/users/dtos/find-all-user.dto'
import {
	FindUniqueUserDto,
	FindUserByDto,
	FindUserDto
} from '@/modules/users/dtos/find-user.dto'
import { UpdateUserDto } from '@/modules/users/dtos/update-user.dto'
import { PrismaService } from '@/shared/services/prisma.service'
import { FindAllParams } from '@/types/common.type'

@Injectable()
export class UsersService {
	constructor(
		private readonly db: PrismaService,
		private readonly eventEmiter: EventEmitter2
	) {}

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

	async checkExistingUser(id: string) {
		const existinngUser = await this.findOneById(id)

		if (!existinngUser)
			throw new NotFoundException('Không tìm thấy người dùng tương ứng', {
				description: ErrorCode.NOT_FOUND_ERROR,
				cause: {
					validationError: [{ field: 'id', detail: 'Id không chính xác' }]
				}
			})

		return existinngUser
	}

	async changePassword(id: string, changePasswordDto: ChangePasswordDto) {
		const existingUser = await this.checkExistingUser(id)

		const verifyOldPassword = await argon2.verify(
			existingUser.password,
			changePasswordDto.oldPassword
		)

		if (!verifyOldPassword)
			throw new BadRequestException('Mật khẩu không chính xác', {
				description: ErrorCode.WRONG_CREDENTIALS_ERROR,
				cause: {
					validationError: [
						{
							field: 'oldPassword',
							detail: 'Mật khẩu hiện tại không chính xác'
						}
					]
				}
			})

		const hashedNewPassword = await argon2.hash(changePasswordDto.newPassword)

		await this.update(id, {
			password: hashedNewPassword
		})

		this.eventEmiter.emit('logout', id)
	}
}
