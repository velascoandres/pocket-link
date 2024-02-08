import { z } from 'zod'

export const DeleteSpaceLinkDto = z.object({
  id: z.number(),
})
  