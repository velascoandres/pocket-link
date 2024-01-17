import { z } from 'zod'


export const updateLinkDto = z.object({
    id: z.number(),
    name: z.string().min(1),
    path: z.string(),
    originalLink: z.string().min(8),
})
