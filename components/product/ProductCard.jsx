'use client'
import { StarIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '@/lib/features/cart/cartSlice'
import Counter from '@/components/shared/Counter'

const ProductCard = ({ product }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    // Redux cart state
    const cart = useSelector(state => state.cart.cartItems)
    const dispatch = useDispatch()

    // calculate the average rating of the product
    const rating = product.rating && product.rating.length > 0 
        ? Math.round(product.rating.reduce((acc, curr) => acc + curr.rating, 0) / product.rating.length)
        : 0;

    // Get images array or default to empty array
    const images = product.images || []
    const hasMultipleImages = images.length > 1

    // Check if product is in cart
    const productInCart = useMemo(() => {
        return cart?.[product.id] || 0
    }, [cart, product.id])

    const handleDotClick = (index) => {
        setCurrentImageIndex(index)
    }

    const addToCartHandler = () => {
        dispatch(addToCart({ productId: product.id }))
    }

    return (
        <div className='group max-xl:mx-auto w-full'>
            <Link href={`/product/${product.id}`}>
                <div className='bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300'>
                    {/* Image Container */}
                    <div className='relative bg-gray-50 h-64 sm:h-72 flex items-center justify-center'>
                        {images.length > 0 ? (
                            <>
                                <Image 
                                    width={500} 
                                    height={500} 
                                    className='max-h-48 sm:max-h-56 w-auto group-hover:scale-105 transition-transform duration-300' 
                                    src={images[currentImageIndex]} 
                                    alt={product.name} 
                                />
                                
                                {/* Image Dots Navigation */}
                                {hasMultipleImages && (
                                    <div className='absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2'>
                                        {images.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    handleDotClick(index)
                                                }}
                                                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                                    index === currentImageIndex 
                                                        ? 'bg-gray-800' 
                                                        : 'bg-gray-400 hover:bg-gray-600'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className='text-gray-400 text-sm'>No image</div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className='p-4'>
                        {/* Brand */}
                        <div className='text-sm font-medium text-gray-600 mb-1'>
                            {product.brand?.name || 'Brand'}
                        </div>
                        
                        {/* Product Name */}
                        <div className='text-sm font-semibold text-gray-900 mb-2 line-clamp-2'>
                            {product.name}
                        </div>

                        {/* Rating */}
                        <div className='flex items-center mb-3'>
                            <div className='flex'>
                                {Array(5).fill('').map((_, index) => (
                                    <StarIcon 
                                        key={index} 
                                        size={14} 
                                        className='text-transparent' 
                                        fill={rating >= index + 1 ? "#FFD700" : "#D1D5DB"} 
                                    />
                                ))} 
                            </div>
                            <span className='text-xs text-gray-500 ml-1'>({rating})</span>
                        </div>

                        {/* Price */}
                        <div className='flex items-center space-x-2 mb-3'>
                            <span className='text-lg font-bold text-gray-900'>
                                {currency}{product.price}
                            </span>
                            {product.mrp && product.mrp > product.price && (
                                <span className='text-sm text-gray-500 line-through'>
                                    {currency}{product.mrp}
                                </span>
                            )}
                        </div>

                        {/* Add to Cart Button */}
                        <div className='flex items-center gap-2'>
                            {productInCart > 0 && (
                                <Counter productId={product.id} />
                            )}
                            <button 
                                onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    addToCartHandler()
                                }}
                                className='flex-1 bg-gray-800 text-white px-4 py-2 text-sm font-medium rounded hover:bg-gray-900 active:scale-95 transition'
                            >
                                {productInCart > 0 ? 'Added to Cart' : 'Add to Cart'}
                            </button>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default ProductCard