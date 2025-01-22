import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { AuthController } from '@/modules/auth/auth.controller'
import { AuthService } from '@/modules/auth/auth.service'
import { PartnersModule } from '@/modules/partners/partners.module'
import { TokensModule } from '@/modules/tokens/tokens.module'
import { UsersModule } from '@/modules/users/users.module'
import { SharedModule } from '@/shared/shared.module'

@Module({
	imports: [
		JwtModule.register({}),
		SharedModule,
		TokensModule,
		PartnersModule,
		UsersModule
	],
	providers: [AuthService],
	controllers: [AuthController],
	exports: [AuthService]
})
export class AuthModule {}
