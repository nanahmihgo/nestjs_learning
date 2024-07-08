<script setup>
  defineProps({
    label: String, 
    id: String,
    type: String,
    value: {
        type: [String, null],
        required: true
    },
  })
</script>

<template>
  <div class="inputs">
    <label :for="id">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :value="value"
    />
  </div>
</template>


<style scoped>
    .inputs {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-start;
      width: 100%;
      input {
        margin-bottom: 1rem;
        width: 100%;
      }
    }
</style>

