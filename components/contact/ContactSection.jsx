// components/contact/ContactSection.tsx
import { Instagram, Phone, MessageCircle } from 'lucide-react';
import ContactForm from './ContactForm';
import { useTranslations } from 'next-intl';


export default function ContactSection() {
  const t = useTranslations('common.contact.section');
  
  const contactDetails = [
    {
      icon: Instagram,
      titleKey: "instagram",
      description: "@watchhaven_official",
      accent: '#05DF72'
    },
    {
      icon: MessageCircle,
      titleKey: "whatsapp",
      description: "+7 (495) 123-45-67",
      accent: '#FF8904'
    },
    {
      icon: Phone,
      titleKey: "phone",
      description: "+7 (495) 123-45-67",
      accent: '#A684FF'
    }
  ];

  return (
    <section className="px-6 my-20 max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left side: Description + Contacts */}
        <div className="lg:w-1/2 space-y-6">
          <div>
            <h2 className="text-3xl font-semibold text-slate-800 mb-4">{t('title')}</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              {t('description')}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {contactDetails.map((detail, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition"
              >
                <div
                  className="size-10 flex items-center justify-center rounded-md"
                  style={{ backgroundColor: detail.accent }}
                >
                  <detail.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-slate-800">{t(detail.titleKey)}</h3>
                  <p className="text-sm text-slate-600">{detail.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Right side: Form */}
        <div className="lg:w-1/2">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">{t('formTitle')}</h3>
            <p className="text-sm text-slate-600 mb-6">{t('formDescription')}</p>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}