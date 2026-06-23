<template>
  <div class="product-card">
    <router-link :to="`/product/${product.id}`" class="product-link">
      <div class="product-image">
        <img :src="product.imageUrl || 'https://via.placeholder.com/300x400?text=Flower'" :alt="product.name" />
      </div>
      <div class="product-info">
        <h3 class="product-name">{{ product.name }}</h3>
        <p class="product-price">{{ product.price }} ₽</p>
      </div>
    </router-link>
    <div class="quantity-row">
      <div class="quantity-controls">
        <button class="qty-btn" @click.prevent="decrement" :disabled="quantity === 1" aria-label="Уменьшить">−</button>
        <span class="qty-value">{{ quantity }}</span>
        <button class="qty-btn" @click.prevent="increment" aria-label="Увеличить">+</button>
      </div>
      <button @click="addToCart" class="add-button">В корзину</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '../store/cart'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const cartStore = useCartStore()
const quantity = ref(1)

const increment = () => quantity.value++
const decrement = () => { if (quantity.value > 1) quantity.value-- }

const addToCart = () => {
  cartStore.add(props.product, quantity.value)
  quantity.value = 1
}
</script>

<style scoped>
.product-card {
  border-radius: 4px;
  box-shadow: 0 0 0 1px rgba(0,0,0,0.07);
  padding: 15px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
}
.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 0 1px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.06), 0 10px 24px rgba(0,0,0,0.06);
}
.product-image {
  width: 100%;
  aspect-ratio: 3/4;
  overflow: hidden;
  margin-bottom: 15px;
  position: relative;
}
.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}
.product-image::after {
  content: '';
  position: absolute;
  inset: 0;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.08);
  pointer-events: none;
}
.product-card:hover .product-image img {
  transform: scale(1.05);
}
.product-name {
  font-size: 18px;
  margin-bottom: 5px;
}
.product-price {
  font-size: 16px;
  color: var(--light-text);
  margin-bottom: 12px;
  font-variant-numeric: tabular-nums;
}
.quantity-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: auto;
}
.quantity-controls {
  display: flex;
  align-items: center;
  background: var(--secondary-color);
  border-radius: 6px;
  padding: 2px;
  gap: 2px;
  flex-shrink: 0;
}
.qty-btn {
  width: 40px;
  height: 40px;
  background: white;
  color: var(--text-color);
  border: none;
  padding: 0;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0;
  text-transform: none;
  transition: background-color 0.15s ease, transform 0.15s ease;
}
.qty-btn:hover {
  background: var(--border-color);
}
.qty-btn:active:not(:disabled) {
  transform: scale(0.96);
}
.qty-btn:disabled {
  opacity: 0.35;
  cursor: default;
}
.qty-value {
  width: 28px;
  text-align: center;
  font-size: 15px;
  font-family: var(--font-body);
  font-variant-numeric: tabular-nums;
  user-select: none;
}
.add-button {
  flex: 1;
  min-width: 0;
}
</style>
