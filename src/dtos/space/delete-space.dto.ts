import { z } from 'zod'

export const DeleteSpaceDto = z.object({
  id: z.number()
})