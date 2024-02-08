import { z } from 'zod'

import { StyleDto } from './style.dto'


export const CreateSpaceDto = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  description: z.string().optional(),
  style: StyleDto.optional()
})
