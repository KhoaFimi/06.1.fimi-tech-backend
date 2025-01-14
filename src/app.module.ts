import { GlobalExceptionFilter } from '@filters/global-exception.filter'
import { ResponseInterceptor } from '@interceptors/response.interceptor'
import { HttpLoggingMiddleware } from '@middlewares/http-logging.middleware.middleware'
import { UsersModule } from '@modules/users/users.module'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { SharedModule } from '@shared/shared.module'

import { AppController } from '@/app.controller'

@Module({
	imports: [SharedModule, UsersModule],
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
