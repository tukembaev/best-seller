'use client'

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import { formatKGS, getTooltip } from '@/lib/utils/currency'
import { InfoIcon } from 'lucide-react'

export default function Price({ value, className, mrp, rates, disableTooltip }) {
  const [showTooltip, setShowTooltip] = useState(false)
  const pathname = usePathname()
  const isStore = pathname?.startsWith('/store')
  const enableTooltip = !disableTooltip && !isStore

  const priceText = formatKGS(value)
  const mrpText = mrp && mrp > value ? formatKGS(mrp) : null
  const tooltipText = enableTooltip ? getTooltip(value, rates) : null

  return (
    <span className={`inline-flex items-center gap-1.5 ${className || ''}`}>
      <span>
        <span className="font-bold text-white">{priceText}</span>
        {mrpText && (
          <span className="ml-2 text-sm text-gray-400 line-through">{mrpText}</span>
        )}
      </span>
      
      {/* Info Icon with Tooltip */}
      {enableTooltip && (
        <span 
          className="relative inline-flex"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <InfoIcon 
            size={18} 
            className="text-gray-400 hover:text-yellow-500 transition-colors cursor-help flex-shrink-0" 
          />
          
          {/* Tooltip */}
          {showTooltip && (
            <span className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm font-medium rounded-md shadow-lg whitespace-nowrap pointer-events-none border border-gray-600">
              {tooltipText}
              <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-gray-800"></span>
            </span>
          )}
        </span>
      )}
    </span>
  )
}


