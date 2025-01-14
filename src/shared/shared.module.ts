import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { ApiConfigService } from '@shared/services/api-config.service'

import { LoggerService } from '@/shared/services/logger.service'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			cache: true,
			expandVariables: true,
			envFilePath:
				process.env.NODE_ENV === 'production' ? '.env' : '.env.development'
		}),
		MongooseModule.forRootAsync({
			imports: [SharedModule],
			inject: [ApiConfigService],
			useFactory: async (apiConfig: ApiConfigService) => ({
				uri: apiConfig.databaseUrl,
				dbName: apiConfig.databaseName
			})
		})
	],
	providers: [ApiConfigService, LoggerService],
	exports: [LoggerService, ApiConfigService]
})
export class SharedModule {}
