import { z } from 'zod'

export const searchDto = z.object({
    search: z.string(),
    perPage: z.number().optional().default(10),
    page: z.number().optional().default(1),
})