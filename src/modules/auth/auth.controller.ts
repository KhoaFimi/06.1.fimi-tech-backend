import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Put,
	Req,
	UseGuards
} from '@nestjs/common'
import {
	ApiBody,
	ApiHeader,
	ApiParam,
	ApiSecurity,
	ApiTags
} from '@nestjs/swagger'

import { SuccessCode } from '@/constraints/code.constraints'
import { ResponseBody } from '@/decorators/response-message.decorator'
import { VerifyPartnerGuard } from '@/guards/verify-partner.guard'
import { AuthService } from '@/modules/auth/auth.service'
import { SignInDto } from '@/modules/auth/dto/sign-in.dto'
import { SignUpDto } from '@/modules/auth/dto/sign-up.dto'
import { RefreshTokenGuard } from '@/modules/auth/guards/refresh-token.guard'
import { ExtendedRequest } from '@/types/api.type'

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	// #region: sign up
	@Post('/sign-up')
	@UseGuards(VerifyPartnerGuard)
	@ResponseBody({
		statusCode: SuccessCode.CREATED,
		message: 'Đăng ký thành công'
	})
	@ApiBody({
		type: SignUpDto,
		examples: {
			userRaw: {
				value: {
					fullname: 'Trần Đăng Khoa',
					email: 'khoa.trandang30620@gmail.com',
					phone: '0915527911',
					password: 'Wynrius479',
					tnc: true
				} as SignUpDto
			},
			userRef: {
				value: {
					fullname: 'Trần Đăng Khoa',
					email: 'khoa.trandang30620@gmail.com',
					phone: '0915527911',
					password: 'Wynrius479',
					ref: '6788bf86f192d3881f454e36',
					tnc: true
				} as SignUpDto
			}
		}
	})
	@ApiSecurity('api-key')
	@ApiSecurity('partner-code')
	async signUp(@Req() request: ExtendedRequest, @Body() body: SignUpDto) {
		const res = await this.authService.signUp(request.partnerCode, body)

		return res
	}
	// #endregion

	// #region: sign in
	@Post('/sign-in')
	@UseGuards(VerifyPartnerGuard)
	@ResponseBody({
		statusCode: SuccessCode.OK,
		message: 'Đăng nhập thành công'
	})
	@ApiBody({
		type: SignInDto,
		examples: {
			userRaw: {
				value: {
					email: 'khoa.trandang30620@gmail.com',
					password: 'Wynrius479'
				} as SignInDto
			}
		}
	})
	@ApiSecurity('api-key')
	@ApiSecurity('partner-code')
	async signIn(@Body() body: SignInDto) {
		const res = await this.authService.signIn(body)

		return res
	}
	// #endregion

	// #region: sign out
	@Put('/sign-out/:id')
	@UseGuards(VerifyPartnerGuard)
	@ResponseBody({
		statusCode: SuccessCode.OK,
		message: 'Đăng xuất thành công'
	})
	@ApiParam({
		name: 'id',
		required: true
	})
	@ApiSecurity('api-key')
	@ApiSecurity('partner-code')
	async signOut(@Param('id') id: string) {
		const res = await this.authService.signOut(id)

		return res
	}
	// #endregion

	// #region: refresh token
	@Get('/refresh-token')
	@UseGuards(VerifyPartnerGuard, RefreshTokenGuard)
	@ResponseBody({
		statusCode: SuccessCode.OK,
		message: 'Lấy token mới thành công'
	})
	@ApiHeader({
		name: 'X-REFRESH-TOKEN',
		required: true
	})
	@ApiSecurity('api-key')
	@ApiSecurity('partner-code')
	async refreshToken(@Req() requuest: ExtendedRequest) {
		const user = requuest.user

		const res = await this.authService.genTokenPair(user.id, user.roles)

		return res
	}
	// #endregion
}
