import { use } from "react"
import { getProductsWithRelations } from "@/lib/queries/products"
import ProductCard from '../product/ProductCard'
import Title from '../shared/Title'
 

// Create a promise for the data
const getBestSellingProducts = getProductsWithRelations().then(products =>
  products.sort((a, b) => b._count.rating - a._count.rating).slice(0, 12)
)

export default function BestSellingServer() {
  const products = use(getBestSellingProducts)

  return (
    <div className='px-6 my-30 max-w-6xl mx-auto'>
      <Title title={'Best Selling'} description={`Showing ${products.length} best selling products`} href='/shop' buttonLabel={'View more'} />
      <div className='mt-12 grid grid-cols-2 sm:flex flex-wrap gap-6 xl:gap-12'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
