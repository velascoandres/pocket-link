
import { type z } from 'zod'

import { type PrismaClient } from '@prisma/client'

import { type SearchSpaceDto } from '@/dtos'

type Options = z.infer<typeof SearchSpaceDto> & { userId: string }

interface SpaceWhereQuery {
    createdById?: string
    OR?: Record<string, { contains: string }>[]
}

export const searchSpaceService = async (db: PrismaClient, options: Options) => {
  const { search, userId, perPage = 10, page = 1 } = options

  const query: SpaceWhereQuery = {
    createdById: userId
  }

  if (search) {
    query.OR = [{
      name: {
        contains: search
      },
    },
    {
      description: {
        contains: search
      },
    }]
  }


  const totalQuery = db.space.count({
    where: {
      ...query
    },
  })

  const dataQuery = db.space.findMany({
    where: {
      ...query
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      spaceLinks: {
        include: {
          link: {
            include: {
              linkInteractions: true
            }
          }
        }
      },
    },
    skip: perPage * (page - 1), 
    take: perPage,
  })

  const [data, total] = await Promise.all([dataQuery, totalQuery])

  
  const spaces = data.map((space) => ({
    id: space.id,
    name: space.name,
    description: space.description,
    style: space.style,
    createdAt: space.createdAt,
    updatedAt: space.updatedAt,
    totalLinks: space.spaceLinks.length ?? 0,
    totalInteractions: space.spaceLinks.reduce((counter, spaceLink) => counter + spaceLink.link.linkInteractions.length, 0)
  }))

  const totalPages = Math.ceil(total / perPage)
  const hasNextPage = page < totalPages

  return {
    data: spaces,
    total,
    hasNextPage,
    totalPages
  }
}