export interface Review {
  rating: number
  comment: string
  date: string
  reviewerName: string
  reviewerEmail: string
}

export interface ProductDimensions {
  width: number
  height: number
  depth: number
}

export interface ProductMeta {
  createdAt: string
  updatedAt: string
  barcode: string
  qrCode: string
}

export interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
  tags?: string[]
  sku?: string
  weight?: number
  dimensions?: ProductDimensions
  warrantyInformation?: string
  shippingInformation?: string
  availabilityStatus?: string
  reviews?: Review[]
  returnPolicy?: string
  minimumOrderQuantity?: number
  meta?: ProductMeta
}

export interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}
