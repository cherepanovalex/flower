<template>
  <div class="app-wrapper">
    <header class="header container">
      <router-link to="/" class="logo-link">
        <img src="/images/flower_shop_logo_1775641270034.png" alt="Fleur Logo" class="logo-img" />
      </router-link>
      <nav class="header-nav">
        <router-link to="/catalog">Каталог</router-link>
        <router-link to="/cart">Корзина ({{ cartStore.totalItems }})</router-link>
        <router-link to="/admin" v-if="userStore.isAuthenticated">Админ</router-link>
        <router-link to="/login" v-if="!userStore.isAuthenticated">Войти</router-link>
        <a href="#" @click.prevent="userStore.logout" v-else>Выйти</a>
      </nav>
    </header>

    <main>
      <router-view />
    </main>

    <footer class="footer container">
      <div class="footer-contacts">
        <h3>Контакты</h3>
        <p>WhatsApp: <a href="https://wa.me/1234567890">+1 234 567 890</a></p>
        <p>Telegram: <a href="https://t.me/flowershop">@flowershop</a></p>
      </div>
      <div class="footer-map">
        <!-- Map placeholder -->
        <div class="map-placeholder">Карта (Москва, ул. Цветочная, 1)</div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useCartStore } from './store/cart'
import { useUserStore } from './store/user'

const cartStore = useCartStore()
const userStore = useUserStore()
</script>

<style scoped>
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
main {
  flex: 1;
}
.footer {
  margin-top: 60px;
  padding: 40px 20px;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
}
.map-placeholder {
  width: 300px;
  height: 150px;
  background: var(--secondary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--light-text);
}
</style>
<style>
.logo-img {
  height: 60px;
  object-fit: contain;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
