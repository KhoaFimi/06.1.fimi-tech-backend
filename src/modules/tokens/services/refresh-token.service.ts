import {
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { JwtService, TokenExpiredError } from '@nestjs/jwt'
import * as argon2 from 'argon2'

import { ErrorCode } from '@/constraints/code.constraints'
import {
	refreshTokenPrivateKey,
	refreshTokenPublicKey
} from '@/constraints/jwt.constraint'
import { IRefreshTokenPayload } from '@/modules/tokens/interfaces/token.interface'
import { UsersService } from '@/modules/users/users.service'
import { ApiConfigService } from '@/shared/services/api-config.service'

@Injectable()
export class RefreshTokenService {
	constructor(
		private readonly apiConfig: ApiConfigService,
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService
	) {}

	public async generate(payload: IRefreshTokenPayload) {
		const refreshToken = this.jwtService.sign(payload, {
			privateKey: refreshTokenPrivateKey,
			algorithm: 'RS256',
			expiresIn: this.apiConfig.refreshTokenExpires
		})

		await this.storeRefreshToken(payload.sub, refreshToken)

		return {
			refreshToken
		}
	}

	private async storeRefreshToken(id: string, token: string) {
		const hashedToken = await argon2.hash(token)

		await this.usersService.update(id, {
			refreshToken: hashedToken
		})
	}

	public async verify(token: string) {
		try {
			const decoded = this.jwtService.verify(token, {
				publicKey: refreshTokenPublicKey,
				algorithms: ['RS256']
			})

			const existingUser = await this.usersService.findOneByUnique(
				{
					id: decoded.sub
				},
				{
					omit: { password: true },
					include: {
						partner: {
							select: {
								id: true,
								code: true
							}
						}
					}
				}
			)

			if (!existingUser)
				throw new NotFoundException('Refresh Token không chính xác', {
					description: ErrorCode.WRONG_CREDENTIALS_ERROR
				})

			const verifyRefreshToken = await argon2.verify(
				existingUser.refreshToken,
				token
			)

			if (!verifyRefreshToken)
				throw new UnauthorizedException('Refresh Token không chính xác', {
					description: ErrorCode.WRONG_CREDENTIALS_ERROR
				})

			return existingUser
		} catch (error) {
			if (error instanceof TokenExpiredError) {
				throw new UnauthorizedException('Refresh token hết hạn', {
					description: ErrorCode.ACCESS_TOKEN_EXPIRED_ERROR
				})
			}

			throw error
		}
	}
}
