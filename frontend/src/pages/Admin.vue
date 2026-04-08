<template>
  <div class="container admin-page">
    <h2>Админ-панель</h2>
    
    <div class="admin-sections">
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
</template>

<script setup>
import { ref } from 'vue'
import { useProductsStore } from '../store/products'

const productsStore = useProductsStore()

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
      form.value.imageUrl = e.target.result // Base64 encoding
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
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const cancelEdit = () => {
  isEditing.value = false
  editingId.value = null
  form.value = {
    name: '',
    price: '',
    imageUrl: 'https://via.placeholder.com/300x400?text=New+Flower',
    category: 'kustovye-rozy',
    type: '',
    color: '',
    composition: []
  }
}
</script>

<style scoped>
.admin-page { padding: 40px 20px; }
.admin-sections { display: flex; gap: 40px; margin-top: 20px; flex-wrap: wrap; }
.add-product-section { flex: 1; min-width: 300px; background: var(--secondary-color); padding: 30px; border-radius: 8px; height: fit-content; }
.products-list-section { flex: 2; min-width: 300px; }
.admin-form .form-group { margin-bottom: 20px; display: flex; flex-direction: column; }
.admin-form .form-group label { margin-bottom: 5px; font-weight: 500; font-size: 14px; }
.admin-form input, .admin-form select { padding: 10px; border: 1px solid var(--border-color); font-family: var(--font-body); border-radius: 4px; }
.admin-form button { width: 100%; margin-top: 10px; cursor: pointer; }
.file-hint { font-size: 12px; color: var(--light-text); margin: 5px 0; }
.preview-img { width: 100px; margin-top: 10px; border-radius: 4px; object-fit: cover; }
.cancel-btn { background: transparent; color: var(--text-color); border: 1px solid var(--border-color); }
.cancel-btn:hover { background: var(--border-color); }

.admin-product-list { display: flex; flex-direction: column; gap: 15px; }
.admin-product-card { display: flex; align-items: center; justify-content: space-between; padding: 10px; border: 1px solid var(--border-color); border-radius: 8px; }
.admin-product-card img { width: 60px; height: 60px; object-fit: cover; border-radius: 4px; }
.admin-product-info { flex: 1; margin-left: 15px; }
.admin-product-actions { display: flex; gap: 10px; }
.edit-btn { background: transparent; color: var(--text-color); border: 1px solid var(--border-color); padding: 5px 10px; font-size: 12px; cursor: pointer;}
.edit-btn:hover { background: var(--border-color); }
.delete-btn { background: transparent; color: #ff4d4f; border: 1px solid #ff4d4f; padding: 5px 10px; font-size: 12px; cursor: pointer;}
.delete-btn:hover { background: #ff4d4f; color: white; }
</style>
