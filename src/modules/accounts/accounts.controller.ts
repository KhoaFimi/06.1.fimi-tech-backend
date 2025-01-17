import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { ApiBody, ApiParam, ApiSecurity, ApiTags } from '@nestjs/swagger'

import { SuccessCode } from '@/constraints/code.constraints'
import { ResponseBody } from '@/decorators/response-message.decorator'
import { VerifyPartnerGuard } from '@/guards/verify-partner.guard'
import { AccountsService } from '@/modules/accounts/accounts.service'
import { ForgotPasswordDto } from '@/modules/accounts/dtos/forgot-password.dto'
import { NewVerificationDto } from '@/modules/accounts/dtos/new-verification.dto'
import { ResetPasswordDto } from '@/modules/accounts/dtos/reset-password.dto'

@Controller('accounts')
@ApiTags('Account')
export class AccountsController {
	constructor(private readonly accountsService: AccountsService) {}

	// #region: new verification
	@Post('new-verification')
	@UseGuards(VerifyPartnerGuard)
	@ResponseBody({
		statusCode: SuccessCode.OK,
		message: 'Xác thực thành công'
	})
	@ApiSecurity('api-key')
	@ApiSecurity('partner-code')
	async newVerification(@Body() body: NewVerificationDto) {
		await this.accountsService.newVerification(body)
	}
	// #endregion

	// #region: get new otp
	@Get('/new-otp/:key')
	@UseGuards(VerifyPartnerGuard)
	@ResponseBody({
		statusCode: SuccessCode.OK,
		message: 'Lấy OTP mới thành công'
	})
	@ApiParam({
		name: 'key',
		required: true
	})
	@ApiSecurity('api-key')
	@ApiSecurity('partner-code')
	async newOtp(@Param('key') verificationKey: string) {
		const res = await this.accountsService.getNewOtp(verificationKey)

		return res
	}
	// #endregion

	// #region: forgot password
	@Post('/forgot-password')
	@UseGuards(VerifyPartnerGuard)
	@ResponseBody({
		statusCode: SuccessCode.OK,
		message: 'Yêu cầu lấy lại mật khẩu thành công'
	})
	@ApiBody({
		type: ForgotPasswordDto
	})
	@ApiSecurity('api-key')
	@ApiSecurity('partner-code')
	async forgotPassword(@Body() body: ForgotPasswordDto) {
		const res = await this.accountsService.forgotPassword(body)

		return res
	}
	// #endregion

	// #region: reset password
	@Post('/reset-password')
	@UseGuards(VerifyPartnerGuard)
	@ResponseBody({
		statusCode: SuccessCode.OK,
		message: 'Tạo mật khẩu mới thành công'
	})
	@ApiBody({
		type: ResetPasswordDto
	})
	@ApiSecurity('api-key')
	@ApiSecurity('partner-code')
	async resetPassword(@Body() body: ResetPasswordDto) {
		const res = await this.accountsService.resetPassword(body)

		return res
	}
	// #endregion
}
