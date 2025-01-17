import { BadRequestException, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from '@/app.module'
import { ErrorCode } from '@/constraints/code.constraints'
import { ApiConfigService } from '@/shared/services/api-config.service'
import { ApiDocsService } from '@/shared/services/api-docs.service'
import { LoggerService } from '@/shared/services/logger.service'

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		cors: {
			origin: [
				'http://localhost:3000',
				'https://uat-fe.fimi.tech',
				'https://www.uat-fe.fimi.tech'
			],
			credentials: true
		}
	})

	const apiConfig = app.get(ApiConfigService)
	const logger = app.get(LoggerService)
	const apiDoc = app.get(ApiDocsService)

	app.setGlobalPrefix(apiConfig.apiPrefix)

	app.useGlobalPipes(
		new ValidationPipe({
			exceptionFactory: errors => {
				const result = errors.map(error => ({
					field: error.property,
					detail: error.constraints[Object.keys(error.constraints)[0]]
				}))

				throw new BadRequestException('Request body không hợp lệ', {
					description: ErrorCode.VAL_ERROR,
					cause: {
						validationError: result
					}
				})
			}
		})
	)

	const intializeApiDoc = apiDoc.setup(app)

	await app.listen(apiConfig.port)

	logger.info(`Server starting at: ${apiConfig.apiUrl}`)
	logger.info(intializeApiDoc.message)
}

bootstrap()
