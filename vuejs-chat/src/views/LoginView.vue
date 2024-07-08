<template>
  <div class="login">
    <h2>Login</h2>
    <form class="login-form" @submit.prevent="handleSubmit">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" />

      <label for="password">Password</label>
      <input type="password" id="password" v-model="password" />

      <button type="submit">Login</button>
      <div v-if="error">{{ error }}</div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth-store';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const error = ref('');
const authStore = useAuthStore();
const router = useRouter();

//TODO : Add validation with zod

const handleSubmit = async () => {
  await authStore.login({ email: email.value, password: password.value });
  if (authStore.error) {
    error.value = authStore.error;
  } else {
    console.log('Login successful');
    console.log('Stored token:', sessionStorage.getItem('token')); 
    router.push('/home');
  }
};
</script>
