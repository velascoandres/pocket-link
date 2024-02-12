import { z } from 'zod'

export const SearchSpaceByNameDto = z.object({
  name: z.string().min(1)
})