import { type z } from 'zod'

import { type PrismaClient } from '@prisma/client'

import { type DeleteSpaceDto } from '@/dtos'

type Options = z.infer<typeof DeleteSpaceDto> & { id: number,  userId: string}

export const deleteSpaceService = async (db: PrismaClient, options: Options) => {
  const { id, userId } = options

  const currentSpace = await db.space.findFirst({ where: { id } })

  if (!currentSpace){
    throw new Error('Space not found')
  }  

  const isSameCreator = currentSpace.createdById === userId

  if (!isSameCreator){
    throw new Error('Not authorized')
  }

  return db.space.delete({
    where: {
      id,
    },
  })
}