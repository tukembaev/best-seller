import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Title = ({ title, description, visibleButton = true, href = '', buttonLabel = 'View more' }) => {
    return (
        <div className='text-center space-y-8'>
            {/* Main Title */}
            <div className="space-y-2">
                <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight'>
                    {title}
                </h2>
                
                {/* Description */}
                {description && (
                    <div className="max-w-3xl mx-auto">
                        <p className='text-xl text-gray-600 leading-relaxed'>
                            {description}
                        </p>
                    </div>
                )}
            </div>

            {/* CTA Button */}
            {visibleButton && href && (
               
                    <Link href={href}>
                        <button className="group inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                            <span>{buttonLabel}</span>
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
                        </button>
                    </Link>
               
            )}
        </div>
    )
}

export default Title