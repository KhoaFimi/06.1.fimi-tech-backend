import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException
} from '@nestjs/common'
import { Response } from 'express'

import { ErrorCode } from '@/constraints/code.constraints'
import { ApiConfigService } from '@/shared/services/api-config.service'
import { ResponseType } from '@/types/common.type'

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
	constructor(private readonly apiConfig: ApiConfigService) {}

	catch(exception: any, host: ArgumentsHost) {
		const ctx = host.switchToHttp()

		const response = ctx.getResponse<Response<ResponseType>>()

		const status =
			exception instanceof HttpException ? exception.getStatus() : 500

		const message =
			exception instanceof HttpException
				? exception.message
				: 'Internal server error'

		console.log(exception.cause)

		response.status(status).json({
			statusCode: exception.error ?? ErrorCode.INTERNAL_SERVER_ERROR,
			message,
			error: {
				...exception.cause,
				stack: !this.apiConfig.isUat ? exception.stack : null
			}
		})
	}
}
