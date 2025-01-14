export type ResponseType<T = null> = {
	statusCode: string
	message: string
	error?: any
	data?: T
}
