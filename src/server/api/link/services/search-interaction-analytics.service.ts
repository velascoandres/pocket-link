import { type PrismaClient } from '@prisma/client'

interface Options {
  linkId: number

  startDate: Date,
  endDate: Date,
}


export const searchInteractionAnalyticsService = async (
  prisma: PrismaClient, options: Options
) => {
  const { linkId, startDate, endDate } = options

  const interactions = await prisma.linkInteraction.findMany({
    where: {
      linkId,
      updatedAt: {
        gte: startDate,
        lte: endDate,
      }
    },
  })

  const dateMap = new Map<string, { interactions: number }>()

  for (const interaction of interactions) {
    const day = interaction.updatedAt.getDate()
    const month = interaction.updatedAt.getMonth() + 1
    const year = interaction.updatedAt.getFullYear()

    const date = `${year}/${month}/${day}`

    const currentDate = dateMap.get(date)

    if (currentDate) {
      dateMap.set(date, { interactions: currentDate.interactions += 1 })
    } else {
      dateMap.set(date, { interactions:  1 })
    }
  }
  const mapObject = Object.fromEntries(dateMap)


  const response = Object.entries(mapObject).map(([date, data]) => ({
    date,
    ...data
  }))

  return response
}
