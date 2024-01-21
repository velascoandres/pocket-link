'use server'

import { searchLinkByPathService } from '@/server/api/link/services'
import { db } from '@/server/db'
import { redirect } from 'next/navigation'

export const redirectLinkByPath = async (path: string) => {
	const link = await searchLinkByPathService(db, { path })

		if (!link) {
			redirect('/not-found')
		}

		redirect(link.originalLink)
}
