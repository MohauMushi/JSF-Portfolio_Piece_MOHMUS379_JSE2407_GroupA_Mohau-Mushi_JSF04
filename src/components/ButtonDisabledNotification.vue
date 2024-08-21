<template>
  <Transition name="fade">
    <div v-if="isVisible" class="fixed top-4 right-4 z-50 max-w-sm">
      <div
        class="bg-teal-600 dark:bg-gray-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center"
      >
        <span class="mr-2">
          <svg
            class="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="9"
              stroke="#000000"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            ></circle>
            <rect
              height="0.01"
              stroke="#000000"
              stroke-linejoin="round"
              stroke-width="3"
              width="0.01"
              x="12"
              y="8"
            ></rect>
            <path
              d="M12 12V16"
              stroke="#000000"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            ></path>
          </svg>
        </span>
        <p>{{ message }}</p>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

/**
 * A notification component that displays a message for a specified duration.
 *
 * @param {Object} props - The component's props.
 * @param {string} props.message - The message to be displayed in the notification.
 * @param {number} [props.duration=3000] - The duration of the notification in milliseconds.
 */
const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    default: 3000,
  },
});

const isVisible = ref(false);
let timer;

/**
 * Shows the notification and starts a timer to hide it after the specified duration.
 */
const show = () => {
  isVisible.value = true;
  timer = setTimeout(() => {
    isVisible.value = false;
  }, props.duration);
};

/**
 * Lifecycle hook that starts the notification when the component is mounted.
 */
onMounted(() => {
  show();
});

/**
 * Lifecycle hook that clears the timer when the component is unmounted.
 */
onUnmounted(() => {
  clearTimeout(timer);
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
