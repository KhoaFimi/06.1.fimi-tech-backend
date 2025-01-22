import { Transform } from 'class-transformer'
import { IsEnum, IsNotEmpty } from 'class-validator'

enum CampaignStatus {
	UNVERIFY = 'UNVERIFY',
	OPEN = 'OPEN',
	CLOSE = 'CLOSE'
}

export class ChangeCampaignStatusDto {
	@IsNotEmpty({ message: 'Vui lòng chọn status cho campaign' })
	@IsEnum(CampaignStatus, { message: 'Lựa chọn không phù hợp' })
	@Transform(({ value }) => CampaignStatus[value])
	status: CampaignStatus
}
