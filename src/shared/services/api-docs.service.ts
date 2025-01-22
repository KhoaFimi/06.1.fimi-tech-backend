import { INestApplication, Injectable } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { ApiConfigService } from '@/shared/services/api-config.service'

@Injectable()
export class ApiDocsService {
	constructor(private readonly apiConfig: ApiConfigService) {}

	setup(app: INestApplication) {
		if (this.apiConfig.isDevelopment) {
			const config = new DocumentBuilder()
				.setTitle('Fimi admin backend')
				.setDescription('## Fimi admin backend doc serve to Fimi admin web app')
				.setVersion('1.0')
				.addBearerAuth()
				.addBearerAuth()
				.addSecurity('api-key', {
					type: 'apiKey',
					in: 'header',
					name: 'X-API-KEY'
				})
				.addSecurity('partner-code', {
					type: 'apiKey',
					in: 'header',
					name: 'X-PARTNER-CODE'
				})
				.addServer('http://localhost:8080', 'Local Server')
				.addServer('https://uat-be.fimi.tech', 'Uat Server')
				.build()

			const docuement = SwaggerModule.createDocument(app, config)

			SwaggerModule.setup(this.apiConfig.apiDocsPrefix, app, docuement, {
				swaggerOptions: {
					persistAuthorization: true
				}
			})

			return {
				message: `Api doc starting at: ${this.apiConfig.apiDocsUrl}`
			}
		}

		return {
			message: 'Api doc not allowed to prodction'
		}
	}
}
