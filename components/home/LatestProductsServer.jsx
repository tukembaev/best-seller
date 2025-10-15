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
    <div className='px-6 my-30 max-w-7xl mx-auto'>
      <Title title={t('latestProducts')} description={t('latestProductsDescription', { count: products.length })} href='/shop' buttonLabel={tHero('viewMore')} />
      <div className='mt-12 grid gap-6 xl:ml-6 mb-32 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
