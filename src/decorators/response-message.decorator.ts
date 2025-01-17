import { SetMetadata } from '@nestjs/common'

import { ErrorCode, SuccessCode } from '@/constraints/code.constraints'

export interface IResponseBody {
	statusCode: SuccessCode | ErrorCode
	message: string
}

export const ResponseBodyKey = 'ResponseMessage'

export const ResponseBody = (body: IResponseBody) =>
	SetMetadata(ResponseBodyKey, body)
