<template>
  <div class="container checkout-page">
    <h2>Оформление заказа</h2>
    <form @submit.prevent="submitOrder" class="checkout-form">
      <div class="form-group">
        <label>Имя получателя</label>
        <input type="text" v-model="form.recipientName" required placeholder="Мария" />
      </div>
      <div class="form-group">
        <label>Телефон получателя</label>
        <input type="tel" v-model="form.recipientPhone" required placeholder="+7 999 000-00-00" />
      </div>
      <div class="form-group">
        <label>Текст для записки</label>
        <textarea v-model="form.noteText" rows="3" placeholder="С любовью..."></textarea>
      </div>
      <div class="form-group">
        <label>Время доставки</label>
        <select v-model="form.deliveryTime">
          <option value="10:00-12:00">10:00 - 12:00</option>
          <option value="12:00-14:00">12:00 - 14:00</option>
          <option value="14:00-16:00">14:00 - 16:00</option>
          <option value="16:00-18:00">16:00 - 18:00</option>
        </select>
      </div>
      <div class="form-group checkbox">
        <input type="checkbox" id="anon" v-model="form.anonymous" />
        <label for="anon">Анонимная доставка</label>
      </div>
      <div class="summary">
        <h3>К оплате: {{ cartStore.totalPrice }} ₽</h3>
        <button type="submit" :disabled="isSubmitting">Заказать</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../store/cart'

import { useUserStore } from '../store/user'

const cartStore = useCartStore()
const userStore = useUserStore()
const router = useRouter()

const form = ref({
  recipientName: '',
  recipientPhone: '',
  noteText: '',
  deliveryTime: '10:00-12:00',
  anonymous: false
})

const isSubmitting = ref(false)

const submitOrder = async () => {
  isSubmitting.value = true
  const orderData = {
    id: Math.floor(1000 + Math.random() * 9000), // Mock receipt ID
    date: new Date().toLocaleDateString('ru-RU'),
    ...form.value,
    items: cartStore.items.map(i => ({ product: i.product, quantity: i.quantity })),
    totalPrice: cartStore.totalPrice
  }
  
  // Save locally to user profile
  userStore.addOrder(orderData)
  console.log('Submitting order:', orderData)
  
  setTimeout(() => {
    alert('Заказ успешно оформлен!')
    cartStore.clear()
    router.push('/profile')
    isSubmitting.value = false
  }, 1000)
}
</script>

<style scoped>
.checkout-page { padding: 40px 20px; max-width: 600px; margin: 0 auto; }
.form-group { margin-bottom: 20px; display: flex; flex-direction: column; }
.form-group label { margin-bottom: 5px; font-weight: 500; }
.form-group input, .form-group textarea, .form-group select {
  padding: 10px; border: 1px solid var(--border-color); font-family: var(--font-body);
}
.form-group.checkbox { flex-direction: row; align-items: center; gap: 10px; }
.summary { margin-top: 30px; padding-top: 20px; border-top: 1px solid var(--border-color); text-align: right; }
.summary button { margin-top: 15px; }
</style>
