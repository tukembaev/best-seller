import { use } from 'react'
import { getLatestProducts } from '@/lib/queries/products'
import ProductCard from '../product/ProductCard'
import Title from '../shared/Title'
 

export default function LatestProductsServer() {
  const products = use(getLatestProducts(4))

  return (
    <div className='px-6 my-30 max-w-6xl mx-auto'>
      <Title title={'Latest Products'} description={`Showing ${products.length} of latest products`} href='/shop' buttonLabel={'View more'} />
      <div className='mt-12 grid grid-cols-2 sm:flex flex-wrap gap-6 justify-between'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
