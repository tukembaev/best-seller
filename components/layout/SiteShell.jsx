'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Banner from '@/components/home/Banner'

const SHOW_BANNER = false

export default function SiteShell({ children }) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/login'

  return (
    <>
      {!isLoginPage && <Navbar />}
      {!isLoginPage && SHOW_BANNER && <Banner />}
      {children}
      {!isLoginPage && <Footer />}
    </>
  )
}


