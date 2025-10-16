// components/about/HeroAbout.tsx
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HeroAbout() {
  const t = useTranslations('common.about.hero');

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f3f4f6' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      <div className="container-custom section-padding relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-6 py-3 rounded-full border border-blue-200 shadow-sm">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-1 rounded-full text-white text-sm font-semibold">
                {t('badge')}
              </span>
              <span className="font-medium">{t('badgeSubtitle')}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="gradient-text">{t('title')}</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                {t('description')}
              </p>
            </div>

            {/* CTA Button */}
            <button className="group inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <span>{t('button')}</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>

          {/* Right Content - Image */}
          <div className="relative lg:ml-8">
            <div className="relative bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-8 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-200/50 to-purple-200/50 rounded-3xl"></div>
              <div className="relative z-10">
                <Image
                  src={'https://i.ytimg.com/vi/BtmLw_8zBew/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBUvePx7YVBzpPSgqECm2TTDduu8Q'}
                  alt="About Hero Image"
                  width={513}
                  height={542}
                  className="w-full h-auto max-w-md mx-auto drop-shadow-2xl rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}