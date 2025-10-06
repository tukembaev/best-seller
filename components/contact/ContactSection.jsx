// components/contact/ContactSection.tsx
import { Instagram, Phone, MessageCircle } from 'lucide-react';
import ContactForm from './ContactForm';


export default function ContactSection() {
  const contactDetails = [
    {
      icon: Instagram,
      title: "Instagram",
      description: "@watchhaven_official",
      accent: '#05DF72'
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      description: "+7 (495) 123-45-67",
      accent: '#FF8904'
    },
    {
      icon: Phone,
      title: "Phone",
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
            <h2 className="text-3xl font-semibold text-slate-800 mb-4">Contact Us</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              We're here to help you find the perfect timepiece. Whether you have questions about our collection, need sizing advice, or want to inquire about custom orders, our team is ready to assist. Reach out today via social media, call, or message for quick support.
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
                  <h3 className="font-medium text-slate-800">{detail.title}</h3>
                  <p className="text-sm text-slate-600">{detail.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Right side: Form */}
        <div className="lg:w-1/2">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Get in Touch</h3>
            <p className="text-sm text-slate-600 mb-6">Fill out the form below, and we'll get back to you within 24 hours.</p>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}