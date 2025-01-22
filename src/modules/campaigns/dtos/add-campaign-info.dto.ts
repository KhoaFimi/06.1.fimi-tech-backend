import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
	ArrayMinSize,
	IsArray,
	IsNotEmpty,
	ValidateNested
} from 'class-validator'

import { CampaignCommissionPolicyDto } from '@/modules/campaigns/dtos/common/campaign-commision-policy.dto'
import { CampaignInfoDto } from '@/modules/campaigns/dtos/common/campaign-info.dto'
import { CampaignOfferDto } from '@/modules/campaigns/dtos/common/campaign-offer.dto'
import { CampaignRecognitionRulesDto } from '@/modules/campaigns/dtos/common/campaign-recognition-rules.dto'
import { CampaignRequirementDto } from '@/modules/campaigns/dtos/common/campaign-requirement.dto'
import { CampaignSpecDto } from '@/modules/campaigns/dtos/common/campaign-spec.dto'

export class AddCampaignInfoDto {
	@ApiProperty()
	@IsNotEmpty({ message: 'Vui lòng nhập tên nhà cung cấp' })
	advertiser: string

	@ApiProperty()
	@IsNotEmpty({ message: 'Vui lòng thêm link cho chiến dịch' })
	link: string

	@ApiProperty()
	@IsArray()
	@ValidateNested({ each: true })
	@ArrayMinSize(1, { message: 'Vui lòng thêm ít nhất 1 ưu đãi' })
	@Type(() => CampaignOfferDto)
	offers: CampaignOfferDto[]

	@ApiProperty()
	@ValidateNested()
	@Type(() => CampaignInfoDto)
	info: CampaignInfoDto

	@ApiProperty()
	@IsArray()
	@ValidateNested({ each: true })
	@ArrayMinSize(1, { message: 'Vui lòng thêm ít nhát 1 đặc điểm' })
	@Type(() => CampaignSpecDto)
	specs: CampaignSpecDto[]

	@ApiProperty()
	@ValidateNested()
	@Type(() => CampaignRequirementDto)
	requirement: CampaignRequirementDto

	@ApiProperty()
	@ValidateNested()
	@Type(() => CampaignCommissionPolicyDto)
	commissionPolicy: CampaignCommissionPolicyDto

	@ApiProperty()
	@ValidateNested()
	@Type(() => CampaignRecognitionRulesDto)
	recognitionRules: CampaignRecognitionRulesDto

	@ApiProperty()
	@IsArray()
	@ArrayMinSize(1, {
		message: 'Vui lòng thêm các bước đăng ký'
	})
	registrationProcess: string[]

	@ApiProperty()
	@IsArray()
	@ArrayMinSize(1, {
		message: 'Vui lòng thêm ít nhất 1 lý do từ chối'
	})
	rejectReason: string[]

	@ApiProperty()
	@IsArray()
	@ArrayMinSize(1, {
		message: 'Vui lòng thêm ít nhất 1 mô tả về các giấy tời không hợp lệ'
	})
	unqualifiedRecords: string[]
}
