import { type PrismaClient } from '@prisma/client'

interface Options {
	search?: string
	perPage?: number
	page?: number
	createdById: string
}


interface LinkWhereQuery {
	createdById: string
	OR?: Record<string, { contains: string }>[]
}

export const searchUserLinksService = async (prisma: PrismaClient, options: Options) => {
	const { search, perPage = 10, page = 1, createdById } = options

	const query: LinkWhereQuery = {
		createdById
	}

	if (search) {
		query.OR = [
			{
				name: {
					contains: search
				}
			},
			{
				path: {
					contains: search
				}
			},
			{
				originalLink: {
					contains: search
				}
			}
		]
	}

	const totalQuery = prisma.link.count({
		where: {
			...query
		},
	})

	const dataQuery = prisma.link.findMany({
		where: {
			...query
		},
		skip: perPage * (page - 1),
		take: perPage,
	})

	const [total, data] = await Promise.all([totalQuery, dataQuery])

	const totalPages = Math.ceil(total / perPage)
	const hasNextPage = page < totalPages

	return {
		hasNextPage,
		totalPages,
		total,
		page,
		data
	}
}