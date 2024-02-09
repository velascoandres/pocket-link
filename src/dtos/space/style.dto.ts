import { z } from 'zod'

export const StyleDto = z.object({
  background: z.object({
    type: z.enum(['color', 'gradient']),
    value: z.string().min(1)
  }),
  textColor: z.string().optional(),
})