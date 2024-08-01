<template>
  <div class="min-h-screen bg-gray-100">
    <Header />
    <main class="container mx-auto px-4 py-8">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Header from "../src/components/Header.vue";

export default {
  name: "App",
  components: {
    Header,
  },
};
</script>
