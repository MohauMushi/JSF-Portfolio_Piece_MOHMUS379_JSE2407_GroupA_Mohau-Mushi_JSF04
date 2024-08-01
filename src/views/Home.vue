<template>
  <div>
    <ProductGrid :products="products" />
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useProductStore } from "../store/ProductStore.js";
import ProductGrid from "../components/ProductGrid.vue";

export default {
  name: "Home",
  components: {
    ProductGrid,
  },
  setup() {
    const productStore = useProductStore();
    const products = computed(() => productStore.products);

    onMounted(async () => {
      await productStore.fetchProducts();
    });

    return {
      products,
    };
  },
};
</script>
