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
    <section className="section-padding bg-white">
      <div className="container-custom">
        <Title 
          title={t('latestProducts')} 
          description={t('latestProductsDescription', { count: products.length })} 
          href="/shop" 
          buttonLabel={tHero('viewMore')} 
        />
        
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
