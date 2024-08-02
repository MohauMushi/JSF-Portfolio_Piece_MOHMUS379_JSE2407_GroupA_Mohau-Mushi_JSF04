<template>
  <div class="max-w-md mx-auto">
    <h1 class="text-2xl font-bold mb-4">Login</h1>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label for="email" class="block mb-1">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          required
          class="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div>
        <label for="password" class="block mb-1">Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
          class="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <button
        type="submit"
        class="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Login
      </button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "Login",
  setup() {
    const email = ref("");
    const password = ref("");

    const handleSubmit = () => {
      console.log("Login submitted", {
        email: email.value,
        password: password.value,
      });
    };

    return {
      email,
      password,
      handleSubmit,
    };
  },
};
</script>
