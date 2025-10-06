'use client'
import { Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";
import Image from "next/image";
import { loginSuccess } from "@/lib/features/auth/authSlice";

const Navbar = () => {

    const router = useRouter();

    const dispatch = useDispatch()
    const [search, setSearch] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [open, setOpen] = useState(false)
    const [user, setUser] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const cartCount = useSelector(state => state.cart.total)

    const handleSearch = (e) => {
        e.preventDefault()
        router.push(`/shop?search=${search}`)
    }

    useEffect(() => {
        // Загружаем пользователя из localStorage после монтирования компонента
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

    return (
        <nav className="relative bg-white">
            <div className="mx-6">
                <div className="flex items-center justify-between max-w-7xl mx-auto py-4  transition-all">

                    <Link href="/" className="relative text-4xl font-semibold text-slate-700">
                        <span className="text-blue-600">Best</span>Seller<span className="text-blue-600 text-5xl leading-0">.</span>
                        <p className="absolute text-xs font-semibold -top-1 -right-8 px-3 p-0.5 rounded-full flex items-center gap-2 text-white bg-blue-500">
                            kg
                        </p>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden sm:flex items-center gap-4 lg:gap-8 text-slate-600">
                        <Link href="/">Home</Link>
                        <Link href="/shop">Shop</Link>
                        <Link href="/about">About</Link>
                        <Link href="/store">Store</Link>
                        <Link href="/contact">Contact</Link>

                        <form onSubmit={handleSearch} className="hidden xl:flex items-center w-xs text-sm gap-2 bg-slate-100 px-4 py-3 rounded-full relative">
                            <Search size={18} className="text-slate-600" />
                            <input className="w-full bg-transparent outline-none placeholder-slate-600" type="text" placeholder={'Search products...'} value={search} onChange={(e) => setSearch(e.target.value)} onFocus={() => setOpen(true)} />

                            {open && suggestions.length > 0 && (
                                <div className="absolute top-12 left-0 right-0 bg-white border border-slate-200 rounded-lg shadow z-30 p-2">
                                    {suggestions.map(item => (
                                        <button
                                            key={item.id}
                                            type="button"
                                            onClick={() => { setOpen(false); setSearch(''); router.push(`/product/${item.id}`) }}
                                            className="w-full text-left px-3 py-2 hover:bg-slate-50 rounded flex items-center gap-3"
                                        >
                                            <span className="text-slate-700">{item.brand?.name ? `${item.brand.name} ` : ''}{item.name}</span>
                                            <span className="ml-auto text-slate-500 text-sm">{item.price} $</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </form>

                        <LanguageSwitcher />

                        <Link href="/cart" className="relative flex items-center gap-2 text-slate-600">
                            <ShoppingCart size={18} />
                            Cart
                            <button className="absolute -top-1 left-3 text-[8px] text-white bg-slate-600 size-3.5 rounded-full">{cartCount}</button>
                        </Link>
                        {user ? <button className='flex items-center justify-center space-x-4'>
                            <Image width={64} height={64} className='rounded-full' src='https://pagedone.io/asset/uploads/1704275541.png' alt='Media rounded avatar'/>
                                <div className='font-medium'>
                                    <h5 className='text-base font-semibold text-gray-900'>{user.name}</h5>
                                    <span className='text-sm text-gray-500'>{user.email}</span>
                                </div>
                        </button>
                            : <Link href="/login">
                                <button className="px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full">
                                    Login
                                </button>
                            </Link>}




                    </div>

                    {/* Mobile User Button  */}
                    <div className="sm:hidden flex items-center gap-2">
                        <LanguageSwitcher />
                        <button className="px-7 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-sm transition text-white rounded-full">
                            Login
                        </button>
                    </div>
                </div>
            </div>
            <hr className="border-gray-300" />
        </nav>
    )
}

export default Navbar