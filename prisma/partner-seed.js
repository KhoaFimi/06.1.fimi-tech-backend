const { PrismaClient } = require('@prisma/client')
const argon2 = require('argon2')

const prisma = new PrismaClient()

const main = async () => {
	await prisma.partner.create({
		data: {
			code: 'FIMI',
			apiKey: await argon2.hash('b8a66f7d-381e-47f8-afea-83c8b0a1fd3b'),
			prize: {
				origin: 0.95
			}
		}
	})
}

main()
	.then(async () => {
		await prisma.$disconnect
	})
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect
		process.exit(1)
	})
