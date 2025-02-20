import { BullModule } from '@nestjs/bullmq'
import { Module } from '@nestjs/common'

import {
	ADD_CAMPAIGN_MEDIA_QUEUE_NAME,
	QueuePrefix
} from '@/constants/queue.constant'
import { CampaignsModule } from '@/modules/campaigns/campaigns.module'
import { AddCampaignMediaProcessor } from '@/modules/queues/processors/upload-campaign-media.processor'
import { VerifyProcessor } from '@/modules/queues/processors/verify.processor'
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
			name: ADD_CAMPAIGN_MEDIA_QUEUE_NAME,
			prefix: QueuePrefix.CAMPAIGN
		})
	],
	providers: [VerifyProcessor, QueuesService, AddCampaignMediaProcessor],
	exports: [VerifyProcessor, AddCampaignMediaProcessor, QueuesService]
})
export class QueuesModule {}
