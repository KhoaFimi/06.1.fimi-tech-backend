import {
	ArgumentMetadata,
	BadRequestException,
	Injectable,
	PipeTransform
} from '@nestjs/common'
import * as path from 'path'

import { ErrorCode } from '@/constraints/code.constraints'

@Injectable()
export class IdentifierCardImageFilter implements PipeTransform {
	private readonly allowedExtensions = ['.png', '.jpg', '.jpeg']

	async transform(
		value: { front?: Express.Multer.File[]; back?: Express.Multer.File[] },
		_metadata: ArgumentMetadata
	) {
		if (!value.front || !value.back) {
			throw new BadRequestException(`Vui lòng bổ sung đầy đủ hình ảnh`, {
				description: ErrorCode.MISSING_ERROR
			})
		}

		const frontExtname = path.extname(value.front[0].originalname)
		const backExtname = path.extname(value.back[0].originalname)

		const [verifyFront, verifyBack] = await Promise.all([
			this.allowedExtensions.includes(frontExtname),
			this.allowedExtensions.includes(backExtname)
		])

		if (!verifyFront || !verifyBack)
			throw new BadRequestException(`Hệ thông không hỗ trọ loại file này`, {
				description: ErrorCode.WRONG_CREDENTIALS_ERROR
			})

		return value
	}
}
