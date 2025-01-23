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

		if (exception instanceof HttpException) {
			const status = exception.getStatus() ?? 500

			const message = exception.message ?? 'Internal server error'

			const exRes = exception.getResponse() as {
				message: string
				error: string
				statusCode: number
			}

			return response.status(status).json({
				statusCode: exRes.error ?? ErrorCode.INTERNAL_SERVER_ERROR,
				message,
				error: {
					...(exception.cause as object),
					stack: exception.stack
				}
			})
		}

		response.status(500).json({
			statusCode: ErrorCode.INTERNAL_SERVER_ERROR,
			message: 'Internal server error',
			error: {
				...exception.cause,
				stack: exception.stack
			}
		})
	}
}
