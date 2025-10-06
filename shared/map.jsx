// components/Map2GIS.js
'use client'

import React, { useEffect, useRef } from "react"
import Script from "next/script"

export default function Map2GIS() {
  const containerRef = useRef(null)

  useEffect(() => {
    const cleanup = () => {
      if (containerRef.current) {
        const iframes = containerRef.current.querySelectorAll('iframe')
        iframes.forEach(iframe => {
          iframe.style.width = '100%'
          iframe.style.height = '400px'
          iframe.style.maxWidth = '100%'
          iframe.style.maxHeight = '400px'
        })
      }
    }

    const interval = setInterval(cleanup, 100)
    
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[400px] max-w-full overflow-hidden"
      style={{
        width: '100%',
        height: '400px',
        maxHeight: '400px',
        position: 'relative',
        overflow: 'hidden',
      }}
      id="dg-widget"
    >
      <Script
        src="https://widgets.2gis.com/js/DGWidgetLoader.js"
        strategy="afterInteractive"
        onLoad={() => {
          new window.DGWidgetLoader({
            width: "100%",
            height: "400",
            borderColor: "transparent",
            pos: { lat: 42.84891153394358, lon: 74.62343215942384, zoom: 14 },
            opt: { city: "bishkek" },
            org: [{ id: "70000001025950204" }],
            width: "100%",
            height: "400",
            wrapStyle: {
              width: "100%",
              height: "400px",
              position: "relative",
              overflow: "hidden"
            }
          })
        }}
      />
    </div>
  )
}
