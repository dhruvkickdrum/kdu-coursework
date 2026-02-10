import { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import Loading from '../components/Loading'
import ErrorState from '../components/ErrorState'
import { useProductContext } from '../context/ProductContext'


export default function Home() {
  const navigate = useNavigate()
  const {products, searchQuery, loading, searchLoading, error, fetchAllProducts, searchProducts} = useProductContext();
  const isSearching = useMemo(() => searchQuery.trim().length > 0, [searchQuery]);
  const isLoading = useMemo(() => loading || searchLoading, [loading, searchLoading]);

  const gridProducts = useMemo(() => products, [products]);

  const handleSelect = useCallback(
    (id: number) => {
      navigate(`/product/${id}`)
    },
    [navigate],
  )

  const handleRetry = useCallback(() => {
    if(isSearching) {
      void searchProducts(searchQuery.trim());
      return;
    }
    void fetchAllProducts();
  }, [fetchAllProducts, isSearching, searchProducts, searchQuery]);

  const emptyStateLabel = isSearching ? "No Results found.": "No Products Availble";

  return (
    <section className="page page-home">
      <div className="section-header">
        <div>
          <h1>{isSearching ? "Search results" : "Find the next standout product."}</h1>
          <p className="section-subtitle">
            {isSearching ? `Showing matched for "${searchQuery.trim()}".` : "Tap a card for deep details, pricing, and stock."}
          </p>
        </div>
        <div className="section-stat">
          <span className="section-stat_label">Total products</span>
          <span className="section-stat_value">{products.length}</span>
        </div>
      </div>

      {isLoading && <Loading label={isSearching ? "Searching Products...": "Loading Products..."} />}
      {error && <ErrorState message={error} actionLabel="Try again" onAction={handleRetry} />}

      {!isLoading && !error && gridProducts.length === 0 && (
        <div className="state">{emptyStateLabel}</div>
      )}

      {!isLoading && !error && gridProducts.length > 0 && (
        <div className="product-grid">
          {gridProducts.map((product) => (
            <ProductCard key={product.id} product={product} onSelect={handleSelect} />
          ))}
        </div>
      )}
    </section>
  )
}
