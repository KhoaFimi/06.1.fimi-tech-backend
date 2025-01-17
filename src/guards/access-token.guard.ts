import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'

import { ErrorCode } from '@/constraints/code.constraints'
import { AccessTokenService } from '@/modules/tokens/services/access-token.service'
import { ExtendedRequest } from '@/types/api.type'

@Injectable()
export class AccessTokenGuard implements CanActivate {
	constructor(private readonly accessTokenService: AccessTokenService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<ExtendedRequest>()

		const accessToken = request.headers.authorization.split(' ')[1]

		if (!accessToken)
			throw new UnauthorizedException('Không có quyền truy cập', {
				description: ErrorCode.UNAUTHORIZED_ERROR
			})

		const res = await this.accessTokenService.verify(accessToken)

		request.user = res

		return true
	}
}
