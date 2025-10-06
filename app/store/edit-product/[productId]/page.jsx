import { getProductById } from "@/lib/queries/products"
import { getBrands } from "@/lib/queries/products"
import { notFound } from "next/navigation"
import EditProductClient from "./EditProductClient"

async function EditProductPage({ params }) {
    const { productId } = params

    try {
        const [product, brands] = await Promise.all([
            getProductById(productId),
            getBrands()
        ])

        if (!product) {
            notFound()
        }

        return (
            <EditProductClient 
                product={product} 
                brands={brands}
            />
        )
    } catch (error) {
        console.error('Error fetching product:', error)
        notFound()
    }
}

export default EditProductPage
