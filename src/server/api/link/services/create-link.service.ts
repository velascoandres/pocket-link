import { type PrismaClient } from '@prisma/client'

import { generateUniqueString } from '@/helpers'

import { DEFAULT_PATH_SIZE } from '../../../constants'

interface Options {
    name: string
    path?: string
    originalLink: string
    createdById: string
}

export const createLinkService = async (prisma: PrismaClient, options: Options) => {
  const { name, path, createdById, originalLink } = options

  if (!path) {
    return prisma.link.create({
      data: {
        name,
        path: generateUniqueString({ size: DEFAULT_PATH_SIZE }),
        createdBy: { connect: { id: createdById } },
        originalLink,
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

  return prisma.link.create({
    data: {
      name,
      path,
      createdBy: { connect: { id: createdById } },
      originalLink,
    }
  })
}
