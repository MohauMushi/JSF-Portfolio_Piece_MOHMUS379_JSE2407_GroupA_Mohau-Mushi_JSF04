<template>
  <div class="relative">
    <label class="flex items-center cursor-pointer">
      <input
        type="checkbox"
        :checked="isChecked"
        @change="toggleComparison"
        :disabled="!isLoggedIn"
        class="form-checkbox cursor-pointer h-5 w-5 text-[#354961] transition duration-150 ease-in-out"
      />
      <span class="ml-2 text-sm text-gray-700">Compare</span>
    </label>
    <Notification
      v-if="showNotification"
      message="Please log in to compare products"
      :duration="3000"
      class="absolute left-1/2 transform -translate-x-1/2 -bottom-12"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useComparisonStore } from "../store/ComparisonStore";
import { useAuthStore } from "../store/auth";
import Notification from "./ButtonDisabledNotification.vue";

const props = defineProps({
  productId: {
    type: Number,
    required: true,
  },
});

const comparisonStore = useComparisonStore();
const authStore = useAuthStore();

const showNotification = ref(false);

const isLoggedIn = computed(() => authStore.isLoggedIn);
const isChecked = computed(() =>
  comparisonStore.isInComparison(props.productId)
);

const toggleComparison = () => {
  if (isLoggedIn.value) {
    comparisonStore.toggleComparisonCheckbox(props.productId);
  } else {
    showNotification.value = true;
    setTimeout(() => {
      showNotification.value = false;
    }, 3000);
  }
};
</script>
