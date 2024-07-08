<template>
  <div>
    <h2 v-if="data">Welcom {{ data.name }} !</h2>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { fetchClient } from '../plugins/fetchClient';
  import { useAuthStore } from '../stores/auth-store';

  const data = ref(null);
  const error = ref(null);
  const authStore = useAuthStore();

  onMounted(async () => {
    try {
      const response = await fetchClient.get('/auth', {
        headers: {
          Authorization: `Bearer ${authStore.token}`
        }
      });
      data.value = await response;
    } catch (err) {
      error.value = 'Failed to fetch data: ' + err.message;
    }
  });
</script>
