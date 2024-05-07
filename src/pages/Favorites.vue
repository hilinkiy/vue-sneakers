<template>
  <div class="bg-white w-3/5 m-auto rounded-xl shadow-xl shadow-grey-200 mt-20">
    <header class="flex justify-between border-b border-slate-200 px-10 py-8">
      <router-link to="/">
        <div class="flex items-center gap-4">
          <img src="/logo.png" alt="Logo" class="w-11" />
          <div>
            <h2 class="font-bold text-xl uppercase">Vue Sneakers</h2>
            <p class="text-slate-400">Магазин лучших кроссовок</p>
          </div>
        </div>
      </router-link>

      <ul class="flex items-center gap-10">
        <li class="flex items-center gap-3 cursor-pointer" @click="openDrawer">
          <img src="/cart.svg" alt="Cart" />
          <b>0 руб.</b>
        </li>
        <li class="flex items-center gap-3 cursor-pointer">
          <router-link to="/favorites" class="flex items-center gap-3 cursor-pointer">
            <img src="/heart.svg" alt="Favorite" />
            <span>Закладки</span>
          </router-link>
        </li>
        <li class="flex items-center gap-3 cursor-pointer">
          <img src="/profile.svg" alt="Favorite" />
          <span>Профиль</span>
        </li>
      </ul>
    </header>
    <div class="p-10">
      <h1 class="text-3xl font-bold mb-10">Мои закладки</h1>
      <div class="grid grid-cols-4 gap-10" v-auto-animate>
        <Card
          v-for="item in favorites"
          :key="item.id"
          :item="item"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Card from '../components/Card.vue'

const favorites = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get(
      'https://3d46b572465d2855.mokky.dev/favourites?_relations=items'
    )

    favorites.value = data.map((obj) => obj.item)
  } catch (error) {
    console.error(error)
  }
})
</script>

<style>
</style>