import { type PrismaClient } from '@prisma/client'

export const removeExpireLinkService = async (db: PrismaClient) => {
  const data = await db.link.deleteMany({
    where: {
      expiresAt: {
        not: null,
        lte: new Date()
      },
    },
  })

  return {
    removed: data.count
  }
}