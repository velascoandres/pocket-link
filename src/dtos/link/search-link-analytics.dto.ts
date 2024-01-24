import { z } from 'zod'

export const SearchLinkAnalyticsDto = z.object({
  linkId: z.number(),
  startDate: z.date(),  
  endDate: z.date(),  
})