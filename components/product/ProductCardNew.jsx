'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Price from '@/components/shared/Price'

const ProductCardNew = ({ product }) => {
    
    const images = product.images || []

    return (
        <div className='max-xl:mx-auto'>
            <Link href={`/product/${product.id}`}>
                <div className='bg-white rounded-2xl overflow-hidden'>
                    {/* Image Container - Full bleed image */}
                    <div className='relative h-64 sm:h-72 flex items-center justify-center bg-gray-50'>
                        {images.length > 0 ? (
                            <Image 
                                width={500} 
                                height={500} 
                                className='w-full h-full object-cover' 
                                src={images[0]} 
                                alt={product.name} 
                            />
                        ) : (
                            <div className='text-gray-400 text-sm'>No image</div>
                        )}
                    </div>

                    {/* Product Info - White area at bottom */}
                    <div className='bg-white p-4'>
                        {/* Product Name - Bold, black font */}
                        <div className='text-lg font-bold text-black mb-1'>
                            {product.name}
                        </div>
                        
                        {/* Category - Smaller, light grey font */}
                        <div className='text-sm text-gray-400 mb-2'>
                            {product.brand?.name || 'Category'}
                        </div>

                        {/* Price - Purple/blue color, right aligned */}
                        <div className='flex justify-end'>
                            <Price value={product.price} className='text-lg font-bold text-purple-600' />
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default ProductCardNew
