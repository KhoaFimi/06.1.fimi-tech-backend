import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ApiConfigService } from '@shared/services/api-config.service'
import { LoggerService } from '@shared/services/logger.service'
import { PrismaService } from '@shared/services/prisma.service'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			cache: true,
			expandVariables: true,
			envFilePath:
				process.env.NODE_ENV === 'production' ? '.env' : '.env.development'
		})
	],
	providers: [ApiConfigService, LoggerService, PrismaService],
	exports: [LoggerService, ApiConfigService]
})
export class SharedModule {}
