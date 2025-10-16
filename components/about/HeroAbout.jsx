// components/about/HeroAbout.tsx
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HeroAbout() {
  const t = useTranslations('common.about.hero');

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFD700' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      <div className="container-custom section-padding relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 bg-gray-800/50 text-yellow-500 px-6 py-3 rounded-full border border-yellow-500/30 shadow-lg backdrop-blur-sm">
              <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 px-4 py-1 rounded-full text-black text-sm font-bold">
                OUR STORY
              </span>
              <span className="font-medium text-white">PREMIUM TIMEPIECES</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-yellow-500 font-black tracking-wider">ABOUT</span>
              </h1>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white tracking-wide">
                TREWATCH
              </h2>
              <p className="text-xl text-gray-300 max-w-lg leading-relaxed font-light">
                Discover our passion for precision, craftsmanship, and timeless elegance. We bring you the world's finest timepieces from renowned brands.
              </p>
            </div>

            {/* CTA Button */}
            <button className="group inline-flex items-center space-x-2 btn-primary">
              <span>EXPLORE COLLECTION</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>

          {/* Right Content - Image */}
          <div className="relative lg:ml-8">
            <div className="relative bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-700">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-3xl"></div>
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