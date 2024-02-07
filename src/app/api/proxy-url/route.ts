import { type NextRequest,NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  const query = req.nextUrl.searchParams
  const url = query.get('url')

  if(!url){
    return NextResponse.json({ error: 'url not found', data: null }, { status: 400 })
  }

  try{
    const response = await fetch(url)
    const html = await response.text()

    return NextResponse.json({
      html,
    })

  }catch (error){
    console.error('🚨 [ERROR] fetching html error', error)

    return NextResponse.json({ error: 'fetching html error', data: null }, { status: 500 })
  }

}