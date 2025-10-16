// components/about/AboutLocation.tsx
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Title from '../shared/Title';

export default function AboutLocation() {
  const t = useTranslations('common.about.location');

  return (
    <section className="section-padding bg-gray-900">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-yellow-500 tracking-wider mb-4">OUR LOCATION</h2>
          <p className="text-gray-400 text-lg">Visit our premium showroom for an exclusive experience</p>
        </div>
        
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="bg-gray-800/50 rounded-2xl p-8 shadow-lg border border-gray-700 backdrop-blur-sm">
              <p className="text-gray-300 leading-relaxed text-lg">
                Located in the heart of the city, our showroom offers a luxurious environment where you can explore our extensive collection of premium timepieces. Our expert staff is always ready to help you find the perfect watch.
              </p>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="bg-gray-800/50 rounded-2xl p-6 shadow-lg border border-gray-700 backdrop-blur-sm">
              <Image
                src={'https://swisstime-exclusive.kg/wp-content/uploads/2021/12/veter-vremeni-butik.jpg'}
                alt="Store Interior"
                width={400}
                height={300}
                className="w-full h-80 object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}