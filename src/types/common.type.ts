export type ResponseType<T = null> = {
	statusCode: string
	message: string | string[]
	error?: any
	data?: T
}

export type FindAllParams = {
	page: number
	limit: number
}
