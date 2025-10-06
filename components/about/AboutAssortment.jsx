// components/about/AboutAssortment.tsx
import { assets } from '@/assets/assets';
import Image from 'next/image';


export default function AboutAssortment() {
  return (
    <section className="px-6 my-20 max-w-6xl mx-auto">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-semibold text-slate-800">Wide Assortment of Watches</h2>
        <p className="max-w-lg text-center text-sm text-slate-600 mt-2">
          Explore our extensive collection of luxury and everyday timepieces.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col items-center md:items-start">
          <Image
            src={'https://iflwatches.com/cdn/shop/articles/thumbnail-1704375617992_54af31a8-c6cd-4821-84e6-ff99775e7f25.jpg?v=1714386348&width=1000'}
            alt="Watch Collection"
            width={400}
            height={300}
            className="rounded-lg mb-4 w-full max-w-md"
          />
          <p className="text-slate-600 text-sm leading-relaxed">
            Watch Haven is a premier store specializing in high-quality watches. Our wide assortment includes everything from classic mechanical masterpieces to modern smartwatches, ensuring there's a perfect timepiece for every style, occasion, and budget. Whether you're seeking elegance for formal events or durability for daily wear, our curated selection features renowned brands and unique designs that stand the test of time.
          </p>
        </div>
        <div className="flex flex-col items-center md:items-end">
          <Image
            src={assets.watch_1}
            alt="Diverse Watch Range"
            width={400}
            height={300}
            className="rounded-lg mb-4 w-full max-w-md"
          />
          <p className="text-slate-600 text-sm leading-relaxed">
            With over 500 models in stock, we cater to watch enthusiasts and casual buyers alike. From vintage-inspired pieces to cutting-edge innovations, our assortment guarantees variety and excellence.
          </p>
        </div>
      </div>
    </section>
  );
}