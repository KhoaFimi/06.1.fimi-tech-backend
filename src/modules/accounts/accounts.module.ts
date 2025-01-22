import { Module } from '@nestjs/common'

import { AccountsController } from '@/modules/accounts/accounts.controller'
import { AccountsService } from '@/modules/accounts/accounts.service'
import { PartnersService } from '@/modules/partners/partners.service'
import { TokensModule } from '@/modules/tokens/tokens.module'
import { UsersService } from '@/modules/users/users.service'
import { SharedModule } from '@/shared/shared.module'

@Module({
	imports: [SharedModule, TokensModule],
	controllers: [AccountsController],
	providers: [PartnersService, AccountsService, UsersService]
})
export class AccountsModule {}
