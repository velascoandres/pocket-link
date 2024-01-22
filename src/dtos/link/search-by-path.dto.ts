import { z } from 'zod'

export const SearchByPathDto = z.object({
  path: z.string()  
})