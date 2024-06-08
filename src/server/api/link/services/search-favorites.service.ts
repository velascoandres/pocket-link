import { type z } from 'zod'

import { type PrismaClient } from '@prisma/client'

import { type SimpleTextSearchDto } from '@/dtos'

type Options = z.infer<typeof SimpleTextSearchDto> & { createdById?: string }

interface LinkWhereQuery {
    isFavorite: boolean
	createdById?: string
	OR?: Record<string, { contains: string }>[]
}

export const searchFavoritesService = async (prisma: PrismaClient, options: Options) => {
  const { search, createdById } = options

  const query: LinkWhereQuery = {
    isFavorite: true,
  }

  if (createdById){
    query.createdById = createdById
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
      ...query,
    },
  })

  const dataQuery = prisma.link.findMany({
    include: {
      linkInteractions: {
        select: {
          id: true,
        }
      },
      spaceLink: {
        include: {
          space: true
        }
      }
    },
    where: {
      ...query
    },
    orderBy: {
      updatedAt: 'desc',
    },
  })

  const [total, linksData] = await Promise.all([totalQuery, dataQuery])

  const data = linksData.map((link) => ({
    id: link.id,
    name: link.name,
    originalLink: link.originalLink,
    path: link.path,
    isFavorite: link.isFavorite,
    totalInteractions: link.linkInteractions.length,
    isPublic: link.isPublic,
    space: link.spaceLink?.space,
    createdAt: link.createdAt,
    updatedAt: link.updatedAt,
    expiresAt: link.expiresAt,
  }))

  return {
    total,
    data
  }
}