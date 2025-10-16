'use client'
import { assets } from '@/assets/assets'
import { ArrowRightIcon, ChevronRightIcon, Star, Shield, Truck, Clock } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import Price from '@/components/shared/Price'
import {useTranslations} from 'next-intl'
import BrandsMarquee from './BrandsMarquee'
 
const Hero = () => {
    const t = useTranslations('common')
    
    const features = [
        { icon: Truck, text: "Free Shipping", color: "text-green-600" },
        { icon: Shield, text: "Secure Payment", color: "text-blue-600" },
        { icon: Clock, text: "24/7 Support", color: "text-purple-600" },
        { icon: Star, text: "Premium Quality", color: "text-yellow-600" }
    ]

    return (
        <div className='relative overflow-hidden'>
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
            <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f3f4f6' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '60px 60px'
                }}></div>
            </div>
            
            <div className='container-custom section-padding relative'>
                <div className='grid lg:grid-cols-2 gap-12 items-center'>
                    {/* Left Content */}
                    <div className='space-y-8 animate-fade-in-up'>
                        {/* Badge */}
                        <div className='inline-flex items-center gap-3 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-6 py-3 rounded-full border border-blue-200 shadow-sm'>
                            <span className='bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-1 rounded-full text-white text-sm font-semibold'>
                                {t('hero.badge')}
                            </span>
                            <span className="font-medium">{t('hero.freeShipping')}</span>
                            <ChevronRightIcon className='text-blue-500' size={16} />
                        </div>

                        {/* Main Headline */}
                        <div className='space-y-4'>
                            <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold leading-tight'>
                                <span className="gradient-text">{t('hero.headline')}</span>
                            </h1>
                            <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                                Discover our curated collection of premium timepieces that blend timeless elegance with modern innovation.
                            </p>
                        </div>

                        {/* Price Section */}
                        <div className='flex items-center space-x-6'>
                            <div className='bg-white rounded-2xl p-6 shadow-lg border border-gray-100'>
                                <p className="text-gray-600 text-sm font-medium mb-2">{t('hero.startsFrom')}</p>
                                <div className="text-4xl font-bold gradient-text">
                                    <Price value={4.90} />
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                {[1,2,3,4,5].map((star) => (
                                    <Star key={star} size={20} className="text-yellow-400 fill-current" />
                                ))}
                                <span className="text-gray-600 ml-2">4.9/5</span>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className='flex flex-col sm:flex-row gap-4'>
                            <button className='btn-primary text-lg px-8 py-4 flex items-center justify-center space-x-2'>
                                <span>{t('hero.learnMore')}</span>
                                <ArrowRightIcon size={20} />
                            </button>
                            <button className='btn-secondary text-lg px-8 py-4'>
                                Watch Collection
                            </button>
                        </div>

                        {/* Features */}
                        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 pt-8'>
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-center space-x-2 text-sm">
                                    <feature.icon size={16} className={feature.color} />
                                    <span className="text-gray-600 font-medium">{feature.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Content - Product Showcase */}
                    <div className='relative lg:ml-8'>
                        <div className='relative'>
                            {/* Main Product Image */}
                            <div className='relative bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-8 shadow-2xl'>
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-200/50 to-purple-200/50 rounded-3xl"></div>
                                <div className="relative z-10">
                                    <Image 
                                        className='w-full h-auto max-w-md mx-auto drop-shadow-2xl' 
                                        src={assets.product_img12} 
                                        alt="Premium Watch" 
                                        priority
                                    />
                                </div>
                                
                                {/* Floating Elements */}
                                <div className="absolute top-8 left-8 bg-white rounded-xl p-3 shadow-lg animate-pulse-slow">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span className="text-xs font-semibold text-gray-700">In Stock</span>
                                    </div>
                                </div>
                                
                                <div className="absolute bottom-8 right-8 bg-white rounded-xl p-3 shadow-lg">
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-blue-600">50%</div>
                                        <div className="text-xs text-gray-600">OFF</div>
                                    </div>
                                </div>
                            </div>

                            {/* Secondary Product Cards */}
                            <div className='absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100'>
                                <div className="flex items-center space-x-3">
                                    <Image className='w-12 h-12 rounded-lg object-cover' src={assets.hero_product_img1} alt="Product" />
                                    <div>
                                        <p className="font-semibold text-gray-900 text-sm">{t('hero.bestProducts')}</p>
                                        <div className="flex items-center space-x-1 mt-1">
                                            <ArrowRightIcon size={12} className="text-blue-500" />
                                            <span className="text-xs text-gray-600">{t('hero.viewMore')}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100'>
                                <div className="flex items-center space-x-3">
                                    <Image className='w-12 h-12 rounded-lg object-cover' src={assets.hero_product_img2} alt="Product" />
                                    <div>
                                        <p className="font-semibold text-gray-900 text-sm">{t('hero.discounts')}</p>
                                        <div className="flex items-center space-x-1 mt-1">
                                            <ArrowRightIcon size={12} className="text-blue-500" />
                                            <span className="text-xs text-gray-600">{t('hero.viewMore')}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Brands Section */}
            <div className="bg-white border-t border-gray-100">
                <BrandsMarquee />
            </div>
        </div>
    )
}

export default Hero