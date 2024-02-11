
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
    skip: perPage * (page - 1), 
    take: perPage,
  })

  const [data, total] = await Promise.all([dataQuery, totalQuery]) 

  const totalPages = Math.ceil(total / perPage)
  const hasNextPage = page < totalPages

  return {
    data,
    total,
    hasNextPage,
    totalPages
  }
}