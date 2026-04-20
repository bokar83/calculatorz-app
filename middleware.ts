import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  if (request.nextUrl.pathname === '/') {
    response.headers.set('Cache-Control', 'no-store, must-revalidate')
    response.headers.set('CDN-Cache-Control', 'no-store')
    response.headers.set('Hostinger-Cache-Control', 'no-store')
  }

  return response
}

export const config = {
  matcher: ['/'],
}
