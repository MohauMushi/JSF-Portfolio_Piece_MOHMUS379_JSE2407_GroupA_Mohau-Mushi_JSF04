import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ProductDetail from '../views/ProductDetail.vue'
import Login from '../views/Login.vue'
import Wishlist from '../views/Wishlist.vue'
import Cart from '../views/Cart.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetail,
    props: true
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: Wishlist,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
  },
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router