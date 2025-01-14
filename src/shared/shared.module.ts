import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ApiConfigService } from '@shared/services/api-config.service'

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
	providers: [ApiConfigService]
})
export class SharedModule {}
