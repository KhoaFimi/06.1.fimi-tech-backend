import { Module } from '@nestjs/common'

import { CampaignsController } from '@/modules/campaigns/campaigns.controller'
import { CampaignsService } from '@/modules/campaigns/campaigns.service'
import { CategoriesModule } from '@/modules/categories/categories.module'
import { TokensModule } from '@/modules/tokens/tokens.module'
import { SharedModule } from '@/shared/shared.module'

@Module({
	imports: [SharedModule, CategoriesModule, TokensModule],
	controllers: [CampaignsController],
	providers: [CampaignsService],
	exports: [CampaignsService]
})
export class CampaignsModule {}
