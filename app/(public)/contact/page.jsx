
import ContactSection from '@/components/contact/ContactSection';
import ContactLocation from '@/components/contact/ContactLocation';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <ContactSection />
      <ContactLocation />
    </div>
  );
}