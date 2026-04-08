import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null, 
    orders: JSON.parse(localStorage.getItem('myOrders')) || []
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
    addOrder(order) {
      this.orders.unshift(order)
      localStorage.setItem('myOrders', JSON.stringify(this.orders))
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.token
  }
})
