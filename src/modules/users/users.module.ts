import { Module } from '@nestjs/common'

import { TokensModule } from '@/modules/tokens/tokens.module'
import { SharedModule } from '@/shared/shared.module'

import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
	imports: [TokensModule, SharedModule],
	controllers: [UsersController],
	providers: [UsersService],
	exports: [UsersService]
})
export class UsersModule {}
