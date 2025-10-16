// components/contact/ContactLocation.tsx
import EmbeddedMap from "./EmbeddedMap";
import React from "react";
import { useTranslations } from 'next-intl';
import Title from '../shared/Title';
import { MapPin, ExternalLink } from 'lucide-react';

export default function ContactLocation() {
  const t = useTranslations('common.contact.location');

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <Title
          title={t('title')}
          description={t('subtitle')}
          visibleButton={false}
        />
        
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left side: Map */}
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
              <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 relative h-[400px]">
                <EmbeddedMap />
              </div>
            </div>
          </div>

          {/* Right side: Location Details */}
          <div className="order-1 lg:order-2 space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                    <MapPin size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{t('headquarters')}</h3>
                    <p className="text-gray-600">{t('address')}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-gray-700 leading-relaxed">
                      {t('directions')}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <p className="text-blue-800 font-semibold">{t('city')}</p>
                  </div>
                </div>
                
                <a
                  href="https://2gis.kg/bishkek/firm/70000001025950204"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <span>{t('openIn2GIS')}</span>
                  <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
