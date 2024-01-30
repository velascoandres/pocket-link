import { z } from 'zod'

export const CreateLinkInteractionDto = z.object({
  linkId: z.number()
})