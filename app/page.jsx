import { Suspense } from "react"
import BestSellingServer from "@/components/home/BestSellingServer";
import Hero from "@/components/home/Hero";
import LatestProductsServer from "@/components/home/LatestProductsServer";
import Newsletter from "@/components/home/Newsletter";
import Loading from "@/components/shared/Loading";

export default function RootPage() {
  return (
    <div>
      <Hero />
      <Suspense fallback={<Loading />}>
        <LatestProductsServer />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <BestSellingServer />
      </Suspense>
      <Newsletter />
    </div>
  );
}
