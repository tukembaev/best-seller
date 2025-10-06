import ProductDescription from "@/components/product/ProductDescription";
import ProductDetails from "@/components/product/ProductDetails";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/queries/products";

export default async function Product({ params }) {
  const resolvedParams = await params;
  const { productId } = resolvedParams;
  const product = await getProductById(productId);
  if (!product) notFound();
  return (
    <div className="mx-6">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <div className="text-gray-600 text-sm mt-8 mb-5">
          Home / Products / {product?.category}
        </div>

        {/* Product Details */}
        <ProductDetails product={product} />

        {/* Description & Reviews */}
        <ProductDescription product={product} />
      </div>
    </div>
  );
}