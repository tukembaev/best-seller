'use client'

import { addToCart } from "@/lib/features/cart/cartSlice";
import { StarIcon, TagIcon, EarthIcon, CreditCardIcon, UserIcon } from "lucide-react";
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

    return (
        <div className="flex max-lg:flex-col gap-12">
            <div className="flex max-sm:flex-col-reverse gap-3">
                <div className="flex sm:flex-col gap-3">
                    {product.images.map((image, index) => (
                        <div key={index} onClick={() => handleImageClick(index)} className="bg-slate-100 flex items-center justify-center size-26 rounded-lg group cursor-pointer">
                            <Image src={image} className="group-hover:scale-103 group-active:scale-95 transition" alt="" width={45} height={45} />
                        </div>
                    ))}
                    {hasVideo && (
                        <div
                            onClick={() => handleImageClick(product.images.length)}
                            className="bg-slate-100 flex items-center justify-center size-26 rounded-lg group cursor-pointer relative overflow-hidden"
                        >
                            {/* Preview image as background */}
                            {videoPreview && (
                                <Image
                                    src={videoPreview}
                                    alt="Video preview"
                                    fill
                                    className="object-cover absolute inset-0 z-0"
                                    style={{ pointerEvents: 'none' }}
                                />
                            )}
                      
                            <svg className="w-8 h-8 text-white z-10 relative drop-shadow-lg group-hover:text-gray-200 transition" fill="currentColor" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="12" fill="rgba(0,0,0,0.45)" />
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    )}
                </div>
                <div className="flex justify-center items-center h-100 sm:size-113 bg-slate-100 rounded-lg relative overflow-hidden">
                    {isVideoMode && hasVideo ? (
                        <video 
                            ref={videoRef}
                            className={`w-full h-full rounded-lg ${isFullscreen ? 'object-contain' : 'object-cover'}`}
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
                        <Image src={mainImage} alt="" width={250} height={250} />
                    )}
                </div>
                
              
            </div>
            <div className="flex-1">
                <StockBadge status={product.inStock} />              

                <h1 className="text-3xl font-semibold text-slate-800">{product.brand?.name || 'Unknown Brand'}</h1>
                <h2 className="text-1xl font-semibold text-slate-800">{product.name}</h2>

                <div className='flex items-center m-1'>
                    {Array(5).fill('').map((_, index) => (
                        <StarIcon key={index} size={14} className='text-transparent mt-0.5' fill={averageRating >= index + 1 ? "#00C950" : "#D1D5DB"} />
                    ))}
                    <p className="text-sm ml-3 text-slate-500">{product.rating.length} Reviews</p>
                </div>
                
                <div className="border border-slate-200 rounded-lg p-5 bg-slate-50">
                    <h2 className="text-lg font-semibold text-slate-800 mb-3">Характеристики</h2>
                    <ul className="space-y-2 text-slate-600 text-sm">
                        {product.collection && (
                            <li className="flex justify-between">
                                <span>Коллекция</span> 
                                <span className="font-medium text-slate-800">{product.collection}</span>
                            </li>
                        )}
                        {product.mechanism && (
                            <li className="flex justify-between">
                                <span>Механизм</span> 
                                <span className="font-medium text-slate-800">{product.mechanism}</span>
                            </li>
                        )}
                        {product.gender && (
                            <li className="flex justify-between">
                                <span>Пол</span> 
                                <span className="font-medium text-slate-800">{product.gender}</span>
                            </li>
                        )}
                        {product.caseMaterial && (
                            <li className="flex justify-between">
                                <span>Материал корпуса</span> 
                                <span className="font-medium text-slate-800">{product.caseMaterial}</span>
                            </li>
                        )}
                        {product.caseSize && (
                            <li className="flex justify-between">
                                <span>Размер корпуса</span> 
                                <span className="font-medium text-slate-800">{product.caseSize}</span>
                            </li>
                        )}
                        {product.strapMaterial && (
                            <li className="flex justify-between">
                                <span>Материал ремешка</span> 
                                <span className="font-medium text-slate-800">{product.strapMaterial}</span>
                            </li>
                        )}
                        {product.waterResistance && (
                            <li className="flex justify-between">
                                <span>Водонепроницаемость</span> 
                                <span className="font-medium text-slate-800">{product.waterResistance}</span>
                            </li>
                        )}
                        <li className="flex justify-between">
                            <span>Категория</span> 
                            <span className="font-medium text-slate-800 capitalize">{product.category}</span>
                        </li>
                        <li className="flex justify-between">
                            <span>В наличии</span> 
                            <span className="font-medium text-slate-800">{product.stock} шт.</span>
                        </li>
                    </ul>
                </div>
                <div className="flex items-center my-4 gap-2">
                    <Price value={product.price} mrp={product.mrp} className="text-2xl" />
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                    <TagIcon size={14} />
                    <p>Save {((product.mrp - product.price) / product.mrp * 100).toFixed(0)}% right now</p>
                </div>
                <div className="flex items-end gap-5 mt-4">
                    {
                        cart[productId] && (
                            <div className="flex flex-col gap-3">
                                <p className="text-lg text-slate-800 font-semibold">Quantity</p>
                                <Counter productId={productId} />
                            </div>
                        )
                    }
                    <button onClick={() => !cart[productId] ? addToCartHandler() : router.push('/cart')} className="bg-slate-800 text-white px-10 py-3 text-sm font-medium rounded hover:bg-slate-900 active:scale-95 transition">
                        {!cart[productId] ? 'Add to Cart' : 'View Cart'}
                    </button>
                </div>
                <hr className="border-gray-300 my-5" />
                    <div className="flex-1 flex flex-col justify-start">
        <h3 className="text-lg font-semibold text-slate-700 mb-6">
          Вам также может понравиться
        </h3>
        <div className="flex flex-col gap-6">
          {mockSimilar.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-3 p-3 border border-slate-200 rounded-lg group"
            >
              {/* Top row (desktop: image+info+button) */}
              <div className="flex items-center gap-4 w-full">
                <Link
                  href={`/product/${item.id}`}
                  className="relative w-20 h-20 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain group-hover:scale-105 transition"
                  />
                </Link>
                <div className="flex-1">
                  <p className="text-slate-700 font-medium group-hover:text-slate-900 transition">
                    {item.name}
                  </p>
                  <Price value={item.price} className="text-sm text-slate-500" />
                </div>

              </div>

            </div>
          ))}
        </div>
      </div>
                {/* <div className="flex flex-col gap-4 text-slate-500">
                    <p className="flex gap-3"> <EarthIcon className="text-slate-400" /> Free shipping worldwide </p>
                    <p className="flex gap-3"> <CreditCardIcon className="text-slate-400" /> 100% Secured Payment </p>
                    <p className="flex gap-3"> <UserIcon className="text-slate-400" /> Trusted by top brands </p>
                </div> */}

            </div>
        </div>
    )
}

export default ProductDetails