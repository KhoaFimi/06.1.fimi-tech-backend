export interface IAccessTokenPayload {
	sub: string
	roles: number
}

export interface IRefreshTokenPayload {
	sub: string
}
