<template>
  <transition name="fade">
    <div v-if="show" class="fixed top-20 right-4 z-50 max-w-sm">
      <div
        :class="[
          'p-4 rounded-md shadow-md',
          type === 'success'
            ? 'bg-green-500 text-white'
            : 'bg-red-500 text-white',
        ]"
      >
        <div class="flex items-center">
          <svg
            v-if="type === 'success'"
            class="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <svg
            v-else
            class="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <span class="font-medium">{{ message }}</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "success",
  },
  duration: {
    type: Number,
    default: 3000,
  },
});

const show = ref(false);
let timer = null;

const startTimer = () => {
  show.value = true;
  timer = setTimeout(() => {
    show.value = false;
  }, props.duration);
};

onMounted(() => {
  startTimer();
});

onUnmounted(() => {
  if (timer) clearTimeout(timer);
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
