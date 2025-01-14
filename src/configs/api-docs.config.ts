import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

export const apiDocsConfig = (app: INestApplication, apiDocPath) => {
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

	SwaggerModule.setup(apiDocPath, app, docuement)
}
