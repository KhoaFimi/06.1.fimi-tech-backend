import { Module } from '@nestjs/common'

import { CategoriesController } from '@/modules/categories/categories.controller'
import { CategoriesService } from '@/modules/categories/categories.service'
import { SharedModule } from '@/shared/shared.module'

@Module({
	imports: [SharedModule],
	controllers: [CategoriesController],
	providers: [CategoriesService],
	exports: [CategoriesService]
})
export class CategoriesModule {}
