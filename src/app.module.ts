import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { EventEmitterModule } from '@nestjs/event-emitter'

import { AppController } from '@/app.controller'
import { GlobalExceptionFilter } from '@/filters/global-exception.filter'
import { ResponseInterceptor } from '@/interceptors/response.interceptor'
import { HttpLoggingMiddleware } from '@/middlewares/http-logging.middleware.middleware'
import { AccountsModule } from '@/modules/accounts/accounts.module'
import { AuthModule } from '@/modules/auth/auth.module'
import { PartnersModule } from '@/modules/partners/partners.module'
import { QueuesModule } from '@/modules/queues/queues.module'
import { TokensModule } from '@/modules/tokens/tokens.module'
import { UsersModule } from '@/modules/users/users.module'
import { SharedModule } from '@/shared/shared.module'

@Module({
	imports: [
		EventEmitterModule.forRoot(),
		SharedModule,
		UsersModule,
		PartnersModule,
		AuthModule,
		TokensModule,
		AccountsModule,
		QueuesModule
	],
	controllers: [AppController],
	providers: [
		{
			provide: APP_FILTER,
			useClass: GlobalExceptionFilter
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: ResponseInterceptor
		}
	]
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(HttpLoggingMiddleware).forRoutes('*')
	}
}
