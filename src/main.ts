import { NestFactory } from '@nestjs/core'
import { ApiConfigService } from '@shared/services/api-config.service'

import { AppModule } from '@/app.module'
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

	app.setGlobalPrefix(apiConfig.apiPrefix)

	await app.listen(apiConfig.port)

	logger.info(`Server starting at: ${apiConfig.apiUrl}`)
	logger.info(`Doc api starting at: ${apiConfig.apiDocsUrl}`)
}

bootstrap()
