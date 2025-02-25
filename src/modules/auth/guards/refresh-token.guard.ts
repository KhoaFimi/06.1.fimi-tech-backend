import {
	CanActivate,
	ExecutionContext,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'

import { ErrorCode } from '@/constraints/code.constraints'
import { RefreshTokenService } from '@/modules/tokens/services/refresh-token.service'
import { ExtendedRequest } from '@/types/api.type'

@Injectable()
export class RefreshTokenGuard implements CanActivate {
	constructor(private readonly refreshTokenService: RefreshTokenService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<ExtendedRequest>()

		const authReq = request.headers.authorization

		if (!authReq)
			throw new UnauthorizedException('Không có quyền truy cập', {
				description: ErrorCode.UNAUTHORIZED_ERROR
			})

		const refreshToken = authReq.split(' ')[1]

		if (!refreshToken) throw new NotFoundException('Thiếu refresh token')

		const res = await this.refreshTokenService.verify(refreshToken)

		request.user = res

		return true
	}
}
