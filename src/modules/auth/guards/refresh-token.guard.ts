import {
	CanActivate,
	ExecutionContext,
	Injectable,
	NotFoundException
} from '@nestjs/common'

import { RefreshTokenService } from '@/modules/tokens/services/refresh-token.service'
import { ExtendedRequest } from '@/types/api.type'

@Injectable()
export class RefreshTokenGuard implements CanActivate {
	constructor(private readonly refreshTokenService: RefreshTokenService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<ExtendedRequest>()

		const refreshToken = request.header('X-REFRESH-TOKEN')

		if (!refreshToken) throw new NotFoundException('Thiếu refresh token')

		const res = await this.refreshTokenService.verify(refreshToken)

		request.user = res

		return true
	}
}
