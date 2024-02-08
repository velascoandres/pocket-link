import { z } from 'zod'

import { CreateSpaceDto } from './create-space.dto'

export const UpdateSpaceDto = z.object({
  id: z.number(),
}).merge(CreateSpaceDto)
  