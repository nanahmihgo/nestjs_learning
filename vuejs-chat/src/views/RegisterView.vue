<template>
  <div class="register">
    <h2>Register</h2>
    <form class="register-form" @submit.prevent="handleSubmit">

      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" />
      
      <label for="name">Name</label>
      <input type="name" id="name" v-model="name" />

      <label for="password">Password</label>
      <input type="password" id="password" v-model="password" />

      <!-- <Inputs v-model="email" label="Email" id="email" type="email" />
      <Inputs v-model="name" label="Name" id="name" type="text" />
      <Inputs v-model="password" label="Password" id="password" type="password" /> -->

      <!-- <Inputs
        v-for="input in inputs"
        :label="input.label"
        :id="input.id"
        :type="input.type"
        :value="input.value"
      /> -->
      <!-- <Inputs
        v-for="input in inputs"
        v-bind="input"
      /> -->

      <!-- <Buttons
        :type="button.type"
        :value="button.value"
      /> -->
      <button type="submit">Register</button>
      <div v-if="error">{{ error }}</div>
    </form>
  </div>
</template>


<script setup>
  import { ref } from 'vue';
  // import Inputs from '../components/Inputs.vue';
  // import Buttons from '../components/Buttons.vue';
  import { useAuthStore } from '../stores/auth-store';
  import { useRouter } from 'vue-router';

  // const button = ref([
  //   { type: 'submit', value: 'Soumettre' },
  // ]);
  // const inputs = ref([
  //   { label: 'email', id: 'email', type: 'email', value: '' },
  //   { label: 'name', id: 'name', type: 'name', value: '' },
  //   { label: 'password', id: 'password', type: 'password', value: '' },
  // ]);
  const email = ref('');
  const name = ref('');
  const password = ref('');
  const authStore = useAuthStore();
  const router = useRouter();
  const error = ref('');

  //TODO : Add validation with zod

  const handleSubmit = async () => {
    await authStore.register({ email: email.value, name: name.value, password: password.value });
    if (authStore.error) {
      error.value = authStore.error;
    } else {
      console.log('Registration successful');
      router.push('/login');
    }
  };
</script>



  
<style>
.register {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25%;
  padding: 1rem;
  /* border: 1px solid black; */
  border-radius: 10px;
  background-color:  rgb(144, 255, 144);
  h2 {
    margin-bottom: 2rem;
  }
  .register-form {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-end;
    width: 100%;
  }
}
</style>