<template>
  <Transition name="modal">
    <div
      v-if="isOpen"
      class="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
          @click="onClose"
        ></div>

        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >

        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 dark:bg-gray-900">
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3
                class="text-lg leading-6 font-medium text-gray-900 dark:text-white"
                id="modal-title"
              >
                Authentication Required
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  You need to be logged in to view your {{ destination }}.
                </p>
              </div>
            </div>
          </div>
          <div
            class="bg-gray-50 dark:bg-gray-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
          >
            <button
              type="button"
              @click="handleLogin"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-600 dark:bg-gray-800 text-base font-medium text-white hover:bg-teal-700 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Go to Login
            </button>
            <button
              type="button"
              @click="onClose"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";

/**
 * A modal component that displays a message and provides options for the user to login or cancel.
 *
 * @param {Object} props - The component's props.
 * @param {boolean} props.isOpen - Determines whether the modal should be displayed or not.
 * @param {string} props.destination - The destination that requires authentication.
 * @param {function} emit - The function to emit events from the component.
 */
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["close"]);
const router = useRouter();

/**
 * Emits the 'close' event to close the modal.
 */
const onClose = () => {
  emit("close");
};

/**
 * Navigates the user to the login page with the destination as a query parameter.
 */
const handleLogin = () => {
  router.push(`/login?redirect=/${props.destination}`);
  onClose();
};
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
