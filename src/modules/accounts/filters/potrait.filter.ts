import {
	ArgumentMetadata,
	BadRequestException,
	Injectable,
	PipeTransform
} from '@nestjs/common'
import * as path from 'path'

import { ErrorCode } from '@/constraints/code.constraints'

@Injectable()
export class PotraitFilter implements PipeTransform {
	private readonly allowedExtensions = ['.png', '.jpg', '.jpeg']

	async transform(value: Express.Multer.File, _metadata: ArgumentMetadata) {
		if (!value) {
			throw new BadRequestException(`Vui lòng bổ sung đầy đủ hình ảnh`, {
				description: ErrorCode.MISSING_ERROR
			})
		}

		const extname = path.extname(value.originalname)

		const isVerify = this.allowedExtensions.includes(extname)

		if (!isVerify)
			throw new BadRequestException(`Hệ thông không hỗ trọ loại file này`, {
				description: ErrorCode.WRONG_CREDENTIALS_ERROR
			})

		return value
	}
}
