import { getAllProductsWithRelations } from "@/lib/queries/products"
import { ProductManageClient } from "./ProductManageClient"

async function StoreManageProducts() {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    try {
        const products = await getAllProductsWithRelations()

        return (
            <>
                <h1 className="text-2xl text-slate-500 mb-5">Manage <span className="text-slate-800 font-medium">Products</span></h1>
                <ProductManageClient products={products} currency={currency} />
            </>
        )
    } catch (error) {
        console.error('Error fetching products:', error)
        return (
            <>
                <h1 className="text-2xl text-slate-500 mb-5">Manage <span className="text-slate-800 font-medium">Products</span></h1>
                <div className="text-center text-red-500 py-8">
                    Failed to load products. Please try again later.
                </div>
            </>
        )
    }
}

export default StoreManageProducts