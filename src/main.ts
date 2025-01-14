import { NestFactory } from '@nestjs/core'

import { ApiConfigService } from '@/shared/services/api-config.service'

import { AppModule } from './app.module'

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

	app.setGlobalPrefix(apiConfig.apiPrefix)

	await app.listen(apiConfig.port)
}

bootstrap()
