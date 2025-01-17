import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiSecurity } from '@nestjs/swagger'
import { plainToClass } from 'class-transformer'

import { SuccessCode } from '@/constraints/code.constraints'
import { ResponseBody } from '@/decorators/response-message.decorator'
import { AccessTokenGuard } from '@/guards/access-token.guard'
import { User } from '@/modules/users/entities/user.entity'
import { ExtendedRequest } from '@/types/api.type'

@Controller('users')
export class UsersController {
	@Get('/me')
	@UseGuards(AccessTokenGuard)
	@ResponseBody({
		statusCode: SuccessCode.OK,
		message: 'Lấy thông tin người dùng thành công'
	})
	@ApiBearerAuth()
	@ApiSecurity('api-key')
	@ApiSecurity('partner-code')
	async me(@Req() request: ExtendedRequest) {
		return {
			user: plainToClass(User, request.user)
		}
	}
}
