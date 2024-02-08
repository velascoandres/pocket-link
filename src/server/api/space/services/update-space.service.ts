import { type z } from 'zod'

import { type PrismaClient } from '@prisma/client'

import { type UpdateSpaceDto } from '@/dtos'

type Options = z.infer<typeof UpdateSpaceDto> & { id: number,  userId: string}

export const updateSpaceService = async (db: PrismaClient, options: Options) => {
  const { id, name, userId, description, style } = options

  const currentSpace = await db.space.findFirst({ where: { id } })

  if (!currentSpace){
    throw new Error('Space not found')
  }  

  const isSameCreator = currentSpace.createdById === userId

  if (!isSameCreator){
    throw new Error('Not authorized')
  }

  return db.space.update({
    where: {
      id,
    },
    data: {
      name,
      description,
      style,
    }
  })
}