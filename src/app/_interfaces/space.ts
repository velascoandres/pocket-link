import { type z } from 'zod'

import { type StyleDto } from '@/dtos'

export interface Space {
    id: number
    name: string
    description: string | null
    style?: z.infer<typeof StyleDto>
}


export type Style = z.infer<typeof StyleDto>
