import {z} from 'zod'

export const DeleteLinkDto = z.object({
  id: z.number().min(1)  
})