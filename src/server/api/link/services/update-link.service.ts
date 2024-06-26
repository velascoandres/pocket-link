import { type PrismaClient } from '@prisma/client'

import { generateUniqueString } from '@/helpers'
import CONSTANTS from '@/server/constants'

interface Options {
	id: number
	name: string
	path?: string
	originalLink: string
	createdById: string
  isFavorite: boolean
}

export const updateLinkService = async (prisma: PrismaClient, options: Options) => {
  const { id, name, path, createdById, originalLink, isFavorite } = options

  if (!path) {
    return prisma.link.update({
      where: {
        id,
      },
      data: {
        name,
        path: generateUniqueString({ size: CONSTANTS.DEFAULT_PATH_SIZE }),
        isFavorite,
        createdBy: { connect: { id: createdById } },
        originalLink,
      }
    })
  }

  const existingLink = await prisma.link.findFirst({
    where: {
      path,
      createdById: {
        not: {
          equals: createdById
        }
      }
    }
  })

  if (existingLink) {
    throw new Error('Duplicated link')
  }

  return prisma.link.update({
    where: {
      id,
    },
    data: {
      name,
      path,
      isFavorite,
      createdBy: { connect: { id: createdById } },
      originalLink,
    }
  })
}
