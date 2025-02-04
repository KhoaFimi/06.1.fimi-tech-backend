import { Module } from '@nestjs/common'

import { CategoriesController } from '@/modules/categories/categories.controller'
import { CategoriesService } from '@/modules/categories/categories.service'
import { TokensModule } from '@/modules/tokens/tokens.module'
import { SharedModule } from '@/shared/shared.module'

@Module({
	imports: [SharedModule, TokensModule],
	controllers: [CategoriesController],
	providers: [CategoriesService],
	exports: [CategoriesService]
})
export class CategoriesModule {}
