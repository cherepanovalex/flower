<template>
  <div class="container cart-page">
    <h2>Ваша корзина</h2>
    <div v-if="cartStore.items.length === 0" class="empty-cart">
      <p>Корзина пуста</p>
      <router-link to="/"><button>В каталог</button></router-link>
    </div>
    <div v-else class="cart-content">
      <div class="cart-items">
        <CartItem v-for="item in cartStore.items" :key="item.product.id" :item="item" />
      </div>
      <div class="cart-summary">
        <h3>Итого: {{ cartStore.totalPrice }} ₽</h3>
        <router-link to="/checkout"><button class="checkout-btn">Оформить заказ</button></router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../store/cart'
import CartItem from '../components/CartItem.vue'

const cartStore = useCartStore()
</script>

<style scoped>
.cart-page { padding: 40px 20px; }
.cart-content { display: flex; gap: 40px; margin-top: 20px; flex-wrap: wrap; }
.cart-items { flex: 2; min-width: 300px; }
.cart-summary { flex: 1; padding: 20px; background: var(--secondary-color); text-align: center; height: fit-content; min-width: 250px; }
.checkout-btn { width: 100%; margin-top: 20px; }
.empty-cart { text-align: center; margin-top: 40px; }
</style>
