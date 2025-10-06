import { Suspense } from "react"
import { ShopClient } from "./ShopClient"
import { getProductsWithRelations, getBrands } from "@/lib/queries/products"

async function ShopContent() {
  const [products, brands] = await Promise.all([
    getProductsWithRelations(),
    getBrands()
  ])

  return <ShopClient products={products} brands={brands} />
}

export default function Shop() {
  return (
    <Suspense fallback={<div>Loading shop...</div>}>
      <ShopContent />
    </Suspense>
  )
}
