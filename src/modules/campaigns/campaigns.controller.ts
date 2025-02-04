import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Put,
	UploadedFiles,
	UseGuards,
	UseInterceptors
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { ApiBearerAuth, ApiConsumes, ApiSecurity } from '@nestjs/swagger'
import { plainToClass } from 'class-transformer'

import { SuccessCode } from '@/constraints/code.constraints'
import { ResponseBody } from '@/decorators/response-message.decorator'
import { AccessTokenGuard } from '@/guards/access-token.guard'
import { IsAdminGuard } from '@/guards/is-admin.guard'
import { CampaignsService } from '@/modules/campaigns/campaigns.service'
import { AddCampaignInfoDto } from '@/modules/campaigns/dtos/add-campaign-info.dto'
import { ChangeCampaignStatusDto } from '@/modules/campaigns/dtos/change-campaign-status.dto'
import { InitCampaignDto } from '@/modules/campaigns/dtos/init-campaign.dto'
import { UploadCampaignMediaDto } from '@/modules/campaigns/dtos/upload-campaign-media.dto'
import { Campaign } from '@/modules/campaigns/entities/campaign.entity'

@Controller('campaigns')
export class CampaignsController {
	constructor(private readonly campaignsService: CampaignsService) {}

	// #region:Init campaign
	@Post('/init')
	@UseGuards(IsAdminGuard)
	@HttpCode(HttpStatus.OK)
	@ResponseBody({
		statusCode: SuccessCode.OK,
		message: 'Tạo chiến dịch thành công'
	})
	@ApiBearerAuth()
	async initCampaign(@Body() body: InitCampaignDto) {
		const res = await this.campaignsService.init(body)

		return {
			campaignId: res
		}
	}
	// #endregion

	// #region: Add campaign info
	@Put('/add-info/:id')
	@UseGuards(IsAdminGuard)
	@HttpCode(HttpStatus.OK)
	@ResponseBody({
		statusCode: SuccessCode.OK,
		message: 'Thêm thông tin cho chiến dịch thành công'
	})
	@ApiBearerAuth()
	async addCampaignInfo(
		@Param('id') id: string,
		@Body() addCampaignInfo: AddCampaignInfoDto
	) {
		const res = await this.campaignsService.addInfo(id, addCampaignInfo)

		return {
			campaign: res
		}
	}
	// #endregion

	// #region: Upload campaign media
	@Post('/upload-media/:id')
	@UseGuards(IsAdminGuard)
	@HttpCode(HttpStatus.OK)
	@ResponseBody({
		statusCode: SuccessCode.OK,
		message: 'Thêm media cho chiến dịch thành công'
	})
	@ApiBearerAuth()
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(FilesInterceptor('images'))
	async uploadCampaignMedia(
		@Param('id') id: string,
		@UploadedFiles() images: Express.Multer.File[],
		@Body() body: UploadCampaignMediaDto
	) {
		await this.campaignsService.uploadMedia(id, images, body)
	}
	// #endregion

	// #region: Change campaign status
	@Put('change-status/:id')
	@UseGuards(IsAdminGuard)
	@HttpCode(HttpStatus.OK)
	@ResponseBody({
		statusCode: SuccessCode.OK,
		message: 'Thay đổi trạng thái chiến dịch thành công thành công'
	})
	@ApiBearerAuth()
	async changeStatus(
		@Param('id') id: string,
		@Body() body: ChangeCampaignStatusDto
	) {
		const res = await this.campaignsService.changeStatus(id, body)

		return {
			campaign: plainToClass(Campaign, res)
		}
	}
	// #endregion

	// #region: Find Campaign by Category
	@Get('/:categoryId')
	@UseGuards(AccessTokenGuard)
	@HttpCode(HttpStatus.OK)
	@ResponseBody({
		statusCode: SuccessCode.OK,
		message: 'Thay đổi trạng thái chiến dịch thành công thành công'
	})
	@ApiBearerAuth()
	@ApiSecurity('api-key')
	@ApiSecurity('partner-code')
	async getCampaignByCategory(@Param('categoryId') id: string) {
		const res = await this.campaignsService.findAll(
			{
				categoryId: id
			},
			{ page: 0, limit: 10 },
			{
				include: {
					category: {
						select: {
							id: true,
							name: true
						}
					}
				}
			}
		)

		return {
			campaigns: plainToClass(Campaign, res.campaigns),
			count: res.count
		}
	}
	// #endregion
}
