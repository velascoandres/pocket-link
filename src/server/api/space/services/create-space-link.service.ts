import { type z } from 'zod'

import { type PrismaClient } from '@prisma/client'
import { TRPCError } from '@trpc/server'

import { type CreateSpaceLinkDto } from '@/dtos'


type Options = z.infer<typeof CreateSpaceLinkDto> & {userId: string}

export const createSpaceLinkService = async (prisma: PrismaClient, options: Options) => {
  const { userId, spaceId, linkId } = options

  const space = await prisma.space.findFirst({
    where: {
      id: spaceId
    }
  })
    
  if (!space){
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Space was not found'
    })
  }
    
  const isOwner = space.createdById === userId
    
  if (!isOwner){
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'Space is not related'
    })
  }

  const currentLink = await prisma.link.findFirst({
    where: {
      id: linkId
    }
  })

  if (!currentLink){
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Link was not found'
    })
  }

  const isRelatedLink = currentLink.createdById === userId

  if (!isRelatedLink){
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'Link is not related'
    })
  }

  const existingSpaceLink = await prisma.spaceLink.findFirst({
    where: {
      linkId
    }
  })

  if (existingSpaceLink){
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Link is already attached to a space'
    })
  }

  return prisma.spaceLink.create({
    data: {
      spaceId,
      linkId
    }
  })
}