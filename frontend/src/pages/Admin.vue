<template>
  <div class="container admin-page">
    
    <div v-if="!isAdminAuthenticated" class="admin-login-overlay">
      <div class="admin-login-box">
        <h2>Вход в Админ-панель</h2>
        <form @submit.prevent="handleAdminLogin">
          <div class="form-group">
            <input type="text" v-model="adminCreds.login" placeholder="Логин (admin)" required />
          </div>
          <div class="form-group">
            <input type="password" v-model="adminCreds.password" placeholder="Пароль (admin)" required />
          </div>
          <button type="submit">Войти</button>
          <p v-if="adminError" class="error-msg">Неверный логин или пароль!</p>
        </form>
      </div>
    </div>

    <div v-else>
      <div class="admin-header-bar">
        <h2>Админ-панель</h2>
        <button class="logout-btn" @click="adminLogout">Выйти</button>
      </div>
      
      <div class="admin-tabs">
        <button :class="{ active: currentTab === 'products' }" @click="currentTab = 'products'">Товары</button>
        <button :class="{ active: currentTab === 'orders' }" @click="currentTab = 'orders'">Заказы</button>
      </div>

      <!-- Вкладка ОРДЕРЫ -->
      <div v-if="currentTab === 'orders'" class="orders-section">
        <h3>Управление заказами</h3>
        <input 
          type="text" 
          class="search-input" 
          v-model="searchQuery" 
          placeholder="🔍 Поиск по номеру заказа (например, 1234)..." 
        />
        
        <div class="admin-order-list">
          <div v-if="filteredAdminOrders.length === 0" class="no-results">
            Заказы не найдены.
          </div>
          <div class="admin-order-card" v-for="order in filteredAdminOrders" :key="order.id">
            <div class="order-header-row">
              <span class="order-status">Новый</span>
              <span class="order-date">{{ order.date }}</span>
            </div>
            <div class="order-grid">
              <div><strong>Номер:</strong> <span class="highlight">#{{ order.id }}</span></div>
              <div><strong>Клиент:</strong> {{ order.recipientName }}</div>
              <div><strong>Телефон:</strong> {{ order.recipientPhone }}</div>
              <div><strong>Сумма:</strong> {{ order.totalPrice }} ₽</div>
            </div>
            <div class="order-meta">
              <p><strong>Записка:</strong> {{ order.noteText || 'Нет' }}</p>
              <p><strong>Время доставки:</strong> {{ order.deliveryTime }}</p>
              <p><strong>Анонимно:</strong> {{ order.anonymous ? 'Да' : 'Нет' }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Вкладка ТОВАРЫ -->
      <div v-if="currentTab === 'products'" class="admin-sections">
        <section class="add-product-section">
          <h3>{{ isEditing ? 'Редактировать товар' : 'Добавить новый товар' }}</h3>
          <form @submit.prevent="submitProduct" class="admin-form">
            <div class="form-group">
              <label>Название букета</label>
              <input type="text" v-model="form.name" required />
            </div>
            <div class="form-group">
              <label>Цена (₽)</label>
              <input type="number" v-model="form.price" required />
            </div>
            <div class="form-group">
              <label>Изображение</label>
              <input type="file" @change="handleFileUpload" accept="image/*" />
              <p class="file-hint">Или вставьте URL:</p>
              <input type="text" v-model="form.imageUrl" placeholder="https://..." />
              <img v-if="form.imageUrl" :src="form.imageUrl" class="preview-img" />
            </div>
            <div class="form-group">
              <label>Категория (ID)</label>
              <select v-model="form.category" required>
                <option value="kustovye-rozy">Кустовые розы</option>
                <option value="avtorskie">Авторские букеты</option>
                <option value="gollandskie">Голландские розы</option>
                <option value="mono">Моно-букеты</option>
                <option value="kashpo">Корзины и кашпо</option>
              </select>
            </div>
            <button type="submit">{{ isEditing ? 'Сохранить изменения' : 'Добавить в каталог' }}</button>
            <button type="button" class="cancel-btn" v-if="isEditing" @click="cancelEdit">Отмена</button>
          </form>
        </section>
        
        <section class="products-list-section">
          <h3>Список товаров ({{ productsStore.products.length }})</h3>
          <div class="admin-product-list">
            <div class="admin-product-card" v-for="product in productsStore.products" :key="product.id">
              <img :src="product.imageUrl || 'https://via.placeholder.com/150'" alt="product" />
              <div class="admin-product-info">
                <h4>{{ product.name }}</h4>
                <p>{{ product.price }} ₽</p>
              </div>
              <div class="admin-product-actions">
                <button class="edit-btn" @click="editProduct(product)">Ред.</button>
                <button class="delete-btn" @click="productsStore.deleteProduct(product.id)">Удалить</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useProductsStore } from '../store/products'
import { useUserStore } from '../store/user'

const productsStore = useProductsStore()
const userStore = useUserStore() // Using userStore.orders as a mock global orders DB

// ----- ADMIN AUTH LOGIC -----
const isAdminAuthenticated = ref(localStorage.getItem('adminAuth') === 'true')
const adminCreds = ref({ login: '', password: '' })
const adminError = ref(false)

const handleAdminLogin = () => {
  if (adminCreds.value.login === 'admin' && adminCreds.value.password === 'admin') {
    isAdminAuthenticated.value = true
    localStorage.setItem('adminAuth', 'true')
    adminError.value = false
  } else {
    adminError.value = true
  }
}

const adminLogout = () => {
  isAdminAuthenticated.value = false
  localStorage.removeItem('adminAuth')
}

// ----- TABS & ORDERS LOGIC -----
const currentTab = ref('orders')
const searchQuery = ref('')

const filteredAdminOrders = computed(() => {
  let orders = userStore.orders || [] // For mock purposes we view userStore orders
  if (searchQuery.value) {
    orders = orders.filter(o => o.id.toString().includes(searchQuery.value.trim()))
  }
  return orders
})

// ----- PRODUCTS LOGIC -----
const isEditing = ref(false)
const editingId = ref(null)

const form = ref({
  name: '',
  price: '',
  imageUrl: 'https://via.placeholder.com/300x400?text=New+Flower',
  category: 'kustovye-rozy',
  type: '',
  color: '',
  composition: []
})

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      form.value.imageUrl = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const submitProduct = () => {
  const payload = {
    name: form.value.name,
    price: Number(form.value.price),
    imageUrl: form.value.imageUrl,
    category: form.value.category,
    type: form.value.type,
    color: form.value.color,
    composition: form.value.composition
  }

  if (isEditing.value && editingId.value) {
    productsStore.updateProduct({ ...payload, id: editingId.value })
    alert('Товар успешно обновлен!')
  } else {
    productsStore.addProduct(payload)
    alert('Товар успешно добавлен!')
  }
  cancelEdit()
}

const editProduct = (product) => {
  isEditing.value = true
  editingId.value = product.id
  form.value = { 
    name: product.name,
    price: product.price,
    imageUrl: product.imageUrl,
    category: product.category,
    type: product.type || '',
    color: product.color || '',
    composition: product.composition || []
  }
}

const cancelEdit = () => {
  isEditing.value = false
  editingId.value = null
  form.value = {
    name: '', price: '', imageUrl: 'https://via.placeholder.com/300x400?text=New+Flower',
    category: 'kustovye-rozy', type: '', color: '', composition: []
  }
}
</script>

<style scoped>
.admin-page { padding: 40px 20px; min-height: 70vh; }

/* LOGIN OVERLAY */
.admin-login-overlay { display: flex; justify-content: center; align-items: center; min-height: 50vh; }
.admin-login-box { background: var(--secondary-color); padding: 40px; border-radius: 8px; text-align: center; width: 100%; max-width: 400px; }
.admin-login-box h2 { font-family: var(--font-body); margin-bottom: 20px; }
.admin-login-box .form-group { margin-bottom: 15px; }
.admin-login-box input { width: 100%; padding: 12px; border: 1px solid var(--border-color); border-radius: 4px; }
.admin-login-box button { width: 100%; margin-top: 10px; }
.error-msg { color: #ff4d4f; font-size: 14px; margin-top: 15px; }

/* TABS */
.admin-header-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.logout-btn { background: transparent; border: 1px solid var(--text-color); color: var(--text-color); }
.admin-tabs { display: flex; gap: 10px; margin-bottom: 25px; border-bottom: 2px solid var(--secondary-color); padding-bottom: 10px; }
.admin-tabs button { background: transparent; color: var(--text-color); font-weight: bold; border: none; padding: 10px 20px; font-size: 16px; border-radius: 4px; transition: 0.3s; }
.admin-tabs button.active { background: var(--primary-color); color: white; }

/* ORDERS SECTION */
.orders-section h3 { margin-bottom: 15px; }
.search-input { width: 100%; max-width: 400px; padding: 12px; border: 1px solid var(--border-color); border-radius: 4px; margin-bottom: 30px; }
.admin-order-list { display: flex; flex-direction: column; gap: 15px; }
.admin-order-card { background: var(--secondary-color); padding: 20px; border-radius: 8px; border-left: 4px solid var(--primary-color); }
.order-header-row { display: flex; justify-content: space-between; margin-bottom: 15px; font-size: 14px; color: var(--light-text); }
.order-status { background: #e5b3a6; color: white; padding: 3px 10px; border-radius: 12px; font-weight: 500;}
.order-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 15px; }
.order-meta { padding-top: 15px; border-top: 1px dashed var(--border-color); font-size: 14px; color: var(--text-color); }
.order-meta p { margin-bottom: 5px; }
.highlight { font-size: 18px; font-weight: bold; color: var(--primary-color); }
.no-results { color: var(--light-text); padding: 20px; text-align: center; }

/* PRODUCTS SECTION */
.admin-sections { display: flex; gap: 40px; flex-wrap: wrap; }
.add-product-section { flex: 1; min-width: 300px; background: var(--secondary-color); padding: 30px; border-radius: 8px; height: fit-content; }
.products-list-section { flex: 2; min-width: 300px; }
.admin-form .form-group { margin-bottom: 20px; display: flex; flex-direction: column; }
.admin-form .form-group label { margin-bottom: 5px; font-weight: 500; font-size: 14px; }
.admin-form input, .admin-form select { padding: 10px; border: 1px solid var(--border-color); font-family: var(--font-body); border-radius: 4px; }
.admin-form button { width: 100%; margin-top: 10px; cursor: pointer; }
.file-hint { font-size: 12px; color: var(--light-text); margin: 5px 0; }
.preview-img { width: 100px; margin-top: 10px; border-radius: 4px; object-fit: cover; }
.cancel-btn { background: transparent; color: var(--text-color); border: 1px solid var(--border-color); }
.admin-product-list { display: flex; flex-direction: column; gap: 15px; }
.admin-product-card { display: flex; align-items: center; justify-content: space-between; padding: 10px; border: 1px solid var(--border-color); border-radius: 8px; }
.admin-product-card img { width: 60px; height: 60px; object-fit: cover; border-radius: 4px; }
.admin-product-info { flex: 1; margin-left: 15px; }
.admin-product-actions { display: flex; gap: 10px; }
.edit-btn { background: transparent; color: var(--text-color); border: 1px solid var(--border-color); padding: 5px 10px; font-size: 12px; cursor: pointer;}
.delete-btn { background: transparent; color: #ff4d4f; border: 1px solid #ff4d4f; padding: 5px 10px; font-size: 12px; cursor: pointer;}
</style>
