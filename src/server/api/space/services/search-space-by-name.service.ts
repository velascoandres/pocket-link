import { type z } from 'zod'

import { type PrismaClient } from '@prisma/client'

import { type SearchSpaceByNameDto } from '@/dtos'

type Options = z.infer<typeof SearchSpaceByNameDto> & {userId: string}


export const searchSpaceByNameService = (prisma: PrismaClient, options: Options) => {
  const { name, userId } = options

  return prisma.space.findFirst({
    where: {
      name,
      createdById: userId
    }
  })
}