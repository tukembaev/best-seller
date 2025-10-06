'use client'

import { useState, useMemo } from "react"
import ProductCard from "@/components/product/ProductCard"
import { MoveLeftIcon, Search } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import CustomSelect from "@/components/shared/CustomSelect"

export function ShopClient({ products, brands }) {
  const searchParams = useSearchParams()
  const search = searchParams.get('search')
  const router = useRouter()

  const [sortBy, setSortBy] = useState("default")
  const [brand, setBrand] = useState("all")
  const [localSearch, setLocalSearch] = useState(search || "")

  // фильтрация
  let filteredProducts = search
    ? products.filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase())
    )
    : products

  if (brand !== "all") {
    filteredProducts = filteredProducts.filter(p => p.brand?.name === brand)
  }

  // сортировка
  if (sortBy === "price-asc") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price)
  } else if (sortBy === "price-desc") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price)
  } else if (sortBy === "rating") {
    filteredProducts = [...filteredProducts].sort((a, b) => b._count.rating - a._count.rating)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    router.push(`/shop?search=${localSearch}`)
  }

  return (
    <div className="min-h-[70vh] mx-6">
      <div className="max-w-7xl mx-auto">
        <h1
          onClick={() => router.push('/shop')}
          className="text-2xl text-slate-500 my-6 flex items-center gap-2 cursor-pointer"
        >
          {search && <MoveLeftIcon size={20} />} All{" "}
          <span className="text-slate-700 font-medium">Products</span>
        </h1>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="flex items-center w-full sm:w-1/2 gap-2 bg-slate-100 px-4 py-2 rounded-full xl:ml-6"
          >
            <Search size={18} className="text-slate-500" />
            <input
              type="text"
              placeholder="Search products..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full bg-transparent outline-none text-sm text-slate-700 "
            />
          </form>

          {/* Sorting + Brands */}
          <div className="flex gap-4 w-full sm:w-auto">
            <CustomSelect
              value={sortBy}
              onChange={setSortBy}
              options={[
                { value: "default", label: "Default" },
                { value: "price-asc", label: "Price: Low → High" },
                { value: "price-desc", label: "Price: High → Low" },
                { value: "rating", label: "Rating" },
              ]}
              className="w-[160px]"
            />

            <CustomSelect
              value={brand}
              onChange={setBrand}
              options={[
                { value: "all", label: "All brands" },
                ...brands.map(b => ({ value: b.name, label: b.name }))
              ]}
              className="w-[160px]"
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid gap-6 xl:ml-6 mb-32 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
