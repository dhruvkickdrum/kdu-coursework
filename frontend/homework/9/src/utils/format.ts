const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
})

export function formatCurrency(value: number): string {
  return currencyFormatter.format(value)
}

export function calcDiscountedPrice(price: number, discountPercentage: number): number {
  if (discountPercentage <= 0) {
    return price
  }
  const discount = Math.min(100, Math.max(0, discountPercentage))
  return Number((price * (1 - discount / 100)).toFixed(2))
}

export function formatDate(value: string) {
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