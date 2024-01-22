import { z } from 'zod'

import { CreateLinkDto } from './create-link.dto'


export const UpdateLinkDto = z.object({
  id: z.number(),
}).merge(CreateLinkDto)
