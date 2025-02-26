import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { AccessTokenService } from '@/modules/tokens/services/access-token.service'
import { ChangeEmailTokenService } from '@/modules/tokens/services/change-email-token.service'
import { RefreshTokenService } from '@/modules/tokens/services/refresh-token.service'
import { ResetPasswordTokenService } from '@/modules/tokens/services/reset-password-token.service'
import { VerificationTokenService } from '@/modules/tokens/services/verification-token.service'
import { UsersModule } from '@/modules/users/users.module'
import { UsersService } from '@/modules/users/users.service'
import { SharedModule } from '@/shared/shared.module'

@Module({
	imports: [JwtModule.register({}), SharedModule, UsersModule],
	providers: [
		UsersService,
		VerificationTokenService,
		AccessTokenService,
		RefreshTokenService,
		ResetPasswordTokenService,
		ChangeEmailTokenService
	],
	exports: [
		AccessTokenService,
		RefreshTokenService,
		VerificationTokenService,
		ResetPasswordTokenService,
		ChangeEmailTokenService
	]
})
export class TokensModule {}
