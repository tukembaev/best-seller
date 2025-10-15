// components/about/HeroAbout.tsx
import Image from 'next/image';
import { useTranslations } from 'next-intl';


export default function HeroAbout() {
  const t = useTranslations('common.about.hero');

  return (
    <section className="relative flex-1 flex flex-col bg-gradient-to-br from-slate-50 to-blue-50  xl:min-h-100 group mb-10 max-w-7xl mx-auto">
      <div className="p-5 sm:p-16 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2">
          <div className="inline-flex items-center gap-3 bg-blue-300 text-blue-600 pr-4 p-1 rounded-full text-xs sm:text-sm mb-4">
            <span className="bg-blue-600 px-3 py-1 max-sm:ml-1 rounded-full text-white text-xs">{t('badge')}</span>
            {t('badgeSubtitle')}
          </div>
          <h1 className="text-3xl sm:text-5xl leading-[1.2] my-3 font-medium bg-gradient-to-r from-slate-600 to-[#A0FF74] bg-clip-text text-transparent max-w-xs sm:max-w-md">
            {t('title')}
          </h1>
          <p className="text-slate-800 text-sm font-medium mt-4 sm:mt-8">
            {t('description')}
          </p>
          <button className="bg-slate-800 text-white text-sm py-2.5 px-7 sm:py-5 sm:px-12 mt-4 sm:mt-10 rounded-md hover:bg-slate-900 hover:scale-103 active:scale-95 transition">
            {t('button')}
          </button>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0">
          <Image
            src={'https://i.ytimg.com/vi/BtmLw_8zBew/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBUvePx7YVBzpPSgqECm2TTDduu8Q'}
            alt="About Hero Image"
            width={513}
            height={542}
            className="w-full sm:max-w-sm mx-auto"
          />
        </div>
      </div>
    </section>
  );
}