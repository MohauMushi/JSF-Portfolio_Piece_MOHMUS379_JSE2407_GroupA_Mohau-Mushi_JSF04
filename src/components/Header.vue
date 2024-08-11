<template>
  <header class="sticky z-50 top-0">
    <nav class="bg-teal-700">
      <div
        class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
      >
        <!-- Logo and brand name -->
        <router-link
          :to="{ name: 'Home' }"
          class="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="/accusoft-svgrepo-com.svg"
            class="h-8"
            alt="FluxStore Logo"
          />
          <span
            class="self-center text-2xl font-semibold whitespace-nowrap text-white"
          >
            FluxStore
          </span>
        </router-link>

        <!-- Mobile menu button -->
        <button
          @click="toggleMenu"
          type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-gray-200"
          :aria-expanded="isOpen"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <!-- Navigation menu -->
        <div
          class="w-full md:block md:w-auto"
          :class="{ hidden: !isOpen }"
          id="navbar-dropdown"
        >
          <ul
            class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-teal-700 md:flex-row md:space-x-8 md:mt-0 md:border-0"
          >
            <!-- Wishlist link -->
            <li>
              <router-link
                :to="{ name: 'Wishlist' }"
                class="text-white hover:bg-teal-600 hover:text-white block px-3 py-1 rounded-md text-base font-medium md:m-0"
              >
                WishList
              </router-link>
            </li>
            <!-- Cart icon (visible on larger screens) -->
            <li>
              <router-link
                :to="{ name: 'Cart' }"
                class="hidden lg:block md:block relative text-white px-2 py-1 hover:bg-teal-600 rounded-md"
              >
                <div class="absolute -top-2 -right-2">
                  <p
                    class="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white"
                  >
                    2
                  </p>
                </div>
                <span class="sr-only">View cart</span>
                <svg
                  class="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </router-link>
            </li>
            <!-- Cart text link (visible on smaller screens) -->
            <li>
              <router-link
                :to="{ name: 'Cart' }"
                class="lg:hidden md:hidden block py-2 px-3 text-white rounded-md hover:bg-teal-600 md:hover:bg-transparent md:border-0 md:hover:text-teal-300 md:p-0"
              >
                Cart
              </router-link>
            </li>
            <!-- Login/Logout dropdown -->
            <li class="relative" ref="accountDropdown">
              <button
                @click="toggleUserMenu"
                class="flex items-center py-2 px-1 text-white hover:bg-teal-600 rounded-md md:border-0 md:p-1.5"
              >
                <span class="sr-only">User menu</span>
                <svg
                  class="h-6 w-6 mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span class="text-sm">{{
                  isLoggedIn ? username : "Account"
                }}</span>
              </button>
              <div
                v-if="isUserMenuOpen"
                class="absolute right-0 mt-1 w-40 rounded-md shadow-lg bg-teal-500 ring-1 ring-black ring-opacity-5 divide-y divide-teal-400 focus:outline-none"
              >
                <div class="py-1" v-if="!isLoggedIn">
                  <router-link
                    :to="{ name: 'Login' }"
                    class="flex justify-between px-4 py-2 text-sm text-white hover:bg-teal-400"
                  >
                    Login
                    <svg
                      class="h-6 w-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      transform="rotate(0)matrix(1, 0, 0, 1, 0, 0)"
                    >
                      <path
                        d="M2.00098 11.999L16.001 11.999M16.001 11.999L12.501 8.99902M16.001 11.999L12.501 14.999"
                        stroke="#000000"
                        stroke-width="1.9200000000000004"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                      <path
                        opacity="0.5"
                        d="M9.00195 7C9.01406 4.82497 9.11051 3.64706 9.87889 2.87868C10.7576 2 12.1718 2 15.0002 2L16.0002 2C18.8286 2 20.2429 2 21.1215 2.87868C22.0002 3.75736 22.0002 5.17157 22.0002 8L22.0002 16C22.0002 18.8284 22.0002 20.2426 21.1215 21.1213C20.2429 22 18.8286 22 16.0002 22H15.0002C12.1718 22 10.7576 22 9.87889 21.1213C9.11051 20.3529 9.01406 19.175 9.00195 17"
                        stroke="#000000"
                        stroke-width="1.9200000000000004"
                        stroke-linecap="round"
                      ></path>
                    </svg>
                  </router-link>
                </div>
                <div class="py-1" v-if="isLoggedIn">
                  <button
                    @click="handleLogout"
                    class="flex justify-between w-full text-left px-4 py-2 text-sm text-white hover:bg-teal-400"
                  >
                    Logout
                    <svg
                      class="h-6 w-6"
                      viewBox="0 0 24.00 24.00"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        opacity="0.5"
                        d="M9.00195 7C9.01406 4.82497 9.11051 3.64706 9.87889 2.87868C10.7576 2 12.1718 2 15.0002 2L16.0002 2C18.8286 2 20.2429 2 21.1215 2.87868C22.0002 3.75736 22.0002 5.17157 22.0002 8L22.0002 16C22.0002 18.8284 22.0002 20.2426 21.1215 21.1213C20.2429 22 18.8286 22 16.0002 22H15.0002C12.1718 22 10.7576 22 9.87889 21.1213C9.11051 20.3529 9.01406 19.175 9.00195 17"
                        stroke="#000000"
                        stroke-width="1.9200000000000004"
                        stroke-linecap="round"
                      ></path>
                      <path
                        d="M15 12L2 12M2 12L5.5 9M2 12L5.5 15"
                        stroke="#000000"
                        stroke-width="1.9200000000000004"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <AlertComponent
      v-if="authStore.alert.show"
      :message="authStore.alert.message"
      :type="authStore.alert.type"
    />
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/auth.js";
import AlertComponent from "./Alert.vue";

const router = useRouter();
const authStore = useAuthStore();

const isOpen = ref(false);
const isUserMenuOpen = ref(false);
const accountDropdown = ref(null);

const isLoggedIn = computed(() => authStore.isLoggedIn);
const username = computed(() => authStore.user?.username || "");

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value;
};

const handleLogout = async () => {
  await authStore.logout();
  isUserMenuOpen.value = false;
  router.push({ name: "Home" });
};

const handleClickOutside = (event) => {
  if (accountDropdown.value && !accountDropdown.value.contains(event.target)) {
    isUserMenuOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
