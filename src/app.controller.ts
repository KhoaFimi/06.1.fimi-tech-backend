import { BadRequestException, Controller, Get } from '@nestjs/common'

import { ErrorCode } from '@/constraints/code.constraints'

@Controller()
export class AppController {
	@Get('/healthcheck')
	async healthCheck() {
		throw new BadRequestException('Test new fiklter', {
			description: ErrorCode.NOT_FOUND_ERROR,
			cause: {
				validation: 'True erro'
			}
		})

		return {
			message: 'OK'
		}
	}
}
