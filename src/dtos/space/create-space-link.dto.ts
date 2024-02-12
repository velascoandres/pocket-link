import { z } from 'zod'


export const CreateSpaceLinkDto = z.object({
  spaceId: z.number(),
  linkId: z.number(),
})
