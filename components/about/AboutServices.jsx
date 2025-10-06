// components/about/AboutServices.tsx
import { SendIcon, ClockFadingIcon, HeadsetIcon } from 'lucide-react';

const services = [
  {
    title: "Free Shipping",
    description: "Enjoy complimentary delivery on all orders over $50, straight to your door with reliable tracking.",
    icon: SendIcon,
    accent: '#05DF72'
  },
  {
    title: "Quality Control",
    description: "Every watch is meticulously inspected by our experts to ensure flawless performance and authenticity.",
    icon: ClockFadingIcon,
    accent: '#FF8904'
  },
  {
    title: "24/7 Support",
    description: "Our dedicated team is always available to answer questions and make your shopping seamless.",
    icon: HeadsetIcon,
    accent: '#A684FF'
  }
];

export default function AboutServices() {
  return (
    <section className="px-6 my-20 max-w-6xl mx-auto">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-semibold text-slate-800">Our Services</h2>
        <p className="max-w-lg text-center text-sm text-slate-600 mt-2">
          Committed to your satisfaction with premium perks.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mt-12">
        {services.map((service, index) => (
          <div
            key={index}
            className="relative h-44 px-8 flex flex-col items-center justify-center w-full text-center border rounded-lg group"
            style={{
              backgroundColor: `rgba(${service.accent === '#05DF72' ? '5,223,114' : service.accent === '#FF8904' ? '255,137,4' : '166,132,255'}, 0.063)`,
              borderColor: `rgba(${service.accent === '#05DF72' ? '5,223,114' : service.accent === '#FF8904' ? '255,137,4' : '166,132,255'}, 0.19)`
            }}
          >
            <div
              className="absolute -top-5 text-white size-10 flex items-center justify-center rounded-md group-hover:scale-105 transition"
              style={{ backgroundColor: service.accent }}
            >
              <service.icon className="w-5 h-5" />
            </div>
            <h3 className="text-slate-800 font-medium">{service.title}</h3>
            <p className="text-sm text-slate-600 mt-3">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}