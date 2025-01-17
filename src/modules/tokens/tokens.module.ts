import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { AccessTokenService } from '@/modules/tokens/services/access-token.service'
import { RefreshTokenService } from '@/modules/tokens/services/refresh-token.service'
import { ResetPasswordTokenService } from '@/modules/tokens/services/reset-password-token.service'
import { VerificationTokenService } from '@/modules/tokens/services/verification-token.service'
import { UsersService } from '@/modules/users/users.service'
import { ApiConfigService } from '@/shared/services/api-config.service'
import { PrismaService } from '@/shared/services/prisma.service'

@Module({
	imports: [JwtModule.register({})],
	providers: [
		UsersService,
		VerificationTokenService,
		PrismaService,
		ApiConfigService,
		AccessTokenService,
		RefreshTokenService,
		ResetPasswordTokenService
	],
	exports: [
		AccessTokenService,
		RefreshTokenService,
		VerificationTokenService,
		ResetPasswordTokenService
	]
})
export class TokensModule {}
