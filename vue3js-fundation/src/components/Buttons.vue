<script setup>
    defineProps({
        type: String
    })
</script>

<template>
  <button :type="type" @click="register">Soumettre</button>
</template>


<style scoped>  
    button {
      background-color: rgb(144, 255, 144);
      border-radius: 10px;
      border: 2px solid black;
      padding: 0.5rem;
      color: black;
      cursor: pointer;
    }
    :hover {
        background-color: green;
        color: white;
    }
</style>