import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../store/auth.js";
import Home from "../views/Home.vue";
import ProductDetail from "../views/ProductDetail.vue";
import Login from "../views/Login.vue";
import Wishlist from "../views/Wishlist.vue";
import Cart from "../views/Cart.vue";
import Comparison from "../views/Comparison.vue";

/**
 * @typedef {Object} Route
 * @property {string} path - The URL path for the route
 * @property {string} name - The name of the route
 * @property {Object} component - The Vue component to render for this route
 * @property {boolean} [props] - Whether to pass route params as props to the component
 */

/**
 * @type {Route[]}
 * @description Array of route objects defining the application's routing structure
 */
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/product/:id",
    name: "ProductDetail",
    component: ProductDetail,
    props: true,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/wishlist",
    name: "Wishlist",
    component: Wishlist,
    meta: { requiresAuth: true },
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
    meta: { requiresAuth: true },
  },
  {
    path: "/comparison",
    name: "Comparison",
    component: Comparison,
    meta: {requiresAuth: true},
  }
];

/**
 * @type {import('vue-router').Router}
 * @description Vue Router instance with HTML5 history mode and defined routes
 */
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !authStore.isLoggedIn) {
    // Instead of redirecting, show the modal
    const destination = to.name.toLowerCase();
    authStore.showAuthModal(destination);
    next(false); // Prevent the navigation
  } else {
    next();
  }
});

export default router;
