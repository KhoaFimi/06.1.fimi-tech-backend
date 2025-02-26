import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Put,
	UploadedFile,
	UploadedFiles,
	UseGuards,
	UseInterceptors
} from '@nestjs/common'
import {
	FileFieldsInterceptor,
	FileInterceptor
} from '@nestjs/platform-express'
import {
	ApiBearerAuth,
	ApiBody,
	ApiConsumes,
	ApiParam,
	ApiSecurity,
	ApiTags
} from '@nestjs/swagger'
import { plainToClass } from 'class-transformer'

import { SuccessCode } from '@/constraints/code.constraints'
import { ResponseBody } from '@/decorators/response-message.decorator'
import { AccessTokenGuard } from '@/guards/access-token.guard'
import { AccountsService } from '@/modules/accounts/accounts.service'
import {
	ChangeEmaiDto,
	RequestChangeEmailDto
} from '@/modules/accounts/dtos/change-email.dto'
import { ChangePasswordDto } from '@/modules/accounts/dtos/change-password.dto'
import { ChangeUserPhoneDto } from '@/modules/accounts/dtos/change-user-phone.dto'
import { ForgotPasswordDto } from '@/modules/accounts/dtos/forgot-password.dto'
import { NewVerificationDto } from '@/modules/accounts/dtos/new-verification.dto'
import { ResetPasswordDto } from '@/modules/accounts/dtos/reset-password.dto'
import { UpdateUserInfoDto } from '@/modules/accounts/dtos/update-user-info.dto'
import { IdentifierCardImageFilter } from '@/modules/accounts/filters/identifier-card-image.filter'
import { PotraitFilter } from '@/modules/accounts/filters/potrait.filter'
import { User } from '@/modules/users/entities/user.entity'

@Controller('accounts')
@ApiTags('Account')
export class AccountsController {
	constructor(private readonly accountsService: AccountsService) {}

	// #region: new verification
	@Post('email-verification')
	@ResponseBody({
		statusCode: SuccessCode.OK,
		message: 'Xác thực thành công'
	})
	async emailVerification(@Body() body: NewVerificationDto) {
		await this.accountsService.newVerification(body)
	}
	// #endregion

	// #region: get new otp
	@Get('/new-email-verification-session/:key')
	@ResponseBody({
		statusCode: SuccessCode.OK,
		message: 'Lấy OTP mới thành công'
	})
	@ApiParam({
		name: 'key',
		required: true
	})
	async newOtp(@Param('key') verificationKey: string) {
		const res =
			await this.accountsService.getNewEmailVerifySession(verificationKey)

		return res
	}
	// #endregion

	// #region: forgot password
	@Post('/forgot-password')
	@ResponseBody({
		statusCode: SuccessCode.OK,
		message: 'Yêu cầu lấy lại mật khẩu thành công'
	})
	@ApiBody({
		type: ForgotPasswordDto
	})
	async forgotPassword(@Body() body: ForgotPasswordDto) {
		const res = await this.accountsService.forgotPassword(body)

		return res
	}
	// #endregion

	// #region: reset password
	@Post('/reset-password')
	@ResponseBody({
		statusCode: SuccessCode.OK,
		message: 'Tạo mật khẩu mới thành công'
	})
	@ApiBody({
		type: ResetPasswordDto
	})
	async resetPassword(@Body() body: ResetPasswordDto) {
		const res = await this.accountsService.resetPassword(body)

		return res
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
	async UpdateUser(
		@Param('id') id: string,
		@Body() updateUserDto: UpdateUserInfoDto
	) {
		const res = await this.accountsService.changeInfo(id, updateUserDto)

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
		await this.accountsService.changePassword(id, body)
	}
	// #endregion

	// #region: Change phone number
	@Put('/change-phone/:id')
	@UseGuards(AccessTokenGuard)
	@ResponseBody({
		statusCode: SuccessCode.OK,
		message: 'Thay đổi số điện thoại thành công.'
	})
	@ApiBearerAuth()
	async ChangePhone(@Param('id') id: string, @Body() body: ChangeUserPhoneDto) {
		const res = await this.accountsService.changePhone(id, body)

		return {
			user: plainToClass(User, res)
		}
	}
	// #endregion

	// #region: Request change email
	@Post('/request-change-email/:id')
	@UseGuards(AccessTokenGuard)
	@HttpCode(HttpStatus.OK)
	@ResponseBody({
		statusCode: SuccessCode.OK,
		message: 'Yêu cầu thay đổi email thành công.'
	})
	@ApiBearerAuth()
	async RequestChangeEmail(
		@Param('id') id: string,
		@Body() body: RequestChangeEmailDto
	) {
		const res = await this.accountsService.requestChangeEmail(id, body)

		return res
	}
	// #endregion

	// #region: Change email
	@Post('/change-email')
	@UseGuards(AccessTokenGuard)
	@ResponseBody({
		statusCode: SuccessCode.OK,
		message: 'Thay đổi email thành công.'
	})
	@ApiBearerAuth()
	async ChangeEmail(@Body() body: ChangeEmaiDto) {
		const res = await this.accountsService.changeEmail(body)

		return {
			user: plainToClass(User, res)
		}
	}
	// #endregion

	// #region: Change avatar
	@Post('/change-avatar/:id')
	@UseGuards(AccessTokenGuard)
	@HttpCode(HttpStatus.OK)
	@ResponseBody({
		statusCode: SuccessCode.OK,
		message: 'Thêm ảnh đại diện thành công'
	})
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				avatar: {
					type: 'string',
					format: 'binary'
				}
			}
		}
	})
	@ApiBearerAuth()
	@UseInterceptors(FileInterceptor('avatar'))
	async changeAvatar(
		@Param('id') id: string,
		@UploadedFile() avatar: Express.Multer.File
	) {
		const res = await this.accountsService.changeAvatar(id, avatar)

		return res
	}
	// #endregion

	// #region: Upload CCCD
	@Post('/upload-document/identifier/:id')
	@UseGuards(AccessTokenGuard)
	@HttpCode(HttpStatus.OK)
	@ResponseBody({
		statusCode: SuccessCode.OK,
		message: 'Thêm ảnh căn cước công dân thành công'
	})
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				front: {
					type: 'string',
					format: 'binary'
				},
				back: {
					type: 'string',
					format: 'binary'
				}
			}
		}
	})
	@ApiBearerAuth()
	@UseInterceptors(
		FileFieldsInterceptor([
			{ name: 'front', maxCount: 1 },
			{ name: 'back', maxCount: 1 }
		])
	)
	async uploadIdentifierCardImage(
		@Param('id') id: string,
		@UploadedFiles(new IdentifierCardImageFilter())
		files: { front?: Express.Multer.File[]; back?: Express.Multer.File[] }
	) {
		const res = await this.accountsService.addIdentifierCardImage(id, files)

		return res
	}
	// #endregion

	// #region: Upload potrait
	@Post('/upload-document/potrait/:id')
	@UseGuards(AccessTokenGuard)
	@HttpCode(HttpStatus.OK)
	@ResponseBody({
		statusCode: SuccessCode.OK,
		message: 'Thêm ảnh chân dung thành công'
	})
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				potrait: {
					type: 'string',
					format: 'binary'
				}
			}
		}
	})
	@ApiBearerAuth()
	@UseInterceptors(FileInterceptor('potrait'))
	async uploadPotraitImage(
		@Param('id') id: string,
		@UploadedFile(new PotraitFilter())
		potrait: Express.Multer.File
	) {
		const res = await this.accountsService.addPotraitImage(id, potrait)

		return res
	}
	// #endregion
}
