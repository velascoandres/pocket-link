import { z } from 'zod'

import { CreateSpaceLinkDto } from './create-space-link.dto'


export const UpdateSpaceLinkDto = z.object({
  id: z.number(),
}).merge(CreateSpaceLinkDto)
  