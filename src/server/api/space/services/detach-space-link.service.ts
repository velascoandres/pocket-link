import { type z } from 'zod'

import { type PrismaClient } from '@prisma/client'
import { TRPCError } from '@trpc/server'

import { type DeleteSpaceLinkDto } from '@/dtos'


type Options = z.infer<typeof DeleteSpaceLinkDto> & { userId: string}

export const detachSpaceLinkService = async (prisma: PrismaClient, options: Options) => {
  const { userId, id: spaceLinkId } = options

  const currentSpaceLink = await prisma.spaceLink.findFirst({
    where: {
      id: spaceLinkId,
    },
    include: {
      link: true,
    }
  })


  if (!currentSpaceLink){
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Space link not found'
    })
  }

  const isRelated = currentSpaceLink.link.createdById === userId

  if (!isRelated){
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'Space link is not related to user'
    })
  }

  await prisma.spaceLink.delete({
    where: {
      id: spaceLinkId
    }
  })

  return true
}