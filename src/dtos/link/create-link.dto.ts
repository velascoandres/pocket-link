import { z } from 'zod'


export const CreateLinkDto = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  path: z.string().optional(),
  originalLink: z.string()
  .min(10, {
    message: 'Path must be at least 10 characters.',
  })
  .url('Path should be a valid url format'),
  isFavorite: z.boolean().default(false)
})
