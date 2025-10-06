import ProductCard from "@/components/product/ProductCard"
import { MailIcon, MapPinIcon } from "lucide-react"
import Image from "next/image"
import { getBrandBySlug } from "@/lib/queries/products"
import { notFound } from "next/navigation"

export default async function BrandPage({ params }) {
    const resolvedParams = await params;
    const { username } = resolvedParams; // This is actually the brand slug
    
    const brand = await getBrandBySlug(username);
    
    if (!brand) {
        notFound();
    }

    return (
        <div className="min-h-[70vh] mx-6">
            {/* Brand Info Banner */}
            <div className="max-w-7xl mx-auto bg-slate-50 rounded-xl p-6 md:p-10 mt-6 flex flex-col md:flex-row items-center gap-6 shadow-xs">
                {brand.logo && (
                    <Image
                        src={brand.logo}
                        alt={brand.name}
                        className="size-32 sm:size-38 border-2 border-slate-100 rounded-md object-contain"
                        width={200}
                        height={200}
                    />
                )}
                <div className="text-center md:text-left">
                    <h1 className="text-3xl font-semibold text-slate-800">{brand.name}</h1>
                    {brand.description && (
                        <p className="text-sm text-slate-600 mt-2 max-w-lg">{brand.description}</p>
                    )}
                    <div className="text-xs text-slate-500 mt-4 space-y-1">
                        <p>Founded: {new Date(brand.createdAt).getFullYear()}</p>
                        <p>Products: {brand.products.length} available</p>
                    </div>
                </div>
            </div>

            {/* Products */}
            <div className="max-w-7xl mx-auto mb-40">
                <h1 className="text-2xl mt-12 text-slate-800 font-medium">
                    {brand.name} <span className="text-slate-600 font-normal">Products</span>
                </h1>
                
                {brand.products.length > 0 ? (
                    <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 xl:gap-8">
                        {brand.products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="mt-8 text-center py-12">
                        <p className="text-slate-500 text-lg">No products available from this brand yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}