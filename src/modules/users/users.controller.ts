import {
	Body,
	Controller,
	Get,
	Param,
	Put,
	Req,
	UseGuards
} from '@nestjs/common'
import { ApiBearerAuth, ApiSecurity } from '@nestjs/swagger'
import { plainToClass } from 'class-transformer'

import { SuccessCode } from '@/constraints/code.constraints'
import { ResponseBody } from '@/decorators/response-message.decorator'
import { AccessTokenGuard } from '@/guards/access-token.guard'
import { ChangePasswordDto } from '@/modules/users/dtos/change-password.dto'
import { UpdateUserInfoDto } from '@/modules/users/dtos/update-user-info.dto'
import { User } from '@/modules/users/entities/user.entity'
import { UsersService } from '@/modules/users/users.service'
import { ExtendedRequest } from '@/types/api.type'

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	// #region: Me
	@Get('/me')
	@UseGuards(AccessTokenGuard)
	@ResponseBody({
		statusCode: SuccessCode.OK,
		message: 'Lấy thông tin người dùng thành công'
	})
	@ApiBearerAuth()
	@ApiSecurity('api-key')
	@ApiSecurity('partner-code')
	async me(@Req() request: ExtendedRequest) {
		return {
			user: plainToClass(User, request.user)
		}
	}
	// #endregion

	// #region: Update user data
	@Put('/update-info/:id')
	@UseGuards(AccessTokenGuard)
	@ResponseBody({
		statusCode: SuccessCode.OK,
		message: 'Cập nhật thông tin người dùng thành công'
	})
	@ApiBearerAuth()
	@ApiSecurity('api-key')
	@ApiSecurity('partner-code')
	async UpdateUser(
		@Param('id') id: string,
		@Body() updateUserDto: UpdateUserInfoDto
	) {
		const existingUser = await this.usersService.checkExistingUser(id)

		const res = await this.usersService.update(existingUser.id, {
			...updateUserDto,
			profile: {
				...updateUserDto.profile
			}
		})

		return {
			user: plainToClass(User, res)
		}
	}
	// #endregion

	// #region: Change password
	@Put('/change-password/:id')
	@UseGuards(AccessTokenGuard)
	@ResponseBody({
		statusCode: SuccessCode.OK,
		message: 'Thay đổi mật khẩu thành công, yêu cầu đăng nhập lại'
	})
	@ApiBearerAuth()
	@ApiSecurity('api-key')
	@ApiSecurity('partner-code')
	async ChangePassword(
		@Param('id') id: string,
		@Body() body: ChangePasswordDto
	) {
		await this.usersService.changePassword(id, body)
	}
	// #endregion
}
