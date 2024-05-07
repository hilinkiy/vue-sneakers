<script setup>
defineProps({
  item: Object,
  id: Number,
  isFavourite: Boolean,
  onClickFavourite: Function,
  onClickAdd: Function,
  isAdded: Boolean,
  searchController: String
})
</script>

<template>
  <div
    class="relative flex flex-col w-full border border-slate-100 rounded-xl p-8 cursor-pointer transition hover:shadow-xl hover:transform hover:-translate-y-2"
  >
    <div @click="onClickFavourite" class="absolute top-8 left-8" v-if="Boolean(onClickFavourite)">
      <img :src="!isFavourite ? '/like-1.svg' : '../../public/like-2.svg'" alt="Favorite" />
    </div>
    <img :src="item.imageUrl" class="w-full" alt="Sneaker" />
    <p>{{ item.title }}</p>
    <div class="flex justify-between mt-5">
      <div class="flex flex-col gap-2">
        <span class="text-slate-200">Цена:</span>
        <span class="font-bold">{{ item.price }} руб.</span>
      </div>
      <img
        @click="onClickAdd"
        :src="isAdded ? '../../public/checked.svg' : '../../public/plus.svg'"
        alt="Plus"
      />
    </div>
  </div>
</template>
