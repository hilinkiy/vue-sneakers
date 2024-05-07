<script setup>
import { onMounted, ref, computed, watchEffect, provide, watch } from 'vue'
import axios from 'axios'
import Card from '../components/Card.vue'
import Drawer from '../components/Drawer.vue'

const items = ref([])
const selectedSort = ref('title')
const drawerOpen = ref(false)
const cartItems = ref([])
const isOrder = ref(false)

const closeDrawer = () => {
  drawerOpen.value = false
}

const openDrawer = () => {
  drawerOpen.value = true
}

const fetchFavourites = async () => {
  try {
    const { data: favourites } = await axios.get('https://3d46b572465d2855.mokky.dev/favourites')
    items.value = items.value.map((item) => {
      const favourite = favourites.find((favourite) => favourite.item_id === item.id)

      if (!favourite) {
        return item
      }
      return {
        ...item,
        isFavourite: true,
        favouriteId: favourite.id
      }
    })
  } catch (error) {
    console.error(error)
  }
}

const getItems = async () => {
  try {
    const { data } = await axios.get('https://3d46b572465d2855.mokky.dev/items')
    items.value = data.map((obj) => ({
      ...obj,
      isFavourite: false,
      isAdded: false,
      favouriteId: null
    }))
  } catch (error) {
    console.error(error)
  }
}

const totalPrice = computed(() => cartItems.value.reduce((acc, item) => acc + item.price, 0))
const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100))

const remove = (item) => {
  cartItems.value.splice(cartItems.value.indexOf(item), 1)
  item.isAdded = false
}

const add = (item) => {
  cartItems.value.push(item)
  item.isAdded = true
}

const addToCart = (item) => {
  if (!item.isAdded) {
    add(item)
  } else {
    remove(item)
  }

  console.log(cartItems)
}

const cartIsEmpty = computed(() => cartItems.value.length === 0)

const cartButtonDisbled = computed(() => isOrder.value || cartIsEmpty.value)

const createOrder = async () => {
  try {
    isOrder.value = true
    const { data } = await axios.post('https://3d46b572465d2855.mokky.dev/orders', {
      items: cartItems.value,
      price: totalPrice.value
    })

    cartItems.value = []
    return data
  } catch (error) {
    console.error(error)
  } finally {
    setTimeout(() => {
      isOrder.value = false
    }, 3000)
  }
}

onMounted(async () => {
  const localCart = localStorage.getItem('cartItems')
  cartItems.value = localCart ? JSON.parse(localCart) : []

  await getItems()
  await fetchFavourites()

  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cartItems.value.some((cartItem) => cartItem.id === item.id)
  }))
})

const sortItems = () => {
  if (items.value) {
    items.value.sort((a, b) => {
      if (selectedSort.value === 'title') {
        return (a.title || '').localeCompare(b.title || '')
      } else if (selectedSort.value === 'price') {
        return (a.price || 0) - (b.price || 0)
      } else if (selectedSort.value === '-price') {
        return (b.price || 0) - (a.price || 0)
      }

      return (a.title || '').localeCompare(b.title || '')
    })
  }
}

const addToFavourite = async (item) => {
  try {
    if (!item.isFavourite) {
      const obj = {
        item_id: item.id,
        item
      }
      item.isFavourite = true
      const { data } = await axios.post('https://3d46b572465d2855.mokky.dev/favourites', obj)
      console.log(data)
      item.favouriteId = data.id
    } else {
      item.isFavourite = false
      await axios.delete(`https://3d46b572465d2855.mokky.dev/favourites/${item.favouriteId}`)
      item.favouriteId = null
    }
  } catch (error) {
    console.error(error)
  }
}

watchEffect(() => {
  sortItems()
})

watch(cartItems, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false
  }))
})

watch(
  cartItems,
  () => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems.value))
  },
  { deep: true }
)

provide('remove', remove)
</script>

<template>
  <div>
    <Drawer
      v-if="drawerOpen"
      :closeDrawer="() => closeDrawer()"
      :cartItems="cartItems"
      :totalPrice="totalPrice"
      :vatPrice="vatPrice"
      :createOrder="() => createOrder()"
      :cartButtonDisbled="cartButtonDisbled"
      :isOrder="isOrder"
    />
  </div>
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
          <b>{{ totalPrice }} руб.</b>
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
      <div class="flex justify-between items-center mb-10">
        <h1 class="text-3xl font-bold">Все кроссовки</h1>
        <div class="flex items-center gap-4">
          <select
            class="py-2 px-3 border border-gray-200 focus:border-gray-400 rounded-md focus:outline-none"
            @change="sortItems"
            v-model="selectedSort"
          >
            <option value="title">По названию</option>
            <option value="price">По цене (дешевые)</option>
            <option value="-price">По цене (дорогие)</option>
          </select>
          <div class="relative">
            <input
              type="text"
              class="border border-gray-200 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:border-gray-400"
              placeholder="Поиск..."
            />
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <img src="/search.svg" />
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-4 gap-10" v-auto-animate>
        <Card
          v-for="item in items"
          :key="item.id"
          :item="item"
          :isFavourite="item.isFavourite"
          :isAdded="item.isAdded"
          :id="item.id"
          :onClickFavourite="() => addToFavourite(item)"
          :onClickAdd="() => addToCart(item)"
        />
      </div>
    </div>
  </div>
</template>
