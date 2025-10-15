'use client'

import { Globe } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' }
]

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const [locale, setLocale] = useState('en')

  useEffect(() => {
    const cookieMatch = document.cookie.match(/(?:^|; )NEXT_LOCALE=([^;]+)/)
    if (cookieMatch?.[1]) setLocale(decodeURIComponent(cookieMatch[1]))
  }, [])

  const currentLanguage = useMemo(() => languages.find(l => l.code === locale) || languages[0], [locale])

  const handleLanguageChange = async (code) => {
    document.cookie = `NEXT_LOCALE=${code}; path=/; max-age=${60 * 60 * 24 * 365}`
    setIsOpen(false)
    setLocale(code)
    window.location.reload()
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-slate-800 transition-colors"
      >
        <Globe size={16} />
        <span className='pt-[2px]'>{currentLanguage.flag}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 min-w-[160px]">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 transition-colors ${
                language.code === locale ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
              }`}
            >
              <span>{language.flag}</span>
              <span>{language.name}</span>
            </button>
          ))}
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}
