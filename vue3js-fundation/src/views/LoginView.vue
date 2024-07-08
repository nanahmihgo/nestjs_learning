<template>
  <div class="login">
    <h1>Connectez-vous !</h1>

    <form class="login-form" @submit.prevent="handleSubmit">
      <Inputs label="Email" id="email" type="email" value=""/>
      <Inputs label="Mot de passe" id="password" type="password" value="" />
      <Buttons type="submit" text="Se connecter" />
    </form>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  // import { useAuthStore } from "../stores/auth-store";
  import router from "../router";
  import Inputs from "../components/Inputs.vue";
  import Buttons from "../components/Buttons.vue";
  import { fetchClient } from '../plugins/fetchClient';  

  // const user = ref(null);
  // const email = ref("");
  // const password = ref("");
  // const error = ref("");

  // const handleSubmit = async ({ email, password }) => {
  //   try {
  //     const response = await fetchClient.post('/auth/login', { email, password });
  //     if (email.value === "" || password.value === "") {
  //       error.value = "Veuillez renseigner tous les champs";
  //     }
  //     user.value = response;
  //   } catch (err) {
  //     error.value = 'Login failed: ' + err.message;
  //   }
  //   router.push('/home');
  // };

  //TODO : Add validation with zod
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
