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
    <div className='px-6 my-30 max-w-6xl mx-auto'>
      <Title title={t('bestSelling')} description={t('bestSellingDescription', { count: products.length })} href='/shop' buttonLabel={tHero('viewMore')} />
      <div className='mt-12 grid gap-6 xl:ml-6 mb-32 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
