<template>
  <div class="container mx-auto px-4">
    <div v-if="loading">
      <SkeletonLoader :count="8" />
    </div>
    <div v-else>
      <ProductGrid :products="products" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useProductStore } from "../store/ProductStore.js";
import ProductGrid from "../components/ProductGrid.vue";
import SkeletonLoader from "../components/SkeletonLoader.vue";

export default {
  name: "Home",
  components: {
    ProductGrid,
    SkeletonLoader,
  },
  setup() {
    const productStore = useProductStore();
    const products = computed(() => productStore.products);
    const loading = ref(true);

    onMounted(async () => {
      try {
        await productStore.fetchProducts();
      } finally {
        setTimeout(() => {
        loading.value = false;
      }, 1300);
      }
    });

    return {
      loading,
      products,
      
    };
  },
};
</script>