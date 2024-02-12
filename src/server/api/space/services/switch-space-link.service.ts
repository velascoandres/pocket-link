import { type z } from 'zod'

import { type PrismaClient } from '@prisma/client'
import { TRPCError } from '@trpc/server'

import { type UpdateSpaceLinkDto } from '@/dtos'


type Options = z.infer<typeof UpdateSpaceLinkDto> & { userId: string}

export const switchSpaceLinkService = async (prisma: PrismaClient, options: Options) => {
  const { userId, spaceId, linkId, id: spaceLinkId } = options

  const space = await prisma.space.findFirst({
    where: {
      id: spaceId
    }
  })
    
  if (!space){
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Space not found'
    })
  }
    
  const isOwner = space.createdById === userId
    
  if (!isOwner){
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'Space is not related'
    })
  }

  const currentSpaceLink = await prisma.spaceLink.findFirst({
    where: {
      id: spaceLinkId,
    }
  })


  if (!currentSpaceLink){
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Space link not found'
    })
  }

  const isSameLink = currentSpaceLink.linkId === linkId

  if (!isSameLink){
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'Link is not related'
    })
  }

  await prisma.spaceLink.delete({
    where: {
      id: spaceLinkId
    }
  })

  return prisma.spaceLink.create({
    data: {
      spaceId,
      linkId
    }
  })
}