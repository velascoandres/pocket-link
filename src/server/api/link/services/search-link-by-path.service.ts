import { type PrismaClient } from '@prisma/client'

interface Options {
	path: string
}

export const searchLinkByPathService = (prisma: PrismaClient, options: Options) => {
	const { path } = options

	return prisma.link.findUnique({
		where: {
			path
		}
	})
}