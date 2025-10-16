'use client'
import { StarIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useMemo, useEffect, useRef } from 'react'
import Price from '@/components/shared/Price'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '@/lib/features/cart/cartSlice'
import Counter from '@/components/shared/Counter'

const ProductCard = ({ product }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [isVideoMode, setIsVideoMode] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const videoRef = useRef(null)
    

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
    const hasVideo = product.video && product.video.trim() !== ''
    
    // Create video preview image path (assuming video is MP4, we'll use first image as preview)
    const videoPreview = hasVideo ? images[0] : null

    // Check if product is in cart
    const productInCart = useMemo(() => {
        return cart?.[product.id] || 0
    }, [cart, product.id])

    const handleDotClick = (index) => {
        if (index < images.length) {
            setCurrentImageIndex(index)
            setIsVideoMode(false)
        } else {
            // Video dot clicked
            setIsVideoMode(true)
        }
    }

    useEffect(() => {
        const onFullscreenChange = () => {
            setIsFullscreen(Boolean(document.fullscreenElement))
        }
        document.addEventListener('fullscreenchange', onFullscreenChange)
        document.addEventListener('webkitfullscreenchange', onFullscreenChange)
        document.addEventListener('mozfullscreenchange', onFullscreenChange)
        document.addEventListener('MSFullscreenChange', onFullscreenChange)
        return () => {
            document.removeEventListener('fullscreenchange', onFullscreenChange)
            document.removeEventListener('webkitfullscreenchange', onFullscreenChange)
            document.removeEventListener('mozfullscreenchange', onFullscreenChange)
            document.removeEventListener('MSFullscreenChange', onFullscreenChange)
        }
    }, [])

    const addToCartHandler = () => {
        dispatch(addToCart({ productId: product.id }))
    }

    return (
        <div className='group max-xl:mx-auto w-full'>
            <Link href={`/product/${product.id}`}>
                <div className='bg-white relative overflow-hidden'>
                    {/* Image Container with Brand Background */}
                    <div className='relative bg-white h-80 sm:h-96 flex items-center justify-center'>
                        {/* Brand Background Logo */}
                        <div className='absolute inset-0 flex items-center justify-center opacity-5'>
                            <div className='text-8xl font-bold text-gray-300 select-none'>
                                {product.brand?.name?.charAt(0) || 'B'}
                            </div>
                        </div>
                        
                        {/* Vertical Brand Name */}
                        <div className='absolute left-4 top-1/2 transform -translate-y-1/2'>
                            <div className='text-gray-300 text-sm font-light tracking-wider transform -rotate-90 whitespace-nowrap'>
                                {/* {product.brand?.name || 'BRAND'} */}
                            </div>
                        </div>

                        {/* Product Image */}
                        <div className='relative z-10 flex items-center justify-center'>
                            {isVideoMode && hasVideo ? (
                                <video 
                                    ref={videoRef}
                                    className={`w-full h-full ${isFullscreen ? 'object-contain' : 'object-cover'}`}
                                    controls
                                    autoPlay
                                    playsInline
                                    poster={videoPreview}
                                >
                                    <source src={product.video} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            ) : images.length > 0 ? (
                                <Image 
                                    width={400} 
                                    height={400} 
                                    className='max-h-64 sm:max-h-80 w-auto group-hover:scale-105 transition-transform duration-500' 
                                    src={images[currentImageIndex]} 
                                    alt={product.name} 
                                />
                            ) : (
                                <div className='text-gray-400 text-sm'>No image</div>
                            )}
                        </div>
                    </div>
                    
                    {/* Navigation Dots */}
                    {(hasMultipleImages || hasVideo) && (
                        <div className='flex justify-center space-x-2 py-3'>
                            {images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        handleDotClick(index)
                                    }}
                                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                        index === currentImageIndex && !isVideoMode
                                            ? 'bg-gray-800' 
                                            : 'bg-gray-300 hover:bg-gray-600'
                                    }`}
                                />
                            ))}
                            {hasVideo && (
                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        handleDotClick(images.length)
                                    }}
                                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                        isVideoMode
                                            ? 'bg-gray-800' 
                                            : 'bg-gray-300 hover:bg-gray-600'
                                    }`}
                                    title="Video"
                                />
                            )}
                        </div>
                    )}

                    {/* Product Info */}
                    <div className='px-6 pb-6'>
                        {/* Product Name */}
                        <div className='text-lg font-bold text-gray-900 mb-1 text-center'>
                            {product.brand?.name}
                        </div>
                        
                        {/* Model/Description */}
                        <div className='text-sm text-gray-600 mb-4 text-center'>
                            {product.name}
                        </div>

                        {/* Price */}
                        <div className='flex justify-center mb-4'>
                            <Price value={product.price} mrp={product.mrp} />
                        </div>

                        {/* Add to Cart Button */}
                        <div className='flex items-center justify-center gap-2'>
                            {productInCart > 0 && (
                                <Counter productId={product.id} />
                            )}
                            <button 
                                onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    addToCartHandler()
                                }}
                                className='bg-gray-900 text-white px-6 py-2 text-sm font-medium hover:bg-gray-800 active:scale-95 transition-all duration-200'
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