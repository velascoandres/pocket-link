import { z } from 'zod'

export const SearchSpaceDto = z.object({
  search: z.string(),
  userId: z.string().min(1),
  perPage: z.number().optional(),
  page: z.number()
})