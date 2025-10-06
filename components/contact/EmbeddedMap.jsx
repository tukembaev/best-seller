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
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2924.123456789!2d74.6117707!3d42.8747193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb7c7183e64fd%3A0xcaecbea5330d61ee!2sBESTSELLER.KG!5e0!3m2!1sen!2skg!4v1234567890123!5m2!1sen!2skg"
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
