import { use } from 'react'
import { getLatestProducts } from '@/lib/queries/products'
import ProductCard from '../product/ProductCard'
import Title from '../shared/Title'
import { useTranslations } from 'next-intl'
 

export default function LatestProductsServer() {
  const products = use(getLatestProducts(4))
  const t = useTranslations('common.products')
  const tHero = useTranslations('common.hero')

  return (
    <section className="section-padding bg-gray-800">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-yellow-500 tracking-wider mb-4">LATEST ARRIVALS</h2>
          <p className="text-gray-400 text-lg">Fresh additions to our premium collection</p>
        </div>
        
        <div className="mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
