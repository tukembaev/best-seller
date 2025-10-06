'use client'
import { useEffect, useState } from 'react'

export default function ProductListPlain() {
	const [items, setItems] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const run = async () => {
			try {
				const res = await fetch('/api/products', { cache: 'no-store' })
				const data = await res.json()
				if (!data.ok) throw new Error('Failed')
				setItems(data.data)
			} catch (e) {
				setError('Failed to load')
			} finally {
				setLoading(false)
			}
		}
		run()
	}, [])

	if (loading) return <div>Loading...</div>
	if (error) return <div>{error}</div>

	return (
		<ul>
			{items.map((p) => (
				<li key={p.id}>{p.name} — ${p.price}</li>
			))}
		</ul>
	)
}
