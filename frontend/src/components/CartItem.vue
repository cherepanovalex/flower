<template>
  <div class="cart-item">
    <div class="item-product-details">
      <img :src="item.product.imageUrl || 'https://via.placeholder.com/150'" :alt="item.product.name" class="cart-item-img" />
      <div class="item-info">
        <h4>{{ item.product.name }}</h4>
        <p class="price">{{ item.product.price }} ₽</p>
      </div>
    </div>
    <div class="item-actions">
      <button @click="updateQuantity(item.quantity - 1)">-</button>
      <span>{{ item.quantity }}</span>
      <button @click="updateQuantity(item.quantity + 1)">+</button>
      <button class="remove" @click="removeItem">Удалить</button>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../store/cart'

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const cartStore = useCartStore()

const updateQuantity = (qty) => {
  cartStore.updateQuantity(props.item.product.id, qty)
}

const removeItem = () => {
  cartStore.remove(props.item.product.id)
}
</script>

<style scoped>
.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid var(--border-color);
}
.item-product-details {
  display: flex;
  align-items: center;
  gap: 15px;
}
.cart-item-img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.08);
}
.item-info h4 {
  margin: 0 0 5px 0;
  font-size: 18px;
}
.item-info .price {
  margin: 0;
  color: var(--light-text);
  font-variant-numeric: tabular-nums;
}
.item-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}
.item-actions button {
  min-width: 40px;
  min-height: 40px;
  padding: 8px 10px;
  background: var(--secondary-color);
  color: var(--text-color);
  border: none;
  cursor: pointer;
  border-radius: 4px;
}
.item-actions button:hover {
  background: var(--border-color);
}
.item-actions button.remove {
  background: transparent;
  color: var(--light-text);
  transition: color 0.2s ease, transform 0.15s ease;
}
.item-actions button.remove:hover {
  color: #ff4d4f;
  background: transparent;
}
</style>
