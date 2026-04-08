import { defineStore } from 'pinia'

const API_URL = 'https://flower-rfww.onrender.com'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: []
  }),
  actions: {
    async fetchProducts() {
      try {
        const res = await fetch(`${API_URL}/products`)
        this.products = await res.json()
      } catch (err) {
        console.error("Failed to fetch products", err)
      }
    },
    async addProduct(product) {
      await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      })
      await this.fetchProducts()
    },
    async updateProduct(updatedProduct) {
      await fetch(`${API_URL}/products/${updatedProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct)
      })
      await this.fetchProducts()
    },
    async deleteProduct(id) {
      await fetch(`${API_URL}/products/${id}`, { method: 'DELETE' })
      await this.fetchProducts()
    }
  }
})
