import { type z } from 'zod'

import { type PrismaClient } from '@prisma/client'

import { type SearchDto } from '@/dtos'

type Options = z.infer<typeof SearchDto> & { createdById: string, isPublic?: boolean }

interface LinkWhereQuery {
  isPublic: boolean
	createdById?: string
  spaceLinkId?: number
	OR?: Record<string, { contains: string }>[]
}

export const searchLinksService = async (prisma: PrismaClient, options: Options) => {
  const { search, createdById, spaceLinkId, perPage = 10, page = 1, isPublic = false } = options

  const query: LinkWhereQuery = {
    isPublic,
  }

  if (createdById){
    query.createdById = createdById
  }

  if (spaceLinkId){
    query.spaceLinkId = spaceLinkId
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
    include: {
      linkInteractions: {
        select: {
          id: true,
        }
      }
    },
    where: {
      ...query
    },
    orderBy: {
      updatedAt: 'desc',
    },
    skip: perPage * (page - 1), 
    take: perPage,
  })

  const [total, linksData] = await Promise.all([totalQuery, dataQuery])

  const data = linksData.map((link) => ({
    id: link.id,
    name: link.name,
    originalLink: link.originalLink,
    path: link.path,
    totalInteractions: link.linkInteractions.length,
    isPublic: link.isPublic,
    createdAt: link.createdAt,
    updatedAt: link.updatedAt,
    expiresAt: link.expiresAt,
  }))

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