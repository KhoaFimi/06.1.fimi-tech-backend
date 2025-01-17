import { Module } from '@nestjs/common'

import { PartnersController } from '@/modules/partners/partners.controller'
import { PartnersService } from '@/modules/partners/partners.service'
import { SharedModule } from '@/shared/shared.module'

@Module({
	imports: [SharedModule],
	providers: [PartnersService],
	controllers: [PartnersController],
	exports: [PartnersService]
})
export class PartnersModule {}
