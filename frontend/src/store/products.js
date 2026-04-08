import { defineStore } from 'pinia'

const defaultProducts = [
  { id: 1, name: 'Royalty', price: 281300, imageUrl: '/images/roses_bouquet_1775641316261.png', category: 'kustovye-rozy', type: 'Моно-букет', color: 'Алый', composition: ['Кустовая роза'] },
  { id: 2, name: 'Sunset Reverie', price: 800000, imageUrl: '/images/peonies_bouquet_1775641302410.png', category: 'avtorskie', type: '', color: '', composition: [] },
  { id: 3, name: 'Hydrangeas 7', price: 33000, imageUrl: '/images/hero_flowers_1775641286421.png', category: 'gollandskie', type: '', color: 'Сиреневый', composition: [] },
  { id: 4, name: 'Julette 5.0', price: 71800, imageUrl: '/images/hatbox_flowers_1775641332248.png', category: 'kashpo', type: '', color: 'Алый', composition: ['Роза 40 см', 'Эвкалипт'] },
  { id: 5, name: 'Zhanym', price: 68000, imageUrl: '/images/dried_flowers_1775641363329.png', category: 'mono', type: 'Моно-букет', color: 'Сиреневый', composition: ['Джульетта'] },
]

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: JSON.parse(localStorage.getItem('products')) || defaultProducts
  }),
  actions: {
    addProduct(product) {
      this.products = [...this.products, { ...product, id: Date.now() }]
      this.saveProducts()
    },
    updateProduct(updatedProduct) {
      this.products = this.products.map(p => p.id === updatedProduct.id ? updatedProduct : p)
      this.saveProducts()
    },
    deleteProduct(id) {
      this.products = this.products.filter(p => p.id !== id)
      this.saveProducts()
    },
    saveProducts() {
      localStorage.setItem('products', JSON.stringify(this.products))
    }
  }
})
