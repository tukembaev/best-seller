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
        { icon: Truck, text: "Free Shipping", color: "text-green-400" },
        { icon: Shield, text: "Secure Payment", color: "text-blue-400" },
        { icon: Clock, text: "24/7 Support", color: "text-purple-400" },
        { icon: Star, text: "Premium Quality", color: "text-yellow-400" }
    ]

    return (
        <div className='relative overflow-hidden gradient-bg'>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFD700' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '60px 60px'
                }}></div>
            </div>
            
            <div className='container-custom section-padding relative'>
                <div className='grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]'>
                    {/* Left Content */}
                    <div className='space-y-8 animate-fade-in-up'>
                        {/* Brand Badge */}
                        <div className='inline-flex items-center gap-3 bg-gray-800/50 text-yellow-500 px-6 py-3 rounded-full border border-yellow-500/30 shadow-lg backdrop-blur-sm'>
                            <span className='bg-gradient-to-r from-yellow-500 to-yellow-600 px-4 py-1 rounded-full text-black text-sm font-bold'>
                                PREMIUM
                            </span>
                            <span className="font-medium text-white">TIMEPIECES</span>
                            <ChevronRightIcon className='text-yellow-500' size={16} />
                        </div>

                        {/* Main Headline */}
                        <div className='space-y-6'>
                            <h1 className='text-5xl md:text-7xl lg:text-8xl font-bold leading-tight'>
                                <span className="text-yellow-500 font-black tracking-wider">ROLEX</span>
                            </h1>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white tracking-wide">
                                COSMOGRAPH DAYTONA
                            </h2>
                            <p className="text-xl text-gray-300 max-w-lg leading-relaxed font-light">
                                Discover our curated collection of premium timepieces that blend timeless elegance with modern innovation.
                            </p>
                        </div>

                        {/* Price Section */}
                        <div className='flex items-center space-x-8'>
                            <div className='bg-gray-800/50 rounded-2xl p-6 shadow-lg border border-gray-700 backdrop-blur-sm'>
                                <p className="text-gray-400 text-sm font-medium mb-2">STARTING FROM</p>
                                <div className="text-4xl font-bold text-white">
                                    € 10.390
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                {[1,2,3,4,5].map((star) => (
                                    <Star key={star} size={20} className="text-yellow-400 fill-current" />
                                ))}
                                <span className="text-gray-400 ml-2">4.9/5</span>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className='flex flex-col sm:flex-row gap-4'>
                            <button className='btn-primary text-lg px-8 py-4 flex items-center justify-center space-x-2'>
                                <span>BUY NOW</span>
                                <ArrowRightIcon size={20} />
                            </button>
                            <button className='btn-secondary text-lg px-8 py-4'>
                                VIEW COLLECTION
                            </button>
                        </div>

                        {/* Watch Specifications */}
                        <div className='flex items-center space-x-8 pt-8'>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                <span className="text-gray-300 font-medium">Oyster</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                                <span className="text-gray-300 font-medium">40mm</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                                <span className="text-gray-300 font-medium">Yellow Gold</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Product Showcase */}
                    <div className='relative lg:ml-8'>
                        <div className='relative'>
                            {/* Main Product Image */}
                            <div className='relative bg-gray-900 rounded-3xl p-8 shadow-2xl border border-gray-700'>
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-3xl"></div>
                                <div className="relative z-10">
                                    <Image 
                                        className='w-full h-auto max-w-lg mx-auto drop-shadow-2xl' 
                                        src={assets.product_img12} 
                                        alt="Premium Watch" 
                                        priority
                                    />
                                </div>
                                
                                {/* Floating Elements */}
                                <div className="absolute top-8 left-8 bg-gray-800/80 rounded-xl p-3 shadow-lg animate-pulse-slow backdrop-blur-sm border border-gray-600">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span className="text-xs font-semibold text-white">In Stock</span>
                                    </div>
                                </div>
                                
                                <div className="absolute bottom-8 right-8 bg-yellow-500/90 rounded-xl p-3 shadow-lg backdrop-blur-sm">
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-black">50%</div>
                                        <div className="text-xs text-black font-semibold">OFF</div>
                                    </div>
                                </div>
                            </div>

                            {/* Secondary Product Cards */}
                            <div className='absolute -bottom-6 -left-6 bg-gray-800/90 rounded-2xl p-4 shadow-xl border border-gray-600 backdrop-blur-sm'>
                                <div className="flex items-center space-x-3">
                                    <Image className='w-12 h-12 rounded-lg object-cover' src={assets.hero_product_img1} alt="Product" />
                                    <div>
                                        <p className="font-semibold text-white text-sm">BEST PRODUCTS</p>
                                        <div className="flex items-center space-x-1 mt-1">
                                            <ArrowRightIcon size={12} className="text-yellow-500" />
                                            <span className="text-xs text-gray-400">VIEW MORE</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='absolute -top-6 -right-6 bg-gray-800/90 rounded-2xl p-4 shadow-xl border border-gray-600 backdrop-blur-sm'>
                                <div className="flex items-center space-x-3">
                                    <Image className='w-12 h-12 rounded-lg object-cover' src={assets.hero_product_img2} alt="Product" />
                                    <div>
                                        <p className="font-semibold text-white text-sm">DISCOUNTS</p>
                                        <div className="flex items-center space-x-1 mt-1">
                                            <ArrowRightIcon size={12} className="text-yellow-500" />
                                            <span className="text-xs text-gray-400">VIEW MORE</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Brands Section */}
            <div className="bg-gray-900/50 border-t border-gray-700 backdrop-blur-sm">
                <BrandsMarquee />
            </div>
        </div>
    )
}

export default Hero