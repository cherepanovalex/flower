<template>
  <div class="container profile-page">
    <h2>Личный кабинет</h2>
    
    <div class="profile-content">
      <div class="profile-orders">
        <h3>История заказов</h3>
        <div v-if="userStore.orders.length === 0" class="empty-orders">
          <p>У вас пока нет оформленных заказов.</p>
          <router-link to="/catalog"><button>Перейти в каталог</button></router-link>
        </div>
        
        <div class="order-list" v-else>
          <div class="order-card" v-for="order in userStore.orders" :key="order.id">
            <div class="order-header">
              <span class="order-id">Заказ №{{ order.id }}</span>
              <span class="order-date">{{ order.date }}</span>
              <span class="order-status processing">В обработке</span>
            </div>
            
            <div class="order-details">
              <p class="recipient"><strong>Получатель:</strong> {{ order.recipientName }}, {{ order.recipientPhone }}</p>
              <div class="order-items">
                <p><strong>Букеты:</strong></p>
                <div class="order-items-grid">
                  <div class="order-item-chip" v-for="item in order.items" :key="item.product.id">
                    <img :src="item.product.imageUrl || 'https://via.placeholder.com/150'" :alt="item.product.name" />
                    <span>{{ item.product.name }} (x{{ item.quantity }})</span>
                  </div>
                </div>
              </div>
              
              <div class="order-total">
                <p><strong>Сумма заказа: <span class="price-highlight">{{ order.totalPrice }} ₽</span></strong></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '../store/user'

const userStore = useUserStore()
</script>

<style scoped>
.profile-page {
  padding: 40px 20px;
}
.profile-content {
  margin-top: 30px;
}
.empty-orders {
  text-align: center;
  padding: 40px;
  background: var(--secondary-color);
  border-radius: 8px;
}
.empty-orders p {
  margin-bottom: 20px;
  color: var(--light-text);
}
.order-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.order-card {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 20px;
}
.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid var(--border-color);
}
.order-id {
  font-weight: 600;
  font-size: 18px;
}
.order-date {
  color: var(--light-text);
  font-size: 14px;
}
.order-status.processing {
  background: var(--primary-color);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
}
.order-details p {
  margin-bottom: 8px;
}
.order-items {
  margin: 15px 0;
  padding: 15px;
  background: var(--secondary-color);
  border-radius: 4px;
}
.order-items-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 10px;
}
.order-item-chip {
  display: flex;
  align-items: center;
  gap: 10px;
  background: white;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
}
.order-item-chip img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 4px;
}
.order-item-chip span {
  font-size: 14px;
  color: var(--text-color);
}
.order-total {
  text-align: right;
  margin-top: 15px;
}
.price-highlight {
  font-size: 20px;
  color: var(--primary-color);
}
</style>
