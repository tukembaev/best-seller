import React from 'react'
import { SendIcon, ClockFadingIcon, HeadsetIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';



const OurSpecs = () => {
    const t = useTranslations('common.specs');

    const ourSpecsData = [
        { titleKey: 'freeShipping.title', descriptionKey: 'freeShipping.description', icon: SendIcon, accent: '#05DF72' },
        { titleKey: 'easyReturn.title', descriptionKey: 'easyReturn.description', icon: ClockFadingIcon, accent: '#FF8904' },
        { titleKey: 'support.title', descriptionKey: 'support.description', icon: HeadsetIcon, accent: '#A684FF' }
    ];

    return (
        <div className='px-6 my-20 max-w-6xl mx-auto'>
            {/* <Title visibleButton={false} title='Our Specifications' description="We offer top-tier service and convenience to ensure your shopping experience is smooth, secure and completely hassle-free." /> */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 gap-y-10 mt-26'>
                {
                    ourSpecsData.map((spec, index) => {
                        return (
                            <div className='relative h-44 px-8 flex flex-col items-center justify-center w-full text-center border rounded-lg group' style={{ backgroundColor: spec.accent + 10, borderColor: spec.accent + 30 }} key={index}>
                                <h3 className='text-slate-800 font-medium'>{t(spec.titleKey)}</h3>
                                <p className='text-sm text-slate-600 mt-3'>{t(spec.descriptionKey)}</p>
                                <div className='absolute -top-5 text-white size-10 flex items-center justify-center rounded-md group-hover:scale-105 transition' style={{ backgroundColor: spec.accent }}>
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