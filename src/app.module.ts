import { HttpLoggingMiddleware } from '@middlewares/http-logging.middleware.middleware'
import { UsersModule } from '@modules/users/users.module'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { SharedModule } from '@shared/shared.module'

import { AppController } from '@/app.controller'

@Module({
	imports: [SharedModule, UsersModule],
	controllers: [AppController]
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(HttpLoggingMiddleware).forRoutes('*')
	}
}
