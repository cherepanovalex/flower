import { defineStore } from 'pinia'

const API_URL = 'https://flower-rfww.onrender.com'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null, 
    orders: []
  }),
  actions: {
    setToken(token) {
      this.token = token
      localStorage.setItem('token', token)
    },
    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
    },
    async fetchOrders() {
      try {
        // Will fetch all orders for the admin, or user logic
        const res = await fetch(`${API_URL}/orders`)
        this.orders = await res.json()
      } catch (e) {
        console.error('Failed to fetch orders')
      }
    },
    async addOrder(orderData) {
      try {
        await fetch(`${API_URL}/orders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData)
        })
        await this.fetchOrders()
      } catch(e) {}
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.token
  }
})
