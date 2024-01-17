import { type PrismaClient } from '@prisma/client'

interface Options {
    name?: string
    createdById: string
}

interface LinkWhereQuery {
    createdById: string
    name?: {
        contains: string
    }
}

export const searchUserLinksService = (prisma: PrismaClient, options: Options) => {
    const { name, createdById } = options

    const query: LinkWhereQuery = {
        createdById
    }

    if (name){
        query.name = {
            contains: name
        }
    }

    return prisma.link.findMany({
        where: {
            ...query
        }
    })
}