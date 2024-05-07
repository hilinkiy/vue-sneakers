<template>
  <div class="relative flex w-full border border-slate-100 rounded-xl p-4 gap-4">
    <img :src="item.imageUrl" class="w-16 h-16" alt="Sneaker" />
    <div class="flex flex-col w-full">
      <p>{{ item.title }}</p>
      <div class="flex justify-between mt-5">
        <span class="font-bold">{{ item.price }} руб.</span>
        <img
          class="cursor-pointer opacity-30 hover:opacity-100 transition"
          src="/close.svg"
          alt="Close"
          @click="emit('remove')"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  item: Object,
})

const emit = defineEmits(['remove'])
</script>