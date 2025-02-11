const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const main = async () => {
	await prisma.partner.create({
		data: {
			code: 'FIMI',
			prize: {
				origin: 0.95
			},
			name: 'Công ty TNHH Công Nghệ FIMI',
			assest: {
				logo: {
					key: 'logo/logo_icr2ed',
					url: 'https://res.cloudinary.com/dsmg2i2rl/image/upload/v1739264651/logo_icr2ed.png'
				},
				priamaryColor: '#800101',
				secondaryColor: '#E9CFC3'
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
