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

    const discountPercentage = product.mrp && product.mrp > product.price 
        ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
        : 0

    return (
        <div className='group max-xl:mx-auto w-full'>
            <Link href={`/product/${product.id}`}>
                <div className='product-card card-hover'>
                    {/* Image Container */}
                    <div className='relative bg-gradient-to-br from-gray-50 to-gray-100 h-72 flex items-center justify-center overflow-hidden'>
                        {/* Main Image/Video */}
                        {isVideoMode && hasVideo ? (
                            <video 
                                ref={videoRef}
                                className={`w-full h-full rounded-t-2xl ${isFullscreen ? 'object-contain' : 'object-cover'}`}
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
                                width={500} 
                                height={500} 
                                className='max-h-60 w-auto group-hover:scale-110 transition-transform duration-500' 
                                src={images[currentImageIndex]} 
                                alt={product.name} 
                            />
                        ) : (
                            <div className='text-gray-400 text-sm'>No image</div>
                        )}


                        {/* Discount Badge */}
                        {discountPercentage > 0 && (
                            <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                -{discountPercentage}%
                            </div>
                        )}

                        {/* Stock Badge */}
                        <div className="absolute top-4 right-4">
                            <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                product.inStock 
                                    ? 'bg-green-100 text-green-700' 
                                    : 'bg-red-100 text-red-700'
                            }`}>
                                {product.inStock ? 'In Stock' : 'Out of Stock'}
                            </div>
                        </div>
                    </div>
                    
                    {/* Navigation Dots */}
                    {(hasMultipleImages || hasVideo) && (
                        <div className='flex justify-center space-x-2 py-3 bg-gray-50'>
                            {images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        handleDotClick(index)
                                    }}
                                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                        index === currentImageIndex && !isVideoMode
                                            ? 'bg-blue-600' 
                                            : 'bg-gray-300 hover:bg-gray-500'
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
                                            ? 'bg-blue-600' 
                                            : 'bg-gray-300 hover:bg-gray-500'
                                    }`}
                                    title="Video"
                                />
                            )}
                        </div>
                    )}

                    {/* Product Info */}
                    <div className='p-6 space-y-4'>
                        {/* Brand */}
                        <div className='text-sm font-semibold text-blue-600 uppercase tracking-wide'>
                            {product.brand?.name || 'Brand'}
                        </div>
                        
                        {/* Product Name */}
                        <div className='text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200'>
                            {product.name}
                        </div>

                        {/* Rating */}
                        <div className='flex items-center space-x-2'>
                            <div className='flex'>
                                {Array(5).fill('').map((_, index) => (
                                    <StarIcon 
                                        key={index} 
                                        size={16} 
                                        className={`${
                                            rating >= index + 1 
                                                ? 'text-yellow-400 fill-current' 
                                                : 'text-gray-300'
                                        }`} 
                                    />
                                ))} 
                            </div>
                            <span className='text-sm text-gray-500'>({rating})</span>
                            <span className='text-sm text-gray-400'>•</span>
                            <span className='text-sm text-gray-500'>{product.rating?.length || 0} reviews</span>
                        </div>

                        {/* Price */}
                        <div className='flex items-center space-x-3'>
                            <Price value={product.price} mrp={product.mrp} className="text-xl font-bold text-gray-900" />
                        </div>

                        {/* Add to Cart Button */}
                        <div className='flex items-center gap-3'>
                            {productInCart > 0 && (
                                <Counter productId={product.id} />
                            )}
                            <button 
                                onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    addToCartHandler()
                                }}
                                className={`flex-1 py-3 px-4 text-sm font-semibold rounded-xl transition-all duration-200 ${
                                    productInCart > 0
                                        ? 'bg-green-500 text-white hover:bg-green-600'
                                        : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                                }`}
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