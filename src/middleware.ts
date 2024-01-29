import { type NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  try {
    const [,,...allPath] = req.nextUrl.pathname.split('/')
    const path = allPath.join('/')

    const url = `${req.nextUrl.origin}/api/link-redirect`

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ path })
    })

    const { data: link } = await response.json() as {data: {originalLink: string}}

    if (!link) {
      return NextResponse.redirect(new URL('/not-found', req.url))
    }

    return NextResponse.redirect(new URL(link.originalLink))

  } catch (error) {
    console.error('🚀 Error: ', {
      message: 'Error on redirecting',
      data: req.nextUrl.pathname,
      error 
    })

    return NextResponse.redirect(new URL('/server-error', req.url))
  }

}

export const config = {
  matcher: '/p/:path*',
}