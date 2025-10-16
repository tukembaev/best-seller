// components/about/AboutLocation.tsx
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Title from '../shared/Title';

export default function AboutLocation() {
  const t = useTranslations('common.about.location');

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <Title
          title={t('title')}
          description={t('description')}
          visibleButton={false}
        />
        
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <p className="text-gray-600 leading-relaxed text-lg">
                {t('text')}
              </p>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 shadow-lg">
              <Image
                src={'https://swisstime-exclusive.kg/wp-content/uploads/2021/12/veter-vremeni-butik.jpg'}
                alt="Store Interior"
                width={400}
                height={300}
                className="w-full h-80 object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}