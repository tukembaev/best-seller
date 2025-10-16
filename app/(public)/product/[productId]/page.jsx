import ProductDescription from "@/components/product/ProductDescription";
import ProductDetails from "@/components/product/ProductDetails";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/queries/products";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

export default async function Product({ params }) {
  const resolvedParams = await params;
  const { productId } = resolvedParams;
  const product = await getProductById(productId);
  if (!product) notFound();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
            <Home size={16} />
            <span>Home</span>
          </Link>
          <ChevronRight size={16} />
          <Link href="/shop" className="hover:text-blue-600 transition-colors">Products</Link>
          <ChevronRight size={16} />
          <span className="text-gray-900 font-medium">{product?.category}</span>
        </nav>

        {/* Product Details */}
        <ProductDetails product={product} />

        {/* Description & Reviews */}
        <ProductDescription product={product} />
      </div>
    </div>
  );
}