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
    <button @click="addToCart" class="add-button">В корзину</button>
  </div>
</template>

<script setup>
import { useCartStore } from '../store/cart'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const cartStore = useCartStore()

const addToCart = () => {
  cartStore.add(props.product)
}
</script>

<style scoped>
.product-card {
  border: 1px solid var(--border-color);
  padding: 15px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
}
.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.05);
}
.product-image {
  width: 100%;
  aspect-ratio: 3/4;
  overflow: hidden;
  margin-bottom: 15px;
}
.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
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
  margin-bottom: 15px;
}
.add-button {
  margin-top: auto;
  width: 100%;
}
</style>
