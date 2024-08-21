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

/**
 * A reusable notification component that displays a success or error message.
 * @param {Object} props - The component's props.
 * @param {string} props.message - The message to be displayed in the notification.
 * @param {string} [props.type='success'] - The type of the notification ('success' or 'error').
 * @param {number} [props.duration=3000] - The duration of the notification in milliseconds.
 */
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

/**
 * Starting the timer for the notification and shows the notification.
 */
const startTimer = () => {
  show.value = true;
  timer = setTimeout(() => {
    show.value = false;
  }, props.duration);
};

/**
 * A lifecycle hook that starts the timer when the component is mounted.
 */
onMounted(() => {
  startTimer();
});

/**
 * A lifecycle hook that clears the timer when the component is unmounted.
 */
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
