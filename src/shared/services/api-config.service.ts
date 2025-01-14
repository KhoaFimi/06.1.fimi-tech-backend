import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class ApiConfigService {
	constructor(private readonly configService: ConfigService) {}

	// #region: system config
	get nodeEnv(): string {
		return this.getString('NODE_ENV')
	}

	get isDevelopment(): boolean {
		return this.nodeEnv === 'development'
	}

	get isProduction(): boolean {
		return this.nodeEnv === 'production'
	}

	get isTest(): boolean {
		return this.nodeEnv === 'test'
	}

	get apiPrefix(): string {
		return this.getString('API_PREFIX')
	}

	get apiDocsPrefix(): string {
		return this.getString('API_DOCS_PREFIX')
	}

	get port(): number {
		return this.getNumber('PORT')
	}

	get host(): string {
		return this.getString('HOST')
	}

	get baseUrl(): string {
		const port = this.getNumber('PORT')
		const host = this.getString('HOST')
		const isProd = this.isProduction

		if (isProd) return this.getString('BASE_URL')

		return `http://${host}:${port}`
	}

	get apiUrl(): string {
		return `${this.baseUrl}/${this.apiPrefix}`
	}

	get apiDocsUrl(): string {
		const isProd = this.isProduction

		if (isProd) return 'Api doc not allowed to production'

		return `${this.baseUrl}/${this.apiDocsPrefix}`
	}
	// #endregion

	// #region: redis config
	get redisHost(): string {
		return this.getString('REDIS_HOST')
	}

	get redisPort(): number {
		return this.getNumber('REDIS_PORT')
	}
	// #endregion

	// #region: database config
	get databaseUrl(): string {
		return this.getString('DATABASE_URL')
	}

	get databaseName(): string {
		return this.getString('MONGO_INITDB_DATABASE')
	}
	// #endregion

	// #region: google config
	get googleClientId(): string {
		return this.getString('GOOGLE_CLIENT_ID')
	}

	get googleClientSecret(): string {
		return this.getString('GOOGLE_CLIENT_SECRET')
	}

	get googleRefreshToken(): string {
		return this.getString('GOOGLE_REFRESH_TOKEN')
	}

	get adminEmailAddress(): string {
		return this.getString('GOOGLE_REFRESH_TOKEN')
	}
	// #endregion

	// #region: jwt config
	get accessTokenExpires(): string {
		return this.getString('ACCESS_TOKEN_EXPIRES')
	}

	get refreshTokenExpires(): number {
		return this.getNumber('REFRESH_TOKEN_EXPIRES')
	}
	// #endregion

	// #region: token config
	get verificationTokenExpires(): number {
		return this.getNumber('VERIFICATION_TOKEN_EXPIRES')
	}

	get resetPasswordTokenExpires(): number {
		return this.getNumber('RESET_PASSWORD_TOKEN_EXPIRES')
	}
	// #endregion

	// #region: get method
	private getNumber(key: string): number {
		const value = this.get(key)

		try {
			return Number(value)
		} catch {
			throw new Error(`${key} environment variable is not a number`)
		}
	}

	private getBoolean(key: string): boolean {
		const value = this.get(key)

		try {
			return Boolean(JSON.parse(value))
		} catch {
			throw new Error(`${key} env var is not a boolean`)
		}
	}

	private getString(key: string): string {
		const value = this.get(key)

		return value.replaceAll(String.raw`\n`, '\n')
	}

	private get(key: string): string {
		const value = this.configService.get<string>(key)

		if (value == null) {
			throw new Error(`${key} environment variable does not set`)
		}

		return value
	}
	// #endregion
}
