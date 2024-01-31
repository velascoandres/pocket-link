import { type PrismaClient } from '@prisma/client'

export const deleteLinkService = (prisma: PrismaClient, id: number) => {
  return prisma.link.delete({
    where: {
      id
    }
  })
}