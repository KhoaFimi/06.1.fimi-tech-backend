import { Module } from '@nestjs/common'

import { AccountsController } from '@/modules/accounts/accounts.controller'
import { AccountsService } from '@/modules/accounts/accounts.service'
import { PartnersService } from '@/modules/partners/partners.service'
import { ResetPasswordTokenService } from '@/modules/tokens/services/reset-password-token.service'
import { VerificationTokenService } from '@/modules/tokens/services/verification-token.service'
import { UsersService } from '@/modules/users/users.service'
import { ApiConfigService } from '@/shared/services/api-config.service'
import { PrismaService } from '@/shared/services/prisma.service'

@Module({
	controllers: [AccountsController],
	providers: [
		PartnersService,
		ApiConfigService,
		PrismaService,
		AccountsService,
		UsersService,
		VerificationTokenService,
		ResetPasswordTokenService
	]
})
export class AccountsModule {}
