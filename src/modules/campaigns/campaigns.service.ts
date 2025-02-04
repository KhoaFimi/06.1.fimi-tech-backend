import {
	BadRequestException,
	ConflictException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'

import { ErrorCode } from '@/constraints/code.constraints'
import { ChangeCampaignStatusDto } from '@/modules/campaigns/dtos/change-campaign-status.dto'
import { FindAllCampaignDto } from '@/modules/campaigns/dtos/find-all-campaign.dto'
import {
	FindCampaignByDto,
	FindCampaignDto,
	FindUniqueCampaignDto
} from '@/modules/campaigns/dtos/find-campaign.dto'
import { InitCampaignDto } from '@/modules/campaigns/dtos/init-campaign.dto'
import { UpdateCampaignDto } from '@/modules/campaigns/dtos/update-campaign.dto'
import { UploadCampaignMediaDto } from '@/modules/campaigns/dtos/upload-campaign-media.dto'
import { CategoriesService } from '@/modules/categories/categories.service'
import { AddCampaignMediaDto } from '@/modules/queues/dtos/add-campaign-media.dto'
import { PrismaService } from '@/shared/services/prisma.service'
import { FindAllParams } from '@/types/common.type'

import { AddCampaignInfoDto } from './dtos/add-campaign-info.dto'

@Injectable()
export class CampaignsService {
	constructor(
		private readonly db: PrismaService,
		private readonly categoriesService: CategoriesService,
		private readonly eventEmiter: EventEmitter2
	) {}

	// #region: Create combo service
	public async init(initCampaignDto: InitCampaignDto) {
		await this.verifyCreateData({
			campaignCode: initCampaignDto.code,
			categoryId: initCampaignDto.categoryId
		})

		const newCampaign = await this.db.campaign.create({
			data: {
				...initCampaignDto
			}
		})

		return newCampaign.id
	}

	public async addInfo(
		campaignId: string,
		addCampaignInfoDto: AddCampaignInfoDto
	) {
		return await this.db.campaign.update({
			where: { id: campaignId },
			data: {
				...addCampaignInfoDto
			}
		})
	}

	public async uploadMedia(
		id: string,
		images: Express.Multer.File[],
		body: UploadCampaignMediaDto
	) {
		this.eventEmiter.emit(
			'add.campaign-media',
			new AddCampaignMediaDto({
				id,
				video: body.video,
				images
			})
		)
	}

	public async update(id: string, data: UpdateCampaignDto) {
		return await this.db.campaign.update({
			where: { id },
			data: {
				...data
			}
		})
	}
	// #endregion

	// #region: Common servcice
	async findAll(
		where: FindAllCampaignDto,
		{ page = 0, limit = 10 }: FindAllParams,
		options?: FindCampaignDto
	) {
		const take = limit
		const skip = (page + 1) * limit

		const [campaigns, count] = await this.db.$transaction([
			this.db.campaign.findMany({
				where,
				...options,
				take,
				skip
			}),
			this.db.campaign.count({ where })
		])

		return {
			campaigns,
			count
		}
	}

	async findOneById(id: string, options?: FindCampaignDto) {
		return await this.db.campaign.findUnique({
			where: { id },
			...options
		})
	}

	async findOneByUnique(
		where: FindUniqueCampaignDto,
		options?: FindCampaignDto
	) {
		return await this.db.campaign.findUnique({
			where,
			...options
		})
	}

	async findOneBy(where: FindCampaignByDto, options?: FindCampaignDto) {
		return await this.db.campaign.findFirst({ where, ...options })
	}

	async delete(id: string) {
		return this.db.campaign.delete({
			where: { id }
		})
	}
	// #endregion

	async changeStatus(
		id: string,
		changeCampaignStausDto: ChangeCampaignStatusDto
	) {
		const existingCampaign = await this.findOneById(id)

		if (!existingCampaign)
			throw new NotFoundException('Không tìm thấy chiến dịch tương ứng', {
				description: ErrorCode.NOT_FOUND_ERROR,
				cause: {
					validationError: [
						{
							field: 'id',
							detail: 'Id chiến dịch không chính xác'
						}
					]
				}
			})

		const res = await this.update(id, {
			status: changeCampaignStausDto.status
		})

		return res
	}

	async softDelete(id: string) {
		return await this.db.user.update({
			where: { id },
			data: {
				isDelete: true
			}
		})
	}

	async pernamentDeltete(id: string) {
		return this.db.user.delete({
			where: { id }
		})
	}

	// #region: Local service
	private async verifyCreateData({
		campaignCode,
		categoryId
	}: {
		campaignCode: string
		categoryId: string
	}) {
		const existingCampaign = await this.db.campaign.findUnique({
			where: { code: campaignCode }
		})

		if (existingCampaign) {
			throw new ConflictException('Mã chiến dịch đã tồn tại trên hệ thống', {
				description: ErrorCode.VAL_ERROR,
				cause: {
					validationError: [
						{
							field: 'code',
							detail:
								'Mã chiến dịch đã tồn tại trên hệ thống, vui lòng đặt một mã mới'
						}
					]
				}
			})
		}

		const existingCategory =
			await this.categoriesService.findOneById(categoryId)

		if (!existingCategory) {
			throw new BadRequestException(
				'Không tìm thấy danh mục, vui lòng chọn lại danh mục',
				{
					description: ErrorCode.WRONG_CREDENTIALS_ERROR
				}
			)
		}

		return
	}
	// #endregion
}
