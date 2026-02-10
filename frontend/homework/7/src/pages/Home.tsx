import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import Loading from '../components/Loading'
import ErrorState from '../components/ErrorState'
import { fetchProducts } from '../services/products'
import type { Product } from '../types/product'


export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchProducts()
      setProducts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load products.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadProducts()
  }, [loadProducts])

  const gridProducts = useMemo(() => products, [products])

  const handleSelect = useCallback(
    (id: number) => {
      navigate(`/product/${id}`)
    },
    [navigate],
  )

  return (
    <section className="page page-home">
      <div className="section-header">
        <div>
          <h1>Find the next standout product.</h1>
          <p className="section-subtitle">
            Tap a card for deep details, pricing, and stock.
          </p>
        </div>
        <div className="section-stat">
          <span className="section-stat_label">Total products</span>
          <span className="section-stat_value">{products.length}</span>
        </div>
      </div>

      {loading && <Loading label="Loading products..." />}
      {error && <ErrorState message={error} actionLabel="Try again" onAction={loadProducts} />}

      {!loading && !error && (
        <div className="product-grid">
          {gridProducts.map((product) => (
            <ProductCard key={product.id} product={product} onSelect={handleSelect} />
          ))}
        </div>
      )}
    </section>
  )
}
