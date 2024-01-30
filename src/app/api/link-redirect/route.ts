import { type NextRequest,NextResponse } from 'next/server'

import { TRPCError } from '@trpc/server'

import { createLinkInteractionService } from '@/server/api/link/services'
import { createCaller } from '@/server/api/root'
import { createTRPCContext } from '@/server/api/trpc'
import { db } from '@/server/db'

export const POST = async (req: NextRequest) => {
  const body = await req.json() as { path: string }

  const ctx = await createTRPCContext({ 
    headers: req.headers,
  })

  const caller = createCaller(ctx)
  
  try {
    const  link = await caller.link.searchLinkByPath({
      path: body.path
    })

    if (!link){
      return NextResponse.json({ error: 'Link not found', data: null }, { status: 404 })
    }

    await createLinkInteractionService(db, { linkId: link.id })

    return NextResponse.json({
      data: link
    })
  } catch (cause) {
    if (cause instanceof TRPCError) {
      return NextResponse.json({ error: cause, data: null }, { status: 400 })
    }

    return NextResponse.json({ error: cause, data: null }, { status: 500 })
  }
}