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
      description: "@bestseller_watches",
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
      accent: '#3B82F6'
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <Title
          title={t('title')}
          description={t('description')}
          visibleButton={false}
        />
        
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side: Contact Details */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Get in Touch</h3>
              <p className="text-gray-600 leading-relaxed">
                We're here to help you find the perfect timepiece. Reach out to us through any of these channels for quick support and expert advice.
              </p>
            </div>
            
            <div className="space-y-4">
              {contactDetails.map((detail, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-4 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl hover:shadow-lg transition-all duration-300 border border-gray-200"
                >
                  <div
                    className="w-14 h-14 flex items-center justify-center rounded-xl shadow-lg"
                    style={{ backgroundColor: detail.accent }}
                  >
                    <detail.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">{t(detail.titleKey)}</h4>
                    <p className="text-gray-600">{detail.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right side: Form */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 shadow-xl border border-gray-200">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('formTitle')}</h3>
                <p className="text-gray-600">{t('formDescription')}</p>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}