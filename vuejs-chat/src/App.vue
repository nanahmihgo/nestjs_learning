<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import PageName from './components/PageName.vue'
  import { onMounted } from 'vue';
  import { useAuthStore } from './stores/auth-store';

  const authStore = useAuthStore();

  onMounted(() => {
    authStore.checkToken();
  });
</script>


<template>
  <!-- <header> -->
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->

    <!-- <div class="wrapper"> -->
      <PageName msg="Chat JS" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/login"> Login/</RouterLink>
        <RouterLink to="/register">Register</RouterLink>
      </nav>
    <!-- </div> -->
  <!-- </header> -->

  <RouterView />
</template>


<style scoped>

  /* #app{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  } */

</style>
