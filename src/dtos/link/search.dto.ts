import { z } from 'zod'

export const SearchDto = z.object({
  search: z.string(),
  perPage: z.number().optional().default(10),
  spaceLinkId: z.number().optional(),
  page: z.number().optional().default(1),
})