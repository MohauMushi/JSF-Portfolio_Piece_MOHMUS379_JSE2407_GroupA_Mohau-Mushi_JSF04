import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import ProductDetail from "../views/ProductDetail.vue";
import Login from "../views/Login.vue";
import Wishlist from "../views/Wishlist.vue";
import Cart from "../views/Cart.vue";

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
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
];

/**
 * @type {import('vue-router').Router}
 * @description Vue Router instance with HTML5 history mode and defined routes
 */
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
