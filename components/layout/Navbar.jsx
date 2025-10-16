'use client'
import { Search, ShoppingCart, ChevronDown, LogOut, User, ShoppingBasket, Database, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";
import Price from "@/components/shared/Price";
import Image from "next/image";
import { loginSuccess, logout } from "@/lib/features/auth/authSlice";
import { logoutUser } from "@/app/actions/authActions";
import {useTranslations} from 'next-intl'

const Navbar = () => {
    const router = useRouter();
    const dispatch = useDispatch()
    const [search, setSearch] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [open, setOpen] = useState(false)
    const [user, setUser] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const cartCount = useSelector(state => state.cart.total)

    const t = useTranslations('common')

    const handleSearch = (e) => {
        e.preventDefault()
        router.push(`/shop?search=${search}`)
    }

    const handleLogout = async () => {
        try {
            await logoutUser()
            localStorage.removeItem('authUser')
            dispatch(logout())
            setUser(null)
            setDropdownOpen(false)
            router.push('/')
        } catch (error) {
            console.error('Logout error:', error)
        }
    }

    useEffect(() => {
        const storedUser = localStorage.getItem('authUser')
        if (storedUser) {
            let parsedUserInfo = JSON.parse(storedUser)
            setUser(parsedUserInfo)
            dispatch(loginSuccess(parsedUserInfo))
        }
        setIsLoaded(true)
    }, [])

    useEffect(() => {
        let ignore = false
        const controller = new AbortController()
        async function fetchSuggestions() {
            if (!search || search.length < 2) {
                setSuggestions([])
                return
            }
            try {
                const res = await fetch(`/api/products?q=${encodeURIComponent(search)}&limit=6`, { signal: controller.signal })
                const data = await res.json()
                if (!ignore) {
                    setSuggestions(data.products || [])
                    setOpen(true)
                }
            } catch { }
        }
        fetchSuggestions()
        return () => { ignore = true; controller.abort() }
    }, [search])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownOpen && !event.target.closest('.dropdown-container')) {
                setDropdownOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [dropdownOpen])

    return (
        <nav className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-700 shadow-lg">
            <div className="container-custom">
                <div className="flex items-center justify-between py-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-3 group">
                        <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 gold-glow">
                                <span className="text-black font-bold text-xl">T</span>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-3xl font-bold text-white tracking-wider">TREWATCH</span>
                            <span className="text-xs text-yellow-500 -mt-1 font-medium tracking-widest">PREMIUM TIMEPIECES</span>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center space-x-8">
                        <div className="flex items-center space-x-8">
                            <Link href="/" className="text-white hover:text-yellow-500 font-medium transition-colors duration-200 tracking-wide">
                                {t('nav.home')}
                            </Link>
                            <Link href="/shop" className="text-white hover:text-yellow-500 font-medium transition-colors duration-200 tracking-wide">
                                WATCHES
                            </Link>
                            <Link href="/about" className="text-white hover:text-yellow-500 font-medium transition-colors duration-200 tracking-wide">
                                OUR STORY
                            </Link>
                            <Link href="/contact" className="text-white hover:text-yellow-500 font-medium transition-colors duration-200 tracking-wide">
                                ACCESSORIES
                            </Link>
                        </div>

                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="relative">
                            <div className="flex items-center bg-gray-800 rounded-lg px-4 py-2.5 w-80 border border-gray-600 focus-within:border-yellow-500 focus-within:ring-2 focus-within:ring-yellow-500/20 transition-all duration-300">
                                <Search size={18} className="text-gray-400 mr-3" />
                                <input 
                                    className="flex-1 bg-transparent outline-none text-white placeholder-gray-400" 
                                    type="text" 
                                    placeholder="Search watches..." 
                                    value={search} 
                                    onChange={(e) => setSearch(e.target.value)} 
                                    onFocus={() => setOpen(true)} 
                                />
                            </div>

                            {/* Search Suggestions */}
                            {open && suggestions.length > 0 && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-600 rounded-lg shadow-xl z-50 overflow-hidden">
                                    {suggestions.map(item => (
                                        <button
                                            key={item.id}
                                            type="button"
                                            onClick={() => { setOpen(false); setSearch(''); router.push(`/product/${item.id}`) }}
                                            className="w-full text-left px-4 py-3 hover:bg-gray-700 flex items-center space-x-3 border-b border-gray-600 last:border-b-0 transition-colors duration-200"
                                        >
                                            <Image width={50} height={50} className='rounded-lg object-cover' src={item.images[0]} alt={item.brand?.name} />
                                            <div className="flex-1">
                                                <span className="text-white font-medium">{item.brand?.name ? `${item.brand.name} ` : ''}{item.name}</span>
                                                <div className="text-sm text-gray-400 mt-1">
                                                    <Price value={item.price} className="text-yellow-500 font-semibold" />
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </form>

                        {/* Right Side Actions */}
                        <div className="flex items-center space-x-4">
                            <LanguageSwitcher />

                            <Link href="/cart" className="relative p-2 text-white hover:text-yellow-500 transition-colors duration-200">
                                <ShoppingCart size={20} />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-yellow-500 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>

                            {user ? (
                                <div className="relative dropdown-container">
                                    <button 
                                        className='flex items-center space-x-3 hover:bg-gray-800 p-2 rounded-lg transition-colors duration-200'
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                    >
                                        <Image width={36} height={36} className='rounded-full border-2 border-yellow-500' src='https://pagedone.io/asset/uploads/1704275541.png' alt='User avatar'/>
                                        <div className='text-left hidden xl:block'>
                                            <h5 className='text-sm font-semibold text-white'>{user.name}</h5>
                                            <span className='text-xs text-gray-400'>{user.email}</span>
                                        </div>
                                        <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                    
                                    {dropdownOpen && (
                                        <div className="absolute right-0 top-full mt-2 w-56 bg-gray-800 border border-gray-600 rounded-lg shadow-xl z-50 overflow-hidden">
                                            <div className="py-2">
                                                <Link 
                                                    href="/profile" 
                                                    className="flex items-center px-4 py-3 text-sm text-white hover:bg-gray-700 transition-colors duration-200"
                                                    onClick={() => setDropdownOpen(false)}
                                                >
                                                    <User size={16} className="mr-3 text-gray-400" />
                                                    {t('nav.profile')}
                                                </Link>
                                                {user.role === 'seller' && (
                                                    <Link href="/store" className="flex items-center px-4 py-3 text-sm text-white hover:bg-gray-700 transition-colors duration-200">
                                                        <Database size={16} className="mr-3 text-gray-400" />
                                                        {t('nav.store')}
                                                    </Link>
                                                )}
                                                <Link 
                                                    href="/orders" 
                                                    className="flex items-center px-4 py-3 text-sm text-white hover:bg-gray-700 transition-colors duration-200"
                                                    onClick={() => setDropdownOpen(false)}
                                                >
                                                    <ShoppingBasket size={16} className="mr-3 text-gray-400" />
                                                    {t('nav.orders')}
                                                </Link>
                                                <hr className="my-2 border-gray-600" />
                                                <button 
                                                    onClick={handleLogout}
                                                    className="w-full flex items-center px-4 py-3 text-sm text-red-400 hover:bg-red-900/20 transition-colors duration-200"
                                                >
                                                    <LogOut size={16} className="mr-3" />
                                                    {t('nav.logout')}
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link href="/login">
                                    <button className="btn-primary text-sm px-6 py-2.5">
                                        {t('nav.login')}
                                    </button>
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden flex items-center space-x-3">
                        <LanguageSwitcher />
                        <Link href="/cart" className="relative p-2 text-white">
                            <ShoppingCart size={20} />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-yellow-500 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        <button 
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 text-white hover:text-yellow-500 transition-colors duration-200"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden border-t border-gray-700 py-4 animate-fade-in-up">
                        <div className="space-y-4">
                            <Link href="/" className="block text-white hover:text-yellow-500 font-medium py-2">
                                {t('nav.home')}
                            </Link>
                            <Link href="/shop" className="block text-white hover:text-yellow-500 font-medium py-2">
                                WATCHES
                            </Link>
                            <Link href="/about" className="block text-white hover:text-yellow-500 font-medium py-2">
                                OUR STORY
                            </Link>
                            <Link href="/contact" className="block text-white hover:text-yellow-500 font-medium py-2">
                                ACCESSORIES
                            </Link>
                            
                            {/* Mobile Search */}
                            <form onSubmit={handleSearch} className="pt-4">
                                <div className="flex items-center bg-gray-800 rounded-lg px-4 py-3 border border-gray-600">
                                    <Search size={18} className="text-gray-400 mr-3" />
                                    <input 
                                        className="flex-1 bg-transparent outline-none text-white placeholder-gray-400" 
                                        type="text" 
                                        placeholder="Search watches..." 
                                        value={search} 
                                        onChange={(e) => setSearch(e.target.value)} 
                                    />
                                </div>
                            </form>

                            {/* Mobile User Actions */}
                            <div className="pt-4 border-t border-gray-700">
                                {user ? (
                                    <div className="space-y-3">
                                        <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                                            <Image width={40} height={40} className='rounded-full border-2 border-yellow-500' src='https://pagedone.io/asset/uploads/1704275541.png' alt='User avatar'/>
                                            <div>
                                                <h5 className='text-sm font-semibold text-white'>{user.name}</h5>
                                                <span className='text-xs text-gray-400'>{user.email}</span>
                                            </div>
                                        </div>
                                        <Link href="/profile" className="block text-white hover:text-yellow-500 font-medium py-2">
                                            {t('nav.profile')}
                                        </Link>
                                        {user.role === 'seller' && (
                                            <Link href="/store" className="block text-white hover:text-yellow-500 font-medium py-2">
                                                {t('nav.store')}
                                            </Link>
                                        )}
                                        <Link href="/orders" className="block text-white hover:text-yellow-500 font-medium py-2">
                                            {t('nav.orders')}
                                        </Link>
                                        <button 
                                            onClick={handleLogout}
                                            className="w-full text-left text-red-400 hover:text-red-300 font-medium py-2"
                                        >
                                            {t('nav.logout')}
                                        </button>
                                    </div>
                                ) : (
                                    <Link href="/login">
                                        <button className="w-full btn-primary">
                                            {t('nav.login')}
                                        </button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar