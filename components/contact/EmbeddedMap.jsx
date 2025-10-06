// Alternative map component using Google Maps embed
'use client'

export default function EmbeddedMap() {
  return (
    <div 
      className="w-full h-full rounded-xl overflow-hidden"
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1483.6!2d74.62432!3d42.84915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb777cfa47aad%3A0x53a9dc5a6e1b6d6!2z0KLQuNGC0LXQu9GB!5e0!3m2!1sru!2skg!4v1648451324000!5m2!1sru!2skg&z=14"
        width="100%"
        height="100%"
        style={{ 
          border: 0,
          borderRadius: '12px'
        }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  )
}
