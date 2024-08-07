<template>
  <div class="min-h-screen bg-gray-100">
    <Header />
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import Header from "../src/components/Header.vue";
</script>
