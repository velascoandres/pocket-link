import { z } from 'zod'


export const createLinkDto = z.object({
    name: z.string().min(1),
    path: z.string().optional(),
    originalLink: z.string().min(8),
})
