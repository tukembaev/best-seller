'use client'
import { assets, categories } from "@/assets/assets";
import Image from "next/image";
import Title from "../shared/Title";
import Link from "next/link";
import { useTranslations } from 'next-intl';
 
const BrandsMarquee = () => {
  const t = useTranslations('common.brands');
  
  return (
    <div className="py-16 bg-white">
      <div className="container-custom">

        <div className="relative mt-2 overflow-hidden">
          {/* Left gradient */}
          <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
          
          {/* Right gradient */}
          <div className="absolute right-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />

          {/* Scrolling brands */}
          <div className="flex min-w-[200%] animate-[marqueeScroll_30s_linear_infinite] hover:[animation-play-state:paused] gap-8">
            {[...categories, ...categories, ...categories, ...categories].map(
              (brand, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 flex items-center justify-center transition-transform duration-300 hover:scale-110 group"
                >
                  <Link href={`/brand/${brand}`} className="block">
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-blue-200">
                      <Image
                        src={assets[brand]}
                        alt={brand}
                        height={60}
                        width={120}
                        className="h-12 w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                        draggable={false}
                        priority
                      />
                    </div>
                  </Link>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandsMarquee;
