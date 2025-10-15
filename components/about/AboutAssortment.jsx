// components/about/AboutAssortment.tsx
import { assets } from '@/assets/assets';
import Image from 'next/image';
import { useTranslations } from 'next-intl';


export default function AboutAssortment() {
  const t = useTranslations('common.about.assortment');

  return (
    <section className="px-6 my-20 max-w-6xl mx-auto">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-semibold text-slate-800">{t('title')}</h2>
        <p className="max-w-lg text-center text-sm text-slate-600 mt-2">
          {t('description')}
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col items-center md:items-start">
          <Image
            src={'https://iflwatches.com/cdn/shop/articles/thumbnail-1704375617992_54af31a8-c6cd-4821-84e6-ff99775e7f25.jpg?v=1714386348&width=1000'}
            alt="Watch Collection"
            width={400}
            height={300}
            className="rounded-lg mb-4 w-full max-w-md"
          />
          <p className="text-slate-600 text-sm leading-relaxed">
            {t('text1')}
          </p>
        </div>
        <div className="flex flex-col items-center md:items-end">
          <Image
            src={assets.watch_1}
            alt="Diverse Watch Range"
            width={400}
            height={300}
            className="rounded-lg mb-4 w-full max-w-md"
          />
          <p className="text-slate-600 text-sm leading-relaxed">
            {t('text2')}
          </p>
        </div>
      </div>
    </section>
  );
}