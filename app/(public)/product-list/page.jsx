import ProductListPlain from "@/components/product/ProductListPlain";


export default function ProductListPage() {
	return (
		<div className="p-6">
			<h1 className="text-xl mb-4">All Products (from DB)</h1>
			<ProductListPlain />
		</div>
	)
}
