import { type Space } from './space'

export interface Link {
	id: number
	name: string
	path: string
	originalLink: string
	totalInteractions: number
	isPublic: boolean
	isFavorite: boolean
	space?: Space
	createdAt: Date
	updatedAt: Date
} 