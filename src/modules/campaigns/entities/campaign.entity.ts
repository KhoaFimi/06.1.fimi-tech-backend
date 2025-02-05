import { ApiProperty } from '@nestjs/swagger'
import { Exclude, Transform } from 'class-transformer'

import { CampaignCommissionPolicyDto } from '@/modules/campaigns/dtos/common/campaign-commision-policy.dto'
import { CampaignInfoDto } from '@/modules/campaigns/dtos/common/campaign-info.dto'
import { CampaignOfferDto } from '@/modules/campaigns/dtos/common/campaign-offer.dto'
import { CampaignRecognitionRulesDto } from '@/modules/campaigns/dtos/common/campaign-recognition-rules.dto'
import { CampaignRequirementDto } from '@/modules/campaigns/dtos/common/campaign-requirement.dto'
import { CampaignSpecDto } from '@/modules/campaigns/dtos/common/campaign-spec.dto'
import { Category } from '@/modules/categories/entities/category.entity'

enum CampaignStatus {
	UNVERIFY = 'Chưa duyệt',
	OPEN = 'Đang chạy',
	CLOSE = 'Đã đóng'
}

export class Campaign {
	@ApiProperty()
	id: string

	@ApiProperty()
	code: string

	@ApiProperty({
		type: 'string',
		enum: CampaignStatus,
		default: CampaignStatus.OPEN
	})
	@Transform(({ value }) => CampaignStatus[value])
	status: string

	@ApiProperty()
	name: string

	@ApiProperty()
	advertiser: string

	@ApiProperty()
	@Exclude()
	link: string

	@ApiProperty()
	@Exclude()
	subLink: string

	@ApiProperty()
	@Exclude()
	categoryId: string

	@ApiProperty({ type: Category })
	category: Category

	@ApiProperty({ type: [String] })
	images: string[]

	@ApiProperty()
	video: string

	@ApiProperty({ type: [CampaignOfferDto] })
	offers: CampaignOfferDto[]

	@ApiProperty({ type: CampaignInfoDto })
	info: CampaignInfoDto

	@ApiProperty({ type: [CampaignSpecDto] })
	specs: CampaignSpecDto[]

	@ApiProperty({ type: CampaignRequirementDto })
	requirement: CampaignRequirementDto

	@ApiProperty({ type: CampaignCommissionPolicyDto })
	commissionPolicy: CampaignCommissionPolicyDto

	@ApiProperty({ type: CampaignRecognitionRulesDto })
	recognitionRules: CampaignRecognitionRulesDto

	@ApiProperty({ type: [String] })
	registrationProcess: string[]

	@ApiProperty({ type: [String] })
	rejectReason: string[]

	@ApiProperty({ type: [String] })
	unqualifiedRecords: string[]

	@ApiProperty({ type: Date })
	createdAt: Date

	@ApiProperty({ type: Date })
	updatedAt: Date
}
