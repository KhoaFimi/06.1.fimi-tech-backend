import { BullModule } from '@nestjs/bullmq'
import { Module } from '@nestjs/common'

import {
	OTP_QUEUE_NAME,
	QueuePrefix,
	UPLOAD_USER_MEDIA_QUEUE_NAME
} from '@/constants/queue.constant'
import { AccountsController } from '@/modules/accounts/accounts.controller'
import { AccountsService } from '@/modules/accounts/accounts.service'
import { UploadUserMediaProcessor } from '@/modules/accounts/consumers/upload-user-media.processor'
import { AuthModule } from '@/modules/auth/auth.module'
import { PartnersService } from '@/modules/partners/partners.service'
import { TokensModule } from '@/modules/tokens/tokens.module'
import { UsersService } from '@/modules/users/users.service'
import { SharedModule } from '@/shared/shared.module'

@Module({
	imports: [
		SharedModule,
		TokensModule,
		AuthModule,
		BullModule.registerQueue({
			name: UPLOAD_USER_MEDIA_QUEUE_NAME,
			prefix: QueuePrefix.USER
		}),
		BullModule.registerQueue({
			name: OTP_QUEUE_NAME,
			prefix: QueuePrefix.AUTH
		})
	],
	controllers: [AccountsController],
	providers: [
		PartnersService,
		AccountsService,
		UsersService,
		UploadUserMediaProcessor
	]
})
export class AccountsModule {}
