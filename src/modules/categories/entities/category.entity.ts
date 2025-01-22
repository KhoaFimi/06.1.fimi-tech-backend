import { ApiProperty } from '@nestjs/swagger'

import { Campaign } from '@/modules/campaigns/entities/campaign.entity'

export class Category {
	@ApiProperty()
	id: string

	@ApiProperty()
	name: string

	@ApiProperty({ type: [Campaign] })
	campaigns: Campaign[]

	@ApiProperty({ type: Date })
	createdAt: Date

	@ApiProperty({ type: Date })
	updatedAt: Date
}
