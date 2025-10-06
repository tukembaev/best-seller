// components/about/AboutLocation.tsx
import Image from 'next/image';


export default function AboutLocation() {
  return (
    <section className="px-6 my-20 max-w-6xl mx-auto">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-semibold text-slate-800">Our Store Location</h2>
        <p className="max-w-lg text-center text-sm text-slate-600 mt-2">
          Visit us for an immersive shopping experience.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <Image
            src={'https://swisstime-exclusive.kg/wp-content/uploads/2021/12/veter-vremeni-butik.jpg'}
            alt="Store Interior"
            width={400}
            height={300}
            className="rounded-lg w-full max-w-md mx-auto"
          />
        </div>
        <div className="text-center md:text-left">
          <p className="text-slate-600 text-sm leading-relaxed">
            Our flagship store is conveniently located in the heart of the city at GUM Shopping Center on the 3rd floor. As you step off the escalator, turn right and you'll find our elegant vitrine showcasing the latest arrivals. We're open daily from 10 AM to 10 PM, ready to assist you in person with expert advice and exclusive in-store offers.
          </p>
        </div>
      </div>
    </section>
  );
}