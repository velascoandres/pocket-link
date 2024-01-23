'use server'

import { redirect } from 'next/navigation'

import { 
  createLinInteractionService, 
  searchLinkByPathService 
} from '@/server/api/link/services'
import { db } from '@/server/db'

export const redirectLinkByPath = async (path: string) => {
  const link = await searchLinkByPathService(db, { path })

  if (!link) {
    redirect('/not-found')
  }

  await createLinInteractionService(db, { linkId: link?.id })

  redirect(link.originalLink)
}
