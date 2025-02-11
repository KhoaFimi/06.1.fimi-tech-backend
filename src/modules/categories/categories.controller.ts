import { Controller, Get, UseGuards } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'

import { SuccessCode } from '@/constraints/code.constraints'
import { ResponseBody } from '@/decorators/response-message.decorator'
import { AccessTokenGuard } from '@/guards/access-token.guard'

import { CategoriesService } from './categories.service'

@Controller('categories')
export class CategoriesController {
	constructor(private readonly categoriesService: CategoriesService) {}

	// #region: Get all category
	@Get('/')
	@UseGuards(AccessTokenGuard)
	@ResponseBody({
		statusCode: SuccessCode.OK,
		message: 'Lấy danh mục'
	})
	@ApiBearerAuth()
	async getCategories() {
		const res = await this.categoriesService.findAll({})

		return res
	}
	// #endregion
}
