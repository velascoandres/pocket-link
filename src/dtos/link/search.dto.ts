import { z } from 'zod'

export const SearchDto = z.object({
  search: z.string(),
  perPage: z.number().optional().default(10),
  spaceId: z.number().nullable().optional(),
  page: z.number().optional().default(1),
})

export const SimpleTextSearchDto = z.object({
  search: z.string(),
})