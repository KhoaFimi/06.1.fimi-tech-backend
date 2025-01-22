import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'
import { Request } from 'express'

import { ErrorCode } from '@/constraints/code.constraints'
import { AccessTokenService } from '@/modules/tokens/services/access-token.service'

@Injectable()
export class IsAdminGuard implements CanActivate {
	constructor(private readonly accessTokenService: AccessTokenService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<Request>()

		const accessToken = request.headers.authorization.split(' ')[1]

		if (!accessToken)
			throw new UnauthorizedException('Không có quyền truy cập', {
				description: ErrorCode.UNAUTHORIZED_ERROR
			})

		const res = await this.accessTokenService.verify(accessToken)

		if (res.roles < 2)
			throw new UnauthorizedException('Không có quyền truy cập', {
				description: ErrorCode.UNAUTHORIZED_ERROR
			})

		return true
	}
}
