import { BullModule } from '@nestjs/bullmq'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MailerModule } from '@nestjs-modules/mailer'
import { google } from 'googleapis'
import { CloudinaryModule } from 'nestjs-cloudinary'

import { ApiConfigService } from '@/shared/services/api-config.service'
import { ApiDocsService } from '@/shared/services/api-docs.service'
import { LoggerService } from '@/shared/services/logger.service'
import { PrismaService } from '@/shared/services/prisma.service'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			cache: true,
			expandVariables: true,
			envFilePath:
				process.env.NODE_ENV === 'production' ? '.env' : '.env.development'
		}),
		BullModule.forRootAsync({
			imports: [SharedModule],
			inject: [ApiConfigService],
			useFactory: (apiConfig: ApiConfigService) => {
				return {
					connection: {
						host: apiConfig.redisHost,
						port: apiConfig.redisPort
					}
				}
			}
		}),
		MailerModule.forRootAsync({
			imports: [SharedModule],
			inject: [ApiConfigService],
			useFactory: async (apiConfig: ApiConfigService) => {
				const Oauth2 = google.auth.OAuth2

				const oauth2Client = new Oauth2(
					apiConfig.googleClientId,
					apiConfig.googleClientSecret
				)

				oauth2Client.setCredentials({
					refresh_token: apiConfig.googleRefreshToken
				})

				const accessTokenObj = await oauth2Client.getAccessToken()

				const accessToken = accessTokenObj.token

				return {
					transport: {
						service: 'gmail',
						auth: {
							type: 'OAuth2',
							user: apiConfig.adminEmailAddress,
							clientId: apiConfig.googleClientId,
							clientSecret: apiConfig.googleClientSecret,
							accessToken,
							refreshToken: apiConfig.googleRefreshToken
						}
					},
					defaults: {
						from: `FIMI <no-reply@fimi.tech>`
					}
				}
			}
		}),
		CloudinaryModule.forRootAsync({
			imports: [SharedModule],
			inject: [ApiConfigService],
			useFactory: (apiConfig: ApiConfigService) => ({
				api_key: apiConfig.cloudinaryApiKey,
				api_secret: apiConfig.cloudinaryApiSecret,
				cloud_name: apiConfig.cloudinaryCloudName
			})
		})
	],
	providers: [
		ApiConfigService,
		LoggerService,
		PrismaService,
		ApiDocsService
		// MailerConfigService
	],
	exports: [LoggerService, ApiConfigService, PrismaService, ApiDocsService]
})
export class SharedModule {}
