<script setup>
import CartItem from './CartItem.vue'
import { inject } from 'vue'
import InfoBlock from './InfoBlock.vue'

const remove = inject('remove')

defineProps({
  closeDrawer: Function,
  cartItems: Array,
  removeFromCart: Function,
  totalPrice: Number,
  vatPrice: Number,
  cartButtonDisbled: Boolean,
  createOrder: Function,
  isOrder: Boolean
})
</script>

<template>
  <div class="fixed z-10 top-0 h-full w-full bg-black opacity-70" />
  <div
    class="drawer flex flex-col justify-between fixed h-full z-20 top-0 h-full right-0 w-96 bg-white px-10 py-7"
  >
    <h2 class="text-2xl font-bold mb-10 flex items-center gap-5">
      <svg
        class="rotate-180 hover:-translate-x-1 opacity-30 hover:opacity-100 transition cursor-pointer"
        width="16"
        height="14"
        viewBox="0 0 16 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        @click="closeDrawer"
      >
        <path
          d="M1 7H14.7143"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8.71436 1L14.7144 7L8.71436 13"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      Корзина
    </h2>
    <div class="flex flex-col flex-1 justify-between">
      <div class="flex flex-col gap-5" v-auto-animate>
        <CartItem
          v-for="item in cartItems"
          :key="item.id"
          :item="item"
          @remove="() => remove(item)"
        />
      </div>
      <InfoBlock
        v-if="!totalPrice"
        title="Корзина пустая"
        description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
        imageUrl="../../public/box.png"
      />
      <div>
        <div class="flex flex-col gap-5" v-if="totalPrice">
          <div class="flex items-end gap-2">
            <span>Итого:</span>
            <div class="flex-1 border-b border-dashed" />
            <span class="font-bold">{{ totalPrice }} руб.</span>
          </div>

          <div class="flex items-end gap-2">
            <span>Налог 5%:</span>
            <div class="flex-1 border-b border-dashed" />
            <span class="font-bold">{{ vatPrice }} руб.</span>
          </div>
        </div>

        <button
          v-if="totalPrice"
          :disabled="cartButtonDisbled"
          class="flex justify-center items-center gap-3 w-full py-3 mt-10 bg-lime-500 text-white rounded-xl transition active:bg-lime-700 hover:bg-lime-600"
          @click="createOrder"
        >
          Оформить заказ
          <img src="/arrow-next.svg" alt="Arrow" />
        </button>
      </div>
    </div>
  </div>
  <div class="close" @click="closeDrawer"></div>
  <div>
    <div
      v-if="isOrder"
      class="order shadow-xl w-full border border-slate-100 rounded-xl p-8 cursor-pointer"
    >
      <img src="../../public/order-success-icon.png" alt="" />
      <p>Заказ успешно оформлен!</p>
    </div>
  </div>
</template>

<style scoped>
.drawer {
  overflow-y: scroll;
}
.close {
  background: transparent;
  width: 100%;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 11;
}

button:disabled {
  background: rgb(128, 128, 128, 0.6);
}

.order {
  width: 500px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999999;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: white;
  gap: 20px;
  flex-direction: column;
}

p {
  text-align: center;
}
</style>