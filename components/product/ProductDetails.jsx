'use client'

import { addToCart } from "@/lib/features/cart/cartSlice";
import { StarIcon, TagIcon, ShoppingCart, Heart, Share2, Check, Truck, Shield, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import Counter from "../shared/Counter";
import Price from "@/components/shared/Price";
import { useDispatch, useSelector } from "react-redux";
import StockBadge from "@/components/shared/StockBadge";
import Link from "next/link";

const ProductDetails = ({ product }) => {
    const mockSimilar = [
        {
            id: 1,
            name: "Casio G-Shock GA-2100",
            price: 120,
            image: "https://swisstime-exclusive.kg/wp-content/uploads/2024/03/GA-2100FF-8AER.jpg",
        },
        {
            id: 2,
            name: "Seiko Prospex Diver",
            price: 240,
            image: "https://swisstime-exclusive.kg/wp-content/uploads/2024/03/GA-2100FF-8AER.jpg",
        },
        {
            id: 3,
            name: "Citizen Eco-Drive",
            price: 180,
            image: "https://swisstime-exclusive.kg/wp-content/uploads/2024/03/GA-2100FF-8AER.jpg",
        },
        {
            id: 4,
            name: "Tissot PRX Quartz",
            price: 350,
            image: "https://swisstime-exclusive.kg/wp-content/uploads/2024/03/GA-2100FF-8AER.jpg",
        },
    ]

    const productId = product.id;
    const cart = useSelector(state => state.cart.cartItems);
    const dispatch = useDispatch();
    const router = useRouter()

    const [mainImage, setMainImage] = useState(product.images[0]);
    const [isVideoMode, setIsVideoMode] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [posterUrl, setPosterUrl] = useState(null)
    const [isLiked, setIsLiked] = useState(false)
    const videoRef = useRef(null)
    
    // Мемоизируем количество товара в корзине
    const productInCart = useMemo(() => {
        return cart?.[productId] || 0
    }, [cart, productId]);

    const hasVideo = product.video && product.video.trim() !== '';
    const videoPreview = hasVideo ? product.images[0] : null;

    const handleImageClick = (imageIndex) => {
        if (imageIndex < product.images.length) {
            setMainImage(product.images[imageIndex]);
            setIsVideoMode(false);
        } else {
            // Video clicked
            setIsVideoMode(true);
        }
    };

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

    // Generate a poster frame (1s or middle for short videos) to avoid black preview
    useEffect(() => {
        if (!hasVideo || !product.video) return
        let cancelled = false
        const tempVideo = document.createElement('video')
        tempVideo.preload = 'auto'
        tempVideo.crossOrigin = 'anonymous'
        tempVideo.src = product.video
        tempVideo.muted = true

        const cleanup = () => {
            tempVideo.pause()
            tempVideo.removeAttribute('src')
            tempVideo.load()
        }

        const drawFrame = () => {
            if (cancelled) return
            const width = tempVideo.videoWidth
            const height = tempVideo.videoHeight
            if (!width || !height) return
            const canvas = document.createElement('canvas')
            canvas.width = width
            canvas.height = height
            const ctx = canvas.getContext('2d')
            if (!ctx) return
            ctx.drawImage(tempVideo, 0, 0, width, height)
            try {
                const dataUrl = canvas.toDataURL('image/jpeg', 0.86)
                if (!cancelled) setPosterUrl(dataUrl)
            } catch (_) {}
            cleanup()
        }

        const onLoadedMetadata = () => {
            const duration = tempVideo.duration || 0
            const targetTime = duration >= 2 ? 1 : Math.max(0, duration / 2)
            const trySeek = () => {
                try { tempVideo.currentTime = targetTime } catch (_) {}
            }
            if (tempVideo.readyState >= 2) {
                trySeek()
            } else {
                tempVideo.addEventListener('loadeddata', trySeek, { once: true })
            }
        }

        tempVideo.addEventListener('loadedmetadata', onLoadedMetadata)
        tempVideo.addEventListener('seeked', drawFrame)

        return () => {
            cancelled = true
            tempVideo.removeEventListener('loadedmetadata', onLoadedMetadata)
            tempVideo.removeEventListener('seeked', drawFrame)
            cleanup()
        }
    }, [hasVideo, product.video])

    const addToCartHandler = () => {
        dispatch(addToCart({ productId }))
    }

    const averageRating = product.rating.length > 0 
        ? product.rating.reduce((acc, item) => acc + item.rating, 0) / product.rating.length 
        : 0;

    const discountPercentage = product.mrp && product.mrp > product.price 
        ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
        : 0;

    const features = [
        { icon: Truck, text: "Free Shipping", color: "text-green-600" },
        { icon: Shield, text: "Secure Payment", color: "text-blue-600" },
        { icon: RotateCcw, text: "Easy Returns", color: "text-purple-600" },
    ];

    return (
        <div className="bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-700">
            <div className="grid lg:grid-cols-2 gap-12 p-8">
                {/* Left Side - Images */}
                <div className="space-y-6">
                    {/* Main Image */}
                    <div className="relative bg-gray-900 rounded-2xl p-8 h-96 flex items-center justify-center overflow-hidden border border-gray-600">
                        {isVideoMode && hasVideo ? (
                            <video 
                                ref={videoRef}
                                className={`w-full h-full rounded-xl ${isFullscreen ? 'object-contain' : 'object-cover'}`}
                                controls
                                autoPlay
                                playsInline
                                controlsList="nodownload"
                                poster={posterUrl || videoPreview}
                                onContextMenu={(e) => e.preventDefault()}
                            >
                                <source src={product.video} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <Image 
                                src={mainImage} 
                                alt={product.name} 
                                width={400} 
                                height={400} 
                                className="w-full h-full object-contain"
                            />
                        )}
                        
                        {/* Discount Badge */}
                        {discountPercentage > 0 && (
                            <div className="absolute top-4 left-4 bg-yellow-500 text-black text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                                -{discountPercentage}%
                            </div>
                        )}
                    </div>

                    {/* Thumbnail Images */}
                    <div className="flex gap-3 overflow-x-auto pb-2">
                        {product.images.map((image, index) => (
                            <div 
                                key={index} 
                                onClick={() => handleImageClick(index)} 
                                className={`flex-shrink-0 w-20 h-20 bg-gray-800 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-200 border-2 ${
                                    mainImage === image ? 'border-yellow-500' : 'border-transparent hover:border-gray-500'
                                }`}
                            >
                                <Image 
                                    src={image} 
                                    alt="" 
                                    width={60} 
                                    height={60} 
                                    className="w-full h-full object-contain rounded-lg"
                                />
                            </div>
                        ))}
                        {hasVideo && (
                            <div
                                onClick={() => handleImageClick(product.images.length)}
                                className={`flex-shrink-0 w-20 h-20 bg-gray-800 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-200 border-2 relative overflow-hidden ${
                                    isVideoMode ? 'border-yellow-500' : 'border-transparent hover:border-gray-500'
                                }`}
                            >
                                {videoPreview && (
                                    <Image
                                        src={videoPreview}
                                        alt="Video preview"
                                        fill
                                        className="object-cover absolute inset-0 z-0"
                                    />
                                )}
                                <div className="w-8 h-8 bg-black/50 rounded-full flex items-center justify-center z-10">
                                    <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Side - Product Info */}
                <div className="space-y-8">
                    {/* Header */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <StockBadge status={product.inStock} />
                            <div className="flex items-center space-x-2">
                                <button 
                                    onClick={() => setIsLiked(!isLiked)}
                                    className={`p-2 rounded-full transition-all duration-200 ${
                                        isLiked 
                                            ? 'bg-red-500 text-white' 
                                            : 'bg-gray-700 text-gray-400 hover:bg-red-500/20 hover:text-red-500'
                                    }`}
                                >
                                    <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
                                </button>
                                <button className="p-2 bg-gray-700 text-gray-400 rounded-full hover:bg-gray-600 hover:text-white transition-all duration-200">
                                    <Share2 size={20} />
                                </button>
                            </div>
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold text-yellow-500 mb-2">
                                {product.brand?.name || 'Unknown Brand'}
                            </h1>
                            <h2 className="text-3xl font-bold text-white mb-4">
                                {product.name}
                            </h2>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center">
                                {Array(5).fill('').map((_, index) => (
                                    <StarIcon 
                                        key={index} 
                                        size={18} 
                                        className={`${
                                            averageRating >= index + 1 
                                                ? 'text-yellow-400 fill-current' 
                                                : 'text-gray-500'
                                        }`} 
                                    />
                                ))}
                            </div>
                            <span className="text-gray-400 font-medium">
                                {averageRating.toFixed(1)} ({product.rating.length} reviews)
                            </span>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="space-y-2">
                        <Price value={product.price} mrp={product.mrp} className="text-4xl font-bold text-white" />
                        {discountPercentage > 0 && (
                            <div className="flex items-center space-x-2 text-green-400">
                                <TagIcon size={16} />
                                <span className="font-semibold">Save {discountPercentage}% right now</span>
                            </div>
                        )}
                    </div>

                    {/* Add to Cart */}
                    <div className="space-y-4">
                        {productInCart > 0 && (
                            <div className="flex items-center space-x-4">
                                <span className="text-gray-300 font-medium">Quantity:</span>
                                <Counter productId={productId} />
                            </div>
                        )}
                        <button 
                            onClick={() => !productInCart ? addToCartHandler() : router.push('/cart')} 
                            className="w-full btn-primary text-lg px-8 py-4 flex items-center justify-center space-x-2"
                        >
                            <ShoppingCart size={20} />
                            <span>{!productInCart ? 'Add to Cart' : 'View Cart'}</span>
                        </button>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-1 gap-4">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-xl border border-gray-600">
                                <feature.icon size={20} className="text-yellow-500" />
                                <span className="text-gray-300 font-medium">{feature.text}</span>
                            </div>
                        ))}
                    </div>

                    {/* Specifications */}
                    <div className="bg-gray-700/50 rounded-2xl p-6 border border-gray-600">
                        <h3 className="text-xl font-bold text-white mb-4">Specifications</h3>
                        <div className="grid grid-cols-1 gap-3">
                            {product.collection && (
                                <div className="flex justify-between py-2 border-b border-gray-600">
                                    <span className="text-gray-400">Collection</span>
                                    <span className="font-semibold text-white">{product.collection}</span>
                                </div>
                            )}
                            {product.mechanism && (
                                <div className="flex justify-between py-2 border-b border-gray-600">
                                    <span className="text-gray-400">Mechanism</span>
                                    <span className="font-semibold text-white">{product.mechanism}</span>
                                </div>
                            )}
                            {product.gender && (
                                <div className="flex justify-between py-2 border-b border-gray-600">
                                    <span className="text-gray-400">Gender</span>
                                    <span className="font-semibold text-white">{product.gender}</span>
                                </div>
                            )}
                            {product.caseMaterial && (
                                <div className="flex justify-between py-2 border-b border-gray-600">
                                    <span className="text-gray-400">Case Material</span>
                                    <span className="font-semibold text-white">{product.caseMaterial}</span>
                                </div>
                            )}
                            {product.caseSize && (
                                <div className="flex justify-between py-2 border-b border-gray-600">
                                    <span className="text-gray-400">Case Size</span>
                                    <span className="font-semibold text-white">{product.caseSize}</span>
                                </div>
                            )}
                            {product.strapMaterial && (
                                <div className="flex justify-between py-2 border-b border-gray-600">
                                    <span className="text-gray-400">Strap Material</span>
                                    <span className="font-semibold text-white">{product.strapMaterial}</span>
                                </div>
                            )}
                            {product.waterResistance && (
                                <div className="flex justify-between py-2 border-b border-gray-600">
                                    <span className="text-gray-400">Water Resistance</span>
                                    <span className="font-semibold text-white">{product.waterResistance}</span>
                                </div>
                            )}
                            <div className="flex justify-between py-2 border-b border-gray-600">
                                <span className="text-gray-400">Category</span>
                                <span className="font-semibold text-white capitalize">{product.category}</span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="text-gray-400">In Stock</span>
                                <span className="font-semibold text-white">{product.stock} pcs</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Similar Products */}
            <div className="border-t border-gray-600 p-8 bg-gray-800/50">
                <h3 className="text-2xl font-bold text-white mb-6">You might also like</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {mockSimilar.slice(0, 3).map((item) => (
                        <Link
                            key={item.id}
                            href={`/product/${item.id}`}
                            className="group bg-gray-700/50 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-600"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="w-20 h-20 bg-gray-800 rounded-xl overflow-hidden flex-shrink-0">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        width={80}
                                        height={80}
                                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-white group-hover:text-yellow-500 transition-colors duration-200">
                                        {item.name}
                                    </h4>
                                    <Price value={item.price} className="text-lg font-bold text-white" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProductDetails