// components/about/AboutServices.tsx
import { SendIcon, ClockFadingIcon, HeadsetIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function AboutServices() {
  const t = useTranslations('common.about.services');
  
  const services = [
    {
      titleKey: 'freeShipping.title',
      descriptionKey: 'freeShipping.description',
      icon: SendIcon,
      accent: '#05DF72'
    },
    {
      titleKey: 'qualityControl.title',
      descriptionKey: 'qualityControl.description',
      icon: ClockFadingIcon,
      accent: '#FF8904'
    },
    {
      titleKey: 'support.title',
      descriptionKey: 'support.description',
      icon: HeadsetIcon,
      accent: '#A684FF'
    }
  ];

  return (
    <section className="px-6 my-20 max-w-6xl mx-auto">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-semibold text-slate-800">{t('title')}</h2>
        <p className="max-w-lg text-center text-sm text-slate-600 mt-2">
          {t('description')}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mt-12">
        {services.map((service, index) => (
          <div
            key={index}
            className="relative h-44 px-8 flex flex-col items-center justify-center w-full text-center border rounded-lg group"
            style={{
              backgroundColor: `rgba(${service.accent === '#05DF72' ? '5,223,114' : service.accent === '#FF8904' ? '255,137,4' : '166,132,255'}, 0.063)`,
              borderColor: `rgba(${service.accent === '#05DF72' ? '5,223,114' : service.accent === '#FF8904' ? '255,137,4' : '166,132,255'}, 0.19)`
            }}
          >
            <div
              className="absolute -top-5 text-white size-10 flex items-center justify-center rounded-md group-hover:scale-105 transition"
              style={{ backgroundColor: service.accent }}
            >
              <service.icon className="w-5 h-5" />
            </div>
            <h3 className="text-slate-800 font-medium">{t(service.titleKey)}</h3>
            <p className="text-sm text-slate-600 mt-3">{t(service.descriptionKey)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}