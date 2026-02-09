import { useCallback } from 'react'
import type { Product } from '../types/product'
import Rating from './Rating'
import { Price } from './Price'

interface ProductCardProps {
  product: Product
  onSelect: (id: number) => void
}

// Component for the each product card
export default function ProductCard({ product, onSelect }: Readonly<ProductCardProps>) {
  const handleClick = useCallback(() => onSelect(product.id), [onSelect, product.id])

  return (
    <article
      className="product-card"
      role="button"
      tabIndex={0}
      onClick={handleClick}
    >
      <div className="product-card_media">
        <img src={product.thumbnail} alt={product.title} loading="lazy" />
      </div>
      <div className="product-card_body">
        <div className="product-card_meta">
          <span className="chip">{product.category}</span>
          <span className="product-card_brand">{product.brand}</span>
        </div>
        <h3 className="product-card_title">{product.title}</h3>
        <p className="product-card_description">{product.description}</p>
        <div className="product-card_footer">
          <Price price={product.price} discountPercentage={product.discountPercentage} size="sm" />
          <Rating value={product.rating} />
        </div>
      </div>
    </article>
  )
}
