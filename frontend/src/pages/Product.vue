<template>
  <div class="container product-page">
    <div class="product-gallery">
      <img src="/images/peonies_bouquet_1775641302410.png" alt="Product" />
    </div>
    <div class="product-details">
      <h1>Нежный пион</h1>
      <p class="price">3 500 ₽</p>
      
      <div class="description-block">
        <h3>Состав</h3>
        <p>Пионы (5 шт), эвкалипт, крафтовая бумага, атласная лента.</p>
      </div>
      
      <div class="description-block">
        <h3>Размеры</h3>
        <p>Высота: 40 см | Ширина: 30 см</p>
      </div>

      <div class="description-block">
        <h3>Стойкость и уход</h3>
        <p>Стойкость до 7 дней. Меняйте воду ежедневно и подрезайте стебли под углом 45 градусов.</p>
      </div>
      
      <button @click="addToCart" class="add-to-cart-btn">Добавить в корзину</button>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../store/cart'

const cartStore = useCartStore()

const addToCart = () => {
  cartStore.add({
    id: 1, // mocked id
    name: 'Нежный пион',
    price: 3500,
    imageUrl: '/images/peonies_bouquet_1775641302410.png'
  })
}
</script>

<style scoped>
.product-page { display: flex; gap: 40px; padding: 40px 20px; flex-wrap: wrap; }
.product-gallery { flex: 1; min-width: 300px; }
.product-gallery img { width: 100%; height: auto; object-fit: cover; }
.product-details { flex: 1; min-width: 300px; }
.price { font-size: 24px; color: var(--accent-color); margin-bottom: 30px; font-weight: 500; }
.description-block { margin-bottom: 20px; }
.description-block h3 { font-size: 16px; margin-bottom: 5px; }
.description-block p { color: var(--light-text); }
.add-to-cart-btn { width: 100%; padding: 15px; font-size: 16px; margin-top: 20px; }
</style>
