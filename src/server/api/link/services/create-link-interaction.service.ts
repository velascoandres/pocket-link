import { type PrismaClient } from '@prisma/client'

interface Options {
    linkId: number
}

export const createLinInteractionService = async (prisma: PrismaClient, options: Options) => {
  const { linkId } = options

  return prisma.linkInteraction.create({
    data: {
      link: { connect: { id: linkId } },
    }
  })
}
