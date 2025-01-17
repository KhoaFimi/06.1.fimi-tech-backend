import { ROLES } from '@prisma/client'

export interface IAccessTokenPayload {
	sub: string
	roles: ROLES
}

export interface IRefreshTokenPayload {
	sub: string
}
