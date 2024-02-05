import { NextResponse } from 'next/server'

import { TRPCError } from '@trpc/server'

import { removeExpireLinkService } from '@/server/api/link/services'
import { db } from '@/server/db'

export const GET = async () => {
  try {
    const { removed } = await removeExpireLinkService(db)
    
    return NextResponse.json({
      data: {
        removed
      },
    })
  } catch (cause) {
    if (cause instanceof TRPCError) {
      return NextResponse.json({ error: cause, data: null }, { status: 400 })
    }
    
    return NextResponse.json({ error: cause, data: null }, { status: 500 })
  }
}