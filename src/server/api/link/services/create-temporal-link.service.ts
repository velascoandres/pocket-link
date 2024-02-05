import { type PrismaClient } from '@prisma/client'

import { addDaysWrapped, generateUniqueString } from '@/helpers'
import CONSTANTS from '@/server/constants'

interface Options {
    name: string
    path?: string
    originalLink: string
}

export const createTemporalLinkService = async (prisma: PrismaClient, options: Options) => {
  const { name, path, originalLink } = options

  const dataWithoutPath = {
    name,
    originalLink,
    expiresAt: addDaysWrapped(new Date(), 3),
    isPublic: true
  }

  if (!path) {
    return prisma.link.create({
      data: {
        path: generateUniqueString({ size: CONSTANTS.DEFAULT_PATH_SIZE }),
        ...dataWithoutPath,
      }
    })
  }

  const existingLink = await prisma.link.findFirst({
    where: {
      path
    }
  })

  if (existingLink) {
    throw new Error('Duplicated link')
  }

  const temporalLink = await prisma.link.create({
    data: {
      path,
      ...dataWithoutPath,
    }
  })

  return temporalLink
}
