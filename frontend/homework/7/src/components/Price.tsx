import { useMemo } from 'react'
import { calcDiscountedPrice, formatCurrency } from '../utils/format'

interface PriceProps {
  price: number
  discountPercentage: number
  size?: 'sm' | 'md' | 'lg'
}

// Component to show the price tag to each product with the sizes ( to show big tag or small tag) -> In Product car we use small tag and in product detail we use large tag so for both prices tags use the same component
export function Price({ price, discountPercentage, size = 'md' }: Readonly<PriceProps>) {
  const hasDiscount = useMemo(() => discountPercentage > 0, [discountPercentage])
  const discountedPrice = useMemo(
    () => calcDiscountedPrice(price, discountPercentage),
    [price, discountPercentage],
  )

  return (
    <div className={`price price-${size}`}>
      <span className="price_current">{formatCurrency(discountedPrice)}</span>
      {hasDiscount && (
        <>
          <span className="price_original">{formatCurrency(price)}</span>
          <span className="price_badge">{Math.round(discountPercentage)}% off</span>
        </>
      )}
    </div>
  )
}
