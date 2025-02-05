const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const main = async () => {
	await prisma.category.createMany({
		data: [
			{
				name: 'Thẻ tín dụng'
			},
			{
				name: 'Tài khoản thanh toán'
			},
			{
				name: 'Vay tín chấp'
			}
		]
	})
	// console.log({ seedCategory })
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
