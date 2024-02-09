import { z } from 'zod'

export const SearchSpaceDto = z.object({
  search: z.string(),
  perPage: z.number().optional(),
  page: z.number()
})