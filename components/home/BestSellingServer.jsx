import { use } from "react"
import { getProductsWithRelations } from "@/lib/queries/products"
import ProductCard from '../product/ProductCard'
import Title from '../shared/Title'
import { useTranslations } from 'next-intl'
 

// Create a promise for the data
const getBestSellingProducts = getProductsWithRelations().then(products =>
  products.sort((a, b) => b._count.rating - a._count.rating).slice(0, 12)
)

export default function BestSellingServer() {
  const products = use(getBestSellingProducts)
  const t = useTranslations('common.products')
  const tHero = useTranslations('common.hero')

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <Title 
          title={t('bestSelling')} 
          description={t('bestSellingDescription', { count: products.length })} 
          href="/shop" 
          buttonLabel={tHero('viewMore')} 
        />
        
        <div className="mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
