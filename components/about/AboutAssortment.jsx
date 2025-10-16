// components/about/AboutAssortment.tsx
import { assets } from '@/assets/assets';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Title from '../shared/Title';

export default function AboutAssortment() {
  const t = useTranslations('common.about.assortment');

  return (
    <section className="section-padding bg-gray-800">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-yellow-500 tracking-wider mb-4">OUR COLLECTION</h2>
          <p className="text-gray-400 text-lg">Discover the finest timepieces from world-renowned brands</p>
        </div>
        
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-gray-900/50 rounded-2xl p-6 shadow-lg border border-gray-700 backdrop-blur-sm">
              <Image
                src={'https://iflwatches.com/cdn/shop/articles/thumbnail-1704375617992_54af31a8-c6cd-4821-84e6-ff99775e7f25.jpg?v=1714386348&width=1000'}
                alt="Watch Collection"
                width={400}
                height={300}
                className="w-full h-64 object-cover rounded-xl mb-6"
              />
              <p className="text-gray-300 leading-relaxed">
                Our curated collection features the most prestigious watch brands, from classic Swiss timepieces to modern luxury designs.
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gray-900/50 rounded-2xl p-6 shadow-lg border border-gray-700 backdrop-blur-sm">
              <Image
                src={assets.watch_1}
                alt="Diverse Watch Range"
                width={400}
                height={300}
                className="w-full h-64 object-cover rounded-xl mb-6"
              />
              <p className="text-gray-300 leading-relaxed">
                From elegant dress watches to robust sports timepieces, we offer something for every taste and occasion.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}