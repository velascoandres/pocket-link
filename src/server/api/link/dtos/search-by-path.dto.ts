import {z} from 'zod'

export const searchByPathDto = z.object({
  path: z.string()  
})