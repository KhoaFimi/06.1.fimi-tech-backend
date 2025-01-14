import { ErrorCode, SuccessCode } from '@constraints/code.constraints'
import { SetMetadata } from '@nestjs/common'

export interface IResponseBody {
	statusCode: SuccessCode | ErrorCode
	message: string
}

export const ResponseBodyKey = 'ResponseMessage'

export const ResponseBody = (body: IResponseBody) =>
	SetMetadata(ResponseBodyKey, body)
