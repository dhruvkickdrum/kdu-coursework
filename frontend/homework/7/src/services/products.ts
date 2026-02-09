import type { Product, ProductsResponse } from '../types/product'

const BASE_URL = 'https://dummyjson.com/products'

async function handleResponse<Products>(response: Response): Promise<Products> {
  if (!response.ok) {
    const message = `Request failed with status ${response.status}`
    throw new Error(message)
  }
  return (await response.json()) as Products
}

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(BASE_URL)
  const data = await handleResponse<ProductsResponse>(response)
  return data.products
}

export async function fetchProductById(id: number): Promise<Product> {
  const response = await fetch(`${BASE_URL}/${id}`)
  return await handleResponse<Product>(response)
}
