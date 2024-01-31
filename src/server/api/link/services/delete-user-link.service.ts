import { type PrismaClient } from '@prisma/client'

import { deleteLinkService } from './delete-link.service'

interface Options {
    id: number
    createdById: string
}

export const deleteUserLinkService = async (prisma: PrismaClient, options: Options) => {
  const { id, createdById } = options

  const link = await prisma.link.findFirst({
    where: {
      id
    }
  })

  const isSameOwner = createdById === link?.createdById

  if (!isSameOwner){
    throw new Error('Not authorized')
  }


  return deleteLinkService(prisma, id)
}