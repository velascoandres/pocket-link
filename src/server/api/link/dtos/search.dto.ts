import { z } from 'zod'

export const searchDto = z.object({
    name: z.string()
})