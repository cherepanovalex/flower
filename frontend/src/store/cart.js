import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('cart')) || []
  }),
  actions: {
    add(product) {
      const existingItem = this.items.find(item => item.product.id === product.id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        this.items.push({ product, quantity: 1 })
      }
      this.saveCart()
    },
    remove(productId) {
      this.items = this.items.filter(item => item.product.id !== productId)
      this.saveCart()
    },
    updateQuantity(productId, quantity) {
      const item = this.items.find(item => item.product.id === productId)
      if (item && quantity > 0) {
        item.quantity = quantity
      } else if (item && quantity === 0) {
        this.remove(productId)
      }
      this.saveCart()
    },
    clear() {
      this.items = []
      this.saveCart()
    },
    saveCart() {
      localStorage.setItem('cart', JSON.stringify(this.items))
    }
  },
  getters: {
    totalItems: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: (state) => state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  }
})
