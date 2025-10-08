import {NextRequest, NextResponse} from 'next/server'

const locales = ['en', 'ru', 'hi']

export default function middleware(request: NextRequest) {
  const lang = request.nextUrl.searchParams.get('lang')
  const response = NextResponse.next()
  if (lang && locales.includes(lang)) {
    response.cookies.set('NEXT_LOCALE', lang, {path: '/', maxAge: 60 * 60 * 24 * 365})
  }
  return response
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)']
}


