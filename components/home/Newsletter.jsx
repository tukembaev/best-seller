import React from 'react'
import Title from '../shared/Title'
import { useTranslations } from 'next-intl'


const Newsletter = () => {
    const t = useTranslations('common')
    return (
        <div className='flex flex-col items-center mx-4 my-36'>
            <Title title={t('newsletter.title')} description={t('newsletter.subtitle')} visibleButton={false} />
            <div className='flex bg-slate-100 text-sm p-1 rounded-full w-full max-w-xl my-10 border-2 border-white ring ring-slate-200'>
                <input className='flex-1 pl-5 outline-none' type="text" placeholder={t('newsletter.emailPlaceholder')} />
                <button className='font-medium bg-blue-500 text-white px-7 py-3 rounded-full hover:scale-103 active:scale-95 transition'>{t('newsletter.subscribe')}</button>
            </div>
        </div>
    )
}

export default Newsletter