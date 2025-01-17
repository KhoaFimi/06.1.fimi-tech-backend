import {
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { JwtService, TokenExpiredError } from '@nestjs/jwt'

import { ErrorCode } from '@/constraints/code.constraints'
import {
	accessTokenPrivateKey,
	accessTokenPublicKey
} from '@/constraints/jwt.constraint'
import { IAccessTokenPayload } from '@/modules/tokens/interfaces/token.interface'
import { UsersService } from '@/modules/users/users.service'
import { ApiConfigService } from '@/shared/services/api-config.service'

@Injectable()
export class AccessTokenService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly apiConfig: ApiConfigService,
		private readonly usersService: UsersService
	) {}

	public async generate(payload: IAccessTokenPayload) {
		const accessToken = this.jwtService.sign(payload, {
			privateKey: accessTokenPrivateKey,
			algorithm: 'RS256',
			expiresIn: this.apiConfig.accessTokenExpires
		})

		return {
			accessToken
		}
	}

	public async verify(token: string) {
		try {
			const decoded = this.jwtService.verify(token, {
				publicKey: accessTokenPublicKey,
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
				throw new NotFoundException('Access Token không chính xác', {
					description: ErrorCode.WRONG_CREDENTIALS_ERROR
				})

			return existingUser
		} catch (error) {
			if (error instanceof TokenExpiredError) {
				throw new UnauthorizedException('Access token hết hạn', {
					description: ErrorCode.ACCESS_TOKEN_EXPIRED_ERROR
				})
			}

			throw error
		}
	}
}
