import { BullModule } from '@nestjs/bullmq'
import { Module } from '@nestjs/common'

import {
	ADD_CAMPAIGN_MEDIA_QUEUE_NAME,
	OTP_QUEUE_NAME,
	QueuePrefix,
	UPLOAD_USER_MEDIA_QUEUE_NAME
} from '@/constants/queue.constant'
import { CampaignsModule } from '@/modules/campaigns/campaigns.module'
import { OtpProcessor } from '@/modules/queues/processors/otp.processor'
import { AddCampaignMediaProcessor } from '@/modules/queues/processors/upload-campaign-media.processor'
import { UploadUserMediaProcessor } from '@/modules/queues/processors/upload-user-media.processor'
import { QueuesService } from '@/modules/queues/queues.service'
import { TokensModule } from '@/modules/tokens/tokens.module'
import { UsersModule } from '@/modules/users/users.module'
import { SharedModule } from '@/shared/shared.module'

@Module({
	imports: [
		SharedModule,
		TokensModule,
		CampaignsModule,
		UsersModule,
		BullModule.registerQueue({
			name: OTP_QUEUE_NAME,
			prefix: QueuePrefix.AUTH
		}),
		BullModule.registerQueue({
			name: ADD_CAMPAIGN_MEDIA_QUEUE_NAME,
			prefix: QueuePrefix.CAMPAIGN
		}),
		BullModule.registerQueue({
			name: UPLOAD_USER_MEDIA_QUEUE_NAME,
			prefix: QueuePrefix.USER
		})
	],
	providers: [
		OtpProcessor,
		QueuesService,
		AddCampaignMediaProcessor,
		UploadUserMediaProcessor
	]
})
export class QueuesModule {}
