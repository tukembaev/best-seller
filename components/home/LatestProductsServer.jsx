import { use } from 'react'
import { getLatestProducts } from '@/lib/queries/products'
import ProductCard from '../product/ProductCard'
import Title from '../shared/Title'
 

export default function LatestProductsServer() {
  const products = use(getLatestProducts(4))

  return (
    <div className='px-6 my-30 max-w-7xl mx-auto'>
      <Title title={'Latest Products'} description={`Showing ${products.length} of latest products`} href='/shop' buttonLabel={'View more'} />
      <div className='mt-12 grid gap-6 xl:ml-6 mb-32 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
