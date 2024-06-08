import { type z } from 'zod'

import { type PrismaClient } from '@prisma/client'

import { type CreateLinkDto } from '@/dtos'
import { generateUniqueString } from '@/helpers'
import CONSTANTS from '@/server/constants'

type Options = z.infer<typeof CreateLinkDto> & {
    createdById: string
}

export const createLinkService = async (prisma: PrismaClient, options: Options) => {
  const { name, path = '', createdById, originalLink, isFavorite } = options

  const dataToCreate = {
    name,
    path: '',
    createdBy: { connect: { id: createdById } },
    originalLink,
    isFavorite
  }

  if (!path) {
    dataToCreate.path = generateUniqueString({ size: CONSTANTS.DEFAULT_PATH_SIZE })
  } else {
    dataToCreate.path = path
  }

  const existingLink = await prisma.link.findFirst({
    where: {
      path
    }
  })

  if (existingLink) {
    throw new Error('Duplicated link')
  }

  return prisma.link.create({
    data: {
      ...dataToCreate,
    }
  })
}
