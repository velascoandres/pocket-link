import { type z } from 'zod'

import { type PrismaClient } from '@prisma/client'

import { type CreateSpaceDto } from '@/dtos'

type Options = z.infer<typeof CreateSpaceDto> & {userId: string}

export const createSpaceService = (db: PrismaClient, options: Options) => {
  const { name, userId, description, style } = options

  return db.space.create({
    data: {
      createdBy: { connect: { id: userId } },
      name,
      description,
      style,
    }
  })
}