// components/contact/ContactSection.tsx
import { Instagram, Phone, MessageCircle } from 'lucide-react';
import ContactForm from './ContactForm';
import { useTranslations } from 'next-intl';
import Title from '../shared/Title';

export default function ContactSection() {
  const t = useTranslations('common.contact.section');
  
  const contactDetails = [
    {
      icon: Instagram,
      titleKey: "instagram",
      description: "@trewatch_premium",
      accent: '#E4405F'
    },
    {
      icon: MessageCircle,
      titleKey: "whatsapp",
      description: "+996 770 220 555",
      accent: '#25D366'
    },
    {
      icon: Phone,
      titleKey: "phone",
      description: "+996 770 220 555",
      accent: '#FFD700'
    }
  ];

  return (
    <section className="section-padding bg-gray-800">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-yellow-500 tracking-wider mb-4">GET IN TOUCH</h2>
          <p className="text-gray-400 text-lg">Contact us for expert advice on premium timepieces</p>
        </div>
        
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side: Contact Details */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">Contact Information</h3>
              <p className="text-gray-300 leading-relaxed">
                We're here to help you find the perfect timepiece. Reach out to us through any of these channels for quick support and expert advice.
              </p>
            </div>
            
            <div className="space-y-4">
              {contactDetails.map((detail, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-4 p-6 bg-gray-900/50 rounded-2xl hover:shadow-lg transition-all duration-300 border border-gray-700 backdrop-blur-sm"
                >
                  <div
                    className="w-14 h-14 flex items-center justify-center rounded-xl shadow-lg"
                    style={{ backgroundColor: detail.accent }}
                  >
                    <detail.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-lg">{t(detail.titleKey)}</h4>
                    <p className="text-gray-400">{detail.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right side: Form */}
          <div className="bg-gray-900/50 rounded-3xl p-8 shadow-xl border border-gray-700 backdrop-blur-sm">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Send us a Message</h3>
                <p className="text-gray-400">Fill out the form below and we'll get back to you as soon as possible.</p>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}