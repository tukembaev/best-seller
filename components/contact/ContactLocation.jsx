// components/contact/ContactLocation.tsx
import EmbeddedMap from "./EmbeddedMap";
import React from "react";
import { useTranslations } from 'next-intl';

export default function ContactLocation() {
  const t = useTranslations('common.contact.location');

  return (
    <section className="px-6 my-20 max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left side: Map */}
         <div className="w-full lg:w-1/2 rounded-xl overflow-hidden shadow-lg border border-slate-200 relative h-[350px] md:h-[400px] max-h-[400px] flex-shrink-0">
          <EmbeddedMap />
        </div>

        {/* Right side: Location Details */}
        <div className="lg:w-1/2 space-y-4">
          <h2 className="text-3xl font-semibold text-slate-800">
            {t('title')}
          </h2>
          <h3 className="text-xl font-medium text-slate-800">
            {t('subtitle')}
          </h3>
          <div className="space-y-2">
            <p className="text-slate-600">
              <strong>{t('headquarters')}</strong> {t('address')}
            </p>
            <p className="text-slate-600">
              {t('directions')}
            </p>
            <p className="text-slate-600">{t('city')}</p>
          </div>
          <a
            href="https://2gis.kg/bishkek/firm/70000001025950204"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium mt-4 transition-colors"
          >
            {t('openIn2GIS')}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 10h3v11H1z"></path>
              <path d="M9 10h3v11H9z"></path>
              <path d="M17 10h3v11h-3z"></path>
              <path d="M3 10V6a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v4"></path>
              <line x1="12" y1="5" x2="12" y2="5"></line>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
