import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ErrorState from '../components/ErrorState'
import ImageGallery from '../components/ImageGallery'
import Loading from '../components/Loading'
import Rating from '../components/Rating'
import { Price } from '../components/Price'
import { fetchProductById } from '../services/products'
import type { Product, Review } from '../types/product'

function formatDate(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return value
  }
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const productId = useMemo(() => Number(id), [id])

  const loadProduct = useCallback(async () => {
    if (!id || Number.isNaN(productId)) {
      setError('Invalid product ID.')
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      const data = await fetchProductById(productId)
      setProduct(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load product.')
      setProduct(null)
    } finally {
      setLoading(false)
    }
  }, [id, productId])

  useEffect(() => {
    void loadProduct()
  }, [loadProduct])

  const handleBack = useCallback(() => {
    navigate(-1)
  }, [navigate])

  if (loading) {
    return <Loading label="Loading product details..." />
  }

  if (error) {
    return <ErrorState message={error} actionLabel="Back" onAction={handleBack} />
  }

  if (!product) {
    return <ErrorState message="Product not found." actionLabel="Back" onAction={handleBack} />
  }

  const infoItems = [
    { label: 'SKU', value: product.sku },
    { label: 'Weight', value: product.weight ? `${product.weight} g` : undefined },
    {
      label: 'Dimensions',
      value: product.dimensions
        ? `${product.dimensions.width} | ${product.dimensions.height} | ${product.dimensions.depth} cm`
        : undefined,
    },
    { label: 'Warranty', value: product.warrantyInformation },
    { label: 'Shipping', value: product.shippingInformation },
    { label: 'Return Policy', value: product.returnPolicy },
    {
      label: 'Min Order',
      value: product.minimumOrderQuantity ? `${product.minimumOrderQuantity} units` : undefined,
    },
  ].filter((item) => item.value)

  const reviews = (product.reviews ?? []) as Review[]

  return (
    <section className="page page-details">
      <button className="btn btn-ghost" type="button" onClick={handleBack}>
        Back
      </button>
      <div className="details">
        <ImageGallery images={product.images} title={product.title} />
        <div className="details_content">
          <div className="details_meta">
            <span className="chip">{product.category}</span>
            <span className="chip chip-outline">{product.brand}</span>
            {product.availabilityStatus && <span className="chip chip-success">{product.availabilityStatus}</span>}
          </div>
          <h2>{product.title}</h2>
          <p className="details_description">{product.description}</p>
          <div className="details_price">
            <Price price={product.price} discountPercentage={product.discountPercentage} size="lg" />
            <div className="details_price-sub">
              <span className="details_label">Stock</span>
              <span className="details_value">{product.stock} units</span>
            </div>
          </div>
          <div className="details_stats">
            <div className="details_stat">
              <span className="details_stat-label">Rating</span>
              <Rating value={product.rating} />
            </div>
            <div className="details_stat">
              <span className="details_stat-label">Brand</span>
              <span className="details_stat-value">{product.brand}</span>
            </div>
            <div className="details_stat">
              <span className="details_stat-label">Category</span>
              <span className="details_stat-value">{product.category}</span>
            </div>
          </div>
          {product.tags && product.tags.length > 0 && (
            <div className="details_tags">
              {product.tags.map((tag) => (
                <span key={tag} className="chip chip-soft">
                  {tag}
                </span>
              ))}
            </div>
          )}
          {infoItems.length > 0 && (
            <div className="details_info">
              {infoItems.map((item) => (
                <div key={item.label}>
                  <span className="details_info-label">{item.label}</span>
                  <span>{item.value}</span>
                </div>
              ))}
            </div>
          )}
          {product.meta && (
            <div className="details_meta-panel">
              <div>
                <span className="details_info-label">Barcode</span>
                <span>{product.meta.barcode}</span>
              </div>
              <div>
                <span className="details_info-label">Created</span>
                <span>{formatDate(product.meta.createdAt)}</span>
              </div>
              <div>
                <span className="details_info-label">Updated</span>
                <span>{formatDate(product.meta.updatedAt)}</span>
              </div>
              {product.meta.qrCode && (
                <img className="details_qr" src={product.meta.qrCode} alt="Product QR" />
              )}
            </div>
          )}
        </div>
      </div>
      <div className="details_reviews">
        <div className="section-header">
          <div>
            <h3>Reviews</h3>
            <p className="section-subtitle">Authentic feedback from recent purchases.</p>
          </div>
          <div className="section-stat">
            <span className="section-stat_label">Total reviews</span>
            <span className="section-stat_value">{reviews.length}</span>
          </div>
        </div>
        {reviews.length === 0 ? (
          <div className="state">No reviews yet.</div>
        ) : (
          <div className="review-grid">
            {reviews.map((review, index) => (
              <article key={`${review.reviewerEmail}-${index}`} className="review-card">
                <div className="review-card_header">
                  <div>
                    <h4>{review.reviewerName}</h4>
                    <span>{review.reviewerEmail}</span>
                  </div>
                  <span className="review-card_date">{formatDate(review.date)}</span>
                </div>
                <div className="review-card_rating">
                  <Rating value={review.rating} />
                </div>
                <p className="review-card_comment">{review.comment}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
