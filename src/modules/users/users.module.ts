import { Module } from '@nestjs/common'

import { TokensModule } from '@/modules/tokens/tokens.module'
import { UsersController } from '@/modules/users/users.controller'
import { UsersService } from '@/modules/users/users.service'
import { SharedModule } from '@/shared/shared.module'

@Module({
	imports: [SharedModule, TokensModule],
	controllers: [UsersController],
	providers: [UsersService],
	exports: [UsersService]
})
export class UsersModule {}
