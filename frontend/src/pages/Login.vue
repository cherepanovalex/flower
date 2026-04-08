<template>
  <div class="container login-page">
    <h2>Вход / Регистрация</h2>
    
    <form v-if="!otpSent" @submit.prevent="requestOtp" class="login-form">
      <p>Введите email для получения кода (OTP)</p>
      <input type="email" v-model="email" required placeholder="hello@fleur.com" />
      <button type="submit">Получить код</button>
    </form>
    
    <form v-else @submit.prevent="verifyOtp" class="login-form">
      <p>Код отправлен на {{ email }}</p>
      <input type="text" v-model="code" required placeholder="123456" />
      <button type="submit">Войти</button>
      <a href="#" @click.prevent="otpSent = false">Изменить email</a>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store/user'

const email = ref('')
const code = ref('')
const otpSent = ref(false)
const router = useRouter()
const userStore = useUserStore()

const requestOtp = async () => {
  try {
    const response = await fetch('https://flower-rfww.onrender.com/auth/request-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value })
    })
    const data = await response.json()
    console.log('OTP request status:', data)
    otpSent.value = true
  } catch (err) {
    alert('Ошибка соединения с сервером')
  }
}

const verifyOtp = async () => {
  // POST /auth/verify-otp
  console.log('Verifying code', code.value)
  // Simulate successful login
  userStore.setToken('dummy-jwt-token')
  router.push('/')
}
</script>

<style scoped>
.login-page { padding: 60px 20px; max-width: 400px; margin: 0 auto; text-align: center; }
.login-form { display: flex; flex-direction: column; gap: 15px; margin-top: 30px; }
.login-form input { padding: 12px; border: 1px solid var(--border-color); text-align: center; font-size: 16px; }
.login-form a { font-size: 14px; text-decoration: underline; color: var(--light-text); }
</style>
