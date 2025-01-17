import {
	CanActivate,
	ExecutionContext,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import * as argon2 from 'argon2'

import { ErrorCode } from '@/constraints/code.constraints'
import { PartnersService } from '@/modules/partners/partners.service'
import { ExtendedRequest } from '@/types/api.type'

@Injectable()
export class VerifyPartnerGuard implements CanActivate {
	constructor(private readonly partnersService: PartnersService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<ExtendedRequest>()

		const partnerCode = request.header('X-PARTNER-CODE')
		const apiKey = request.header('X-API-KEY')

		if (!apiKey || !partnerCode)
			throw new UnauthorizedException('Thiếu API key hoặc Partner code', {
				description: ErrorCode.UNAUTHORIZED_ERROR
			})

		const existingPartner = await this.partnersService.findOneByUnique({
			code: partnerCode
		})

		if (!existingPartner)
			throw new NotFoundException('Partner code không chính xác', {
				description: ErrorCode.NOT_FOUND_ERROR
			})

		const verifyApiKey = await argon2.verify(existingPartner.apiKey, apiKey)

		if (!verifyApiKey)
			throw new UnauthorizedException('Api key không chính xác', {
				description: ErrorCode.UNAUTHORIZED_ERROR
			})

		request.partnerCode = existingPartner.code

		return true
	}
}
