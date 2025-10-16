// components/contact/ContactLocation.tsx
import EmbeddedMap from "./EmbeddedMap";
import React from "react";
import { useTranslations } from 'next-intl';
import Title from '../shared/Title';
import { MapPin, ExternalLink } from 'lucide-react';

export default function ContactLocation() {
  const t = useTranslations('common.contact.location');

  return (
    <section className="section-padding bg-gray-900">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-yellow-500 tracking-wider mb-4">FIND US</h2>
          <p className="text-gray-400 text-lg">Visit our premium showroom in the heart of the city</p>
        </div>
        
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left side: Map */}
          <div className="order-2 lg:order-1">
            <div className="bg-gray-800/50 rounded-2xl p-6 shadow-xl border border-gray-700 backdrop-blur-sm">
              <div className="rounded-xl overflow-hidden shadow-lg border border-gray-600 relative h-[400px]">
                <EmbeddedMap />
              </div>
            </div>
          </div>

          {/* Right side: Location Details */}
          <div className="order-1 lg:order-2 space-y-8">
            <div className="bg-gray-800/50 rounded-2xl p-8 shadow-xl border border-gray-700 backdrop-blur-sm">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center gold-glow">
                    <MapPin size={24} className="text-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">TREWATCH Showroom</h3>
                    <p className="text-gray-400">Premium timepieces in the heart of the city</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-600">
                    <p className="text-gray-300 leading-relaxed">
                      Located in the prestigious business district, our showroom offers a luxurious environment where you can explore our extensive collection of premium timepieces.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/30">
                    <p className="text-yellow-500 font-semibold">Bishkek, Kyrgyzstan</p>
                  </div>
                </div>
                
                <a
                  href="https://2gis.kg/bishkek/firm/70000001025950204"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center space-x-2 btn-primary"
                >
                  <span>Open in 2GIS</span>
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
