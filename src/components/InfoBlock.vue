<template>
  <div>
    <img height="70" width="70" :src="imageUrl" alt="" />
    <h2 class="mt-4 text-2xl font-medium">{{ title }}</h2>
    <p>{{ description }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  imageUrl: String,
  description: String
})
</script>

<style scoped>
p {
  color: rgb(0, 0, 0);
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0%;
  text-align: center;
}

h2 {
  color: rgb(0, 0, 0);
  font-size: 22px;
  font-weight: 600;
  line-height: 27px;
  letter-spacing: 0%;
  text-align: center;
}

div {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>