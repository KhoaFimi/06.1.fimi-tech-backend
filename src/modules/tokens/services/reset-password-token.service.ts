import { randomUUID as uuidV4 } from 'node:crypto'

import {
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import * as argon2 from 'argon2'

import { ErrorCode } from '@/constraints/code.constraints'
import { ApiConfigService } from '@/shared/services/api-config.service'
import { PrismaService } from '@/shared/services/prisma.service'

@Injectable()
export class ResetPasswordTokenService {
	constructor(
		private readonly db: PrismaService,
		private readonly apiConfig: ApiConfigService
	) {}

	async generate(identifier: string) {
		const existingToken = await this.db.resetPasswordToken.findFirst({
			where: { identifier }
		})

		if (existingToken) {
			await this.db.resetPasswordToken.delete({
				where: { id: existingToken.id }
			})
		}

		const token = uuidV4()

		const hashedToken = await argon2.hash(token)

		const expires = new Date(
			new Date().getTime() + this.apiConfig.resetPasswordTokenExpires * 1000
		)

		await this.db.resetPasswordToken.create({
			data: {
				token: hashedToken,
				identifier,
				expires
			}
		})

		return {
			token
		}
	}

	async verify(token: string, identifier: string) {
		const existingToken = await this.db.resetPasswordToken.findFirst({
			where: { identifier }
		})

		if (!existingToken)
			throw new NotFoundException('Verification key không chính xác', {
				description: ErrorCode.WRONG_CREDENTIALS_ERROR
			})

		const hasExpires = new Date(existingToken.expires) < new Date()

		if (hasExpires) {
			await this.db.resetPasswordToken.delete({
				where: { id: existingToken.id }
			})

			throw new UnauthorizedException('OTP đã hết hạn', {
				description: ErrorCode.OTP_EXPIRES_ERROR
			})
		}

		const verifyToken = await argon2.verify(existingToken.token, token)

		if (!verifyToken)
			throw new UnauthorizedException('OTP không chính xác', {
				description: ErrorCode.WRONG_CREDENTIALS_ERROR
			})

		await this.db.resetPasswordToken.delete({
			where: {
				id: existingToken.id
			}
		})

		return {
			identifier
		}
	}
}
