import { z } from 'zod'

export const DeleteSpaceLinkDto = z.object({
  spaceId: z.number(),
  linkId: z.number()
})
  