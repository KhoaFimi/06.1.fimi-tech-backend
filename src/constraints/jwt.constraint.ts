import * as crypto from 'node:crypto'
import * as path from 'node:path'

import * as fs from 'fs'

interface ITokenKeyPairPaths {
	private: string
	public: string
}

interface ITokenKeyPair {
	privateKey: string
	publicKey: string
}

const SECURE_PATH = 'secure'

export const checkExistSercureFolder = () => {
	const checkPath = path.join(process.cwd(), SECURE_PATH)

	!fs.existsSync(checkPath) && fs.mkdir(checkPath, err => err)
}

const accessTokenKeyPairPaths = {
	private: path.join(process.cwd(), SECURE_PATH),
	public: path.join(process.cwd(), SECURE_PATH)
} satisfies ITokenKeyPairPaths

const refreshTokenKeyPairPaths = {
	private: path.join(process.cwd(), SECURE_PATH),
	public: path.join(process.cwd(), SECURE_PATH)
} satisfies ITokenKeyPairPaths

const generateKeyPair = (paths: ITokenKeyPairPaths): ITokenKeyPair => {
	checkExistSercureFolder()

	const privateKeyExisted = fs.existsSync(paths.private)
	const publicKeyExisted = fs.existsSync(paths.public)

	if (privateKeyExisted && publicKeyExisted) {
		return {
			privateKey: fs.readFileSync(paths.private, 'utf-8'),
			publicKey: fs.readFileSync(paths.public, 'utf-8')
		}
	}

	const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
		modulusLength: 2048,
		publicKeyEncoding: {
			type: 'spki',
			format: 'pem'
		},
		privateKeyEncoding: {
			type: 'pkcs8',
			format: 'pem'
		}
	})

	fs.writeFileSync(paths.private, privateKey)

	return {
		privateKey,
		publicKey
	}
}

export const {
	privateKey: accessTokenPrivateKey,
	publicKey: accessTokenPublicKey
} = generateKeyPair(accessTokenKeyPairPaths)

export const {
	privateKey: refreshTokenPrivateKey,
	publicKey: refreshTokenPublicKey
} = generateKeyPair(refreshTokenKeyPairPaths)
