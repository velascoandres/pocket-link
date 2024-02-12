import { z } from 'zod'

export const SearchByIdDto = z.object({
  id: z.number().min(1)
})