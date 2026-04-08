<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1>Элегантность в каждом букете</h1>
        <p>Доставка свежих цветов в течение 2х часов</p>
        <button @click="scrollToCatalog">Выбрать букет</button>
      </div>
    </section>

    <div class="container">
      <!-- Bestsellers -->
      <section class="section">
        <h2 class="section-title">Хиты продаж</h2>
        <div class="product-grid">
          <ProductCard v-for="product in bestsellers" :key="product.id" :product="product" />
        </div>
      </section>

      <!-- Categories -->
      <section class="section" id="catalog">
        <h2 class="section-title">Категории</h2>
        <div class="categories-grid">
          <div 
            class="category-card" 
            v-for="cat in categories" 
            :key="cat.id" 
            @click="goToCategory(cat.id)"
            :style="{ backgroundImage: `url(${cat.imageUrl})` }"
          >
            <h3>{{ cat.name }}</h3>
          </div>
        </div>
      </section>

      <!-- Reviews -->
      <section class="section reviews">
        <h2 class="section-title">Отзывы клиентов</h2>
        <div class="reviews-slider">
          <div class="review-card" v-for="i in 3" :key="i">
            <p>"Потрясающий сервис и невероятно красивые цветы! Рекомендую всем."</p>
            <span>- Анна, Москва</span>
          </div>
        </div>
      </section>

      <!-- Contacts -->
      <section class="section contacts-section">
        <h2 class="section-title">Наши контакты</h2>
        <div class="contacts-grid">
          <div class="contacts-info">
            <p><strong>Адрес:</strong> г. Москва, Цветочный бульвар, 12</p>
            <p><strong>Телефон:</strong> +7 (999) 123-45-67</p>
            <div class="social-links">
              <a href="#" class="social-link whatsapp">WhatsApp</a>
              <a href="#" class="social-link telegram">Telegram</a>
            </div>
          </div>
          <div class="map-container">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2243.4697746535544!2d37.61868351582845!3d55.76775618055611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTXCsDQ2JzA0LjAiTiAzN8KwMzcnMTUuMSJF!5e0!3m2!1sru!2sru!4v1611234567890!5m2!1sru!2sru" width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
import { useProductsStore } from '../store/products'

const router = useRouter()
const productsStore = useProductsStore()

// Bestsellers dynamically from store
const bestsellers = computed(() => {
  return productsStore.products.slice(0, 4)
})

const categories = ref([
  { id: 'kustovye-rozy', name: 'Кустовые розы', imageUrl: '/images/roses_bouquet_1775641316261.png' },
  { id: 'avtorskie', name: 'Авторские букеты', imageUrl: '/images/peonies_bouquet_1775641302410.png' },
  { id: 'gollandskie', name: 'Голландские розы', imageUrl: '/images/hero_flowers_1775641286421.png' },
  { id: 'mono', name: 'Моно-букеты', imageUrl: '/images/dried_flowers_1775641363329.png' },
  { id: 'kashpo', name: 'Корзины и кашпо', imageUrl: '/images/hatbox_flowers_1775641332248.png' }
])

const scrollToCatalog = () => {
  document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' })
}

const goToCategory = (id) => {
  router.push({ path: '/catalog', query: { category: id } })
}
</script>

<style scoped>
.hero {
  height: 60vh;
  background-image: url('/images/hero_flowers_1775641286421.png');
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 60px;
}
.hero::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(255,255,255,0.4);
}
.hero-content {
  position: relative;
  z-index: 1;
  background: rgba(255, 255, 255, 0.85);
  padding: 40px;
  border-radius: 8px;
}
.hero-content h1 {
  font-size: 48px;
  margin-bottom: 20px;
}
.hero-content p {
  font-size: 18px;
  color: var(--light-text);
  margin-bottom: 30px;
}
.section {
  margin-bottom: 80px;
}
.section-title {
  text-align: center;
  font-size: 32px;
  margin-bottom: 40px;
}
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
}
.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}
.category-card {
  position: relative;
  background-size: cover;
  background-position: center;
  padding: 80px 20px;
  text-align: center;
  cursor: pointer;
  border-radius: 4px;
  overflow: hidden;
  transition: transform 0.3s ease;
}
.category-card::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.4);
  transition: background 0.3s ease;
}
.category-card:hover {
  transform: scale(1.02);
}
.category-card:hover::after {
  background: rgba(0,0,0,0.2);
}
.category-card h3 {
  position: relative;
  z-index: 1;
  color: #fff;
  font-family: var(--font-heading);
  font-size: 28px;
  font-style: italic;
  font-weight: 400;
  letter-spacing: 1px;
}
.reviews-slider {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding-bottom: 20px;
}
.review-card {
  min-width: 300px;
  background: var(--secondary-color);
  padding: 30px;
  border-radius: 4px;
}
.contacts-grid {
  display: flex;
  grid-template-columns: 1fr 1fr;
  flex-wrap: wrap;
  gap: 40px;
}
.contacts-info {
  flex: 1;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.map-container {
  flex: 1;
  min-width: 300px;
  border-radius: 8px;
  overflow: hidden;
}
.social-links {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}
.social-link {
  padding: 10px 20px;
  border-radius: 30px;
  color: white;
  font-weight: 500;
}
.social-link.whatsapp { background: #25D366; }
.social-link.telegram { background: #0088cc; }
</style>
