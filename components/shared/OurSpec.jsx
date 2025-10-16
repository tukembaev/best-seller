import React from 'react'
import { SendIcon, ClockFadingIcon, HeadsetIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';



const OurSpecs = () => {
    const t = useTranslations('common.specs');

    const ourSpecsData = [
        { titleKey: 'freeShipping.title', descriptionKey: 'freeShipping.description', icon: SendIcon, accent: '#FFD700' },
        { titleKey: 'easyReturn.title', descriptionKey: 'easyReturn.description', icon: ClockFadingIcon, accent: '#FFD700' },
        { titleKey: 'support.title', descriptionKey: 'support.description', icon: HeadsetIcon, accent: '#FFD700' }
    ];

    return (
        <div className='px-6 my-20 max-w-6xl mx-auto'>
            <div className='text-center mb-16'>
                <h2 className="text-4xl font-bold text-yellow-500 tracking-wider mb-4">OUR SERVICES</h2>
                <p className="text-gray-400 text-lg">Premium service for premium timepieces</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 gap-y-10 mt-26'>
                {
                    ourSpecsData.map((spec, index) => {
                        return (
                            <div className='relative h-44 px-8 flex flex-col items-center justify-center w-full text-center border rounded-lg group bg-gray-800/50 border-gray-700 backdrop-blur-sm' key={index}>
                                <h3 className='text-white font-medium'>{t(spec.titleKey)}</h3>
                                <p className='text-sm text-gray-400 mt-3'>{t(spec.descriptionKey)}</p>
                                <div className='absolute -top-5 text-black size-10 flex items-center justify-center rounded-md group-hover:scale-105 transition bg-yellow-500'>
                                    <spec.icon size={20} />
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default OurSpecs