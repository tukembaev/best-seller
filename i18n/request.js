import {getRequestConfig} from 'next-intl/server'
import {headers, cookies} from 'next/headers'

export default getRequestConfig(async () => {
  const supportedLocales = ['en', 'ru', 'hi']
  const h = await headers()
  const c = await cookies()
  const cookieLocale = c.get('NEXT_LOCALE')?.value
  const headerLocale = h.get('X-NEXT-INTL-LOCALE') || h.get('accept-language')?.split(',')[0]?.split('-')[0]
  const resolvedLocale = [cookieLocale, headerLocale, 'en'].find(
    (l) => !!l && supportedLocales.includes(l)
  )

  const common = (await import(`../locales/${resolvedLocale}/common.json`)).default

  return {
    locale: resolvedLocale,
    messages: { common }
  }
})


