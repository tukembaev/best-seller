// components/about/AboutAssortment.tsx
import { assets } from '@/assets/assets';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Title from '../shared/Title';

export default function AboutAssortment() {
  const t = useTranslations('common.about.assortment');

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <Title
          title={t('title')}
          description={t('description')}
          visibleButton={false}
        />
        
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 shadow-lg">
              <Image
                src={'https://iflwatches.com/cdn/shop/articles/thumbnail-1704375617992_54af31a8-c6cd-4821-84e6-ff99775e7f25.jpg?v=1714386348&width=1000'}
                alt="Watch Collection"
                width={400}
                height={300}
                className="w-full h-64 object-cover rounded-xl mb-6"
              />
              <p className="text-gray-600 leading-relaxed">
                {t('text1')}
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 shadow-lg">
              <Image
                src={assets.watch_1}
                alt="Diverse Watch Range"
                width={400}
                height={300}
                className="w-full h-64 object-cover rounded-xl mb-6"
              />
              <p className="text-gray-600 leading-relaxed">
                {t('text2')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}