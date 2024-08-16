<template>
  <div
    class="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300"
  >
    <Header />
    <main>
      <router-view></router-view>
      <AuthRequiredModal
        :is-open="authStore.authModal.isOpen"
        :destination="authStore.authModal.destination"
        @close="authStore.hideAuthModal"
      />
    </main>
  </div>
</template>

<script setup>
import Header from "../src/components/Header.vue";
import { useAuthStore } from "./store/auth";
import AuthRequiredModal from "./components/AuthRequiredModal.vue";

const authStore = useAuthStore();
</script>
