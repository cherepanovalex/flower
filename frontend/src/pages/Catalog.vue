<template>
  <div class="catalog-page container">
    <aside class="sidebar">
      <h3>Фильтры</h3>
      
      <div class="filter-group">
        <h4>Цена</h4>
        <div class="price-inputs">
          <input type="number" v-model="filterState.priceMin" placeholder="от 17000" />
          <input type="number" v-model="filterState.priceMax" placeholder="до 800000" />
        </div>
      </div>
      
      <div class="filter-group">
        <h4>Тип букета</h4>
        <label><input type="checkbox" value="Моно-букет" v-model="filterState.types" /> Моно-букет</label>
      </div>
      
      <div class="filter-group">
        <h4>Состав букета</h4>
        <label><input type="checkbox" value="PREMIUM роза 40см" v-model="filterState.composition" /> PREMIUM роза 40см</label>
        <label><input type="checkbox" value="Роза 40 см" v-model="filterState.composition" /> Роза 40 см</label>
        <label><input type="checkbox" value="Эвкалипт" v-model="filterState.composition" /> Эвкалипт</label>
        <label><input type="checkbox" value="Кустовая роза" v-model="filterState.composition" /> Кустовая роза</label>
        <label><input type="checkbox" value="Джульетта" v-model="filterState.composition" /> Джульетта</label>
      </div>

      <div class="filter-group">
        <h4>Цвет</h4>
        <label><input type="checkbox" value="Алый" v-model="filterState.colors" /> Алый</label>
        <label><input type="checkbox" value="Сиреневый" v-model="filterState.colors" /> Сиреневый</label>
      </div>
      
      <button class="apply-filter-btn" @click="applyFilters">Применить</button>
      <button v-if="activeFilters" class="reset-filter-btn" @click="resetFilters">Сбросить</button>
    </aside>

    <main class="catalog-content">
      <div class="catalog-header">
        <h2>{{ currentCategoryName }}</h2>
      </div>
      
      <div class="product-grid" v-if="filteredProducts.length > 0">
        <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
      </div>
      <div v-else>
        <p>Ничего не найдено. Попробуйте изменить фильтры.</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
import { useProductsStore } from '../store/products'
import { storeToRefs } from 'pinia'

const route = useRoute()
const router = useRouter()
const productsStore = useProductsStore()

const { products } = storeToRefs(productsStore)

const categoryMap = {
  'kustovye-rozy': 'Кустовые розы',
  'avtorskie': 'Авторские букеты',
  'gollandskie': 'Голландские розы',
  'mono': 'Моно-букеты',
  'kashpo': 'Корзины и кашпо'
}

const filterState = ref({
  priceMin: null,
  priceMax: null,
  types: [],
  composition: [],
  colors: []
})

const activeFilters = ref(null)

const applyFilters = () => {
  activeFilters.value = JSON.parse(JSON.stringify(filterState.value))
}

const resetFilters = () => {
  filterState.value = {
    priceMin: null,
    priceMax: null,
    types: [],
    composition: [],
    colors: []
  }
  activeFilters.value = null
  // Also clear category URL to show all if wanted
  router.push('/catalog')
}

const currentCategoryName = computed(() => {
  const cat = route.query.category
  return cat && categoryMap[cat] ? categoryMap[cat] : 'Все букеты'
})

const filteredProducts = computed(() => {
  let result = products.value

  if (route.query.category) {
    result = result.filter(p => p.category === route.query.category)
  }

  const f = activeFilters.value
  if (!f) return result

  if (f.priceMin) {
    result = result.filter(p => p.price >= Number(f.priceMin))
  }
  if (f.priceMax) {
    result = result.filter(p => p.price <= Number(f.priceMax))
  }
  if (f.types && f.types.length > 0) {
    result = result.filter(p => f.types.includes(p.type))
  }
  if (f.colors && f.colors.length > 0) {
    result = result.filter(p => f.colors.includes(p.color))
  }
  if (f.composition && f.composition.length > 0) {
    result = result.filter(p => p.composition && p.composition.some(c => f.composition.includes(c)))
  }

  return result
})
</script>

<style scoped>
.catalog-page {
  display: flex;
  gap: 40px;
  padding: 40px 20px;
}
.sidebar {
  width: 250px;
  flex-shrink: 0;
}
.sidebar h3 {
  font-size: 20px;
  margin-bottom: 20px;
}
.filter-group {
  margin-bottom: 25px;
}
.filter-group h4 {
  font-size: 16px;
  margin-bottom: 10px;
  color: var(--text-color);
  font-family: var(--font-body);
}
.filter-group label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  color: var(--light-text);
  font-size: 14px;
}
.price-inputs {
  display: flex;
  gap: 10px;
}
.price-inputs input {
  width: 100%;
  padding: 8px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  border-radius: 4px;
}
.apply-filter-btn {
  width: 100%;
  margin-top: 15px;
  padding: 15px;
}
.reset-filter-btn {
  width: 100%;
  margin-top: 10px;
  padding: 15px;
  background: transparent;
  color: var(--text-color);
  border: 1px solid var(--border-color);
}
.reset-filter-btn:hover {
  background: var(--secondary-color);
}
.catalog-content {
  flex: 1;
}
.catalog-header {
  margin-bottom: 30px;
}
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 30px;
}
</style>
