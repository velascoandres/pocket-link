import {z} from 'zod'

export const deleteLinkDto = z.object({
  id: z.number().min(1)  
})