import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { SharedModule } from '@shared/shared.module'

import { AppController } from '@/app.controller'
import { HttpLoggingMiddleware } from '@/middlewares/http-logging.middleware.middleware'

@Module({
	imports: [SharedModule],
	controllers: [AppController]
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(HttpLoggingMiddleware).forRoutes('*')
	}
}
