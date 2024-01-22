'use server'

import { redirect } from 'next/navigation'

import { searchLinkByPathService } from '@/server/api/link/services'
import { db } from '@/server/db'

export const redirectLinkByPath = async (path: string) => {
  const link = await searchLinkByPathService(db, { path })

  if (!link) {
    redirect('/not-found')
  }

  redirect(link.originalLink)
}
