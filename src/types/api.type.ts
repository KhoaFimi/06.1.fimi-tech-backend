import { Request } from 'express'

import { User } from '@/modules/users/entities/user.entity'

export interface ExtendedRequest extends Request {
	user: User
	partnerCode: string
}
