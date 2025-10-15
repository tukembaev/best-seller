'use client'
import { assets, categories } from "@/assets/assets";
import Image from "next/image";
import Title from "../shared/Title";
import Link from "next/link";
import { useTranslations } from 'next-intl';
 
const BrandsMarquee = () => {
  const t = useTranslations('common.brands');
  
  return (
    <div className="overflow-hidden w-full relative max-w-7xl mx-auto select-none group sm:my-20">
      <Title
        title={t('title')}
        description={t('description')}
        href="/shop"
      />

      {/* Левая градиентная тень */}
      <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />

      {/* Бегущая строка */}
      <div className="flex min-w-[200%] animate-[marqueeScroll_10s_linear_infinite] sm:animate-[marqueeScroll_40s_linear_infinite] group-hover:[animation-play-state:paused] gap-6 mt-12">
        {[...categories, ...categories, ...categories, ...categories].map(
          (brand, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex items-center justify-center transition-transform duration-300 hover:scale-110"
            >
              <Link href={`/brand/${brand}`}>
               <Image
                src={assets[brand]}
                alt={brand}
                height={80}
                width={160}
                className="h-16 sm:h-8 md:h-12 lg:h-12 w-auto object-contain"
                draggable={false}
                priority
              />
              </Link>
             
            </div>
          )
        )}
      </div>

      {/* Правая градиентная тень */}
      <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
    </div>
  );
};

export default BrandsMarquee;
