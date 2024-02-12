import { type z } from 'zod'

import { type PrismaClient } from '@prisma/client'

import { type SearchByIdDto } from '@/dtos'

type Options = z.infer<typeof SearchByIdDto> & {userId: string}


export const searchSpaceByIdService = (prisma: PrismaClient, options: Options) => {
  const { id, userId } = options

  return prisma.space.findFirst({
    where: {
      id,
      createdById: userId
    }
  })
}