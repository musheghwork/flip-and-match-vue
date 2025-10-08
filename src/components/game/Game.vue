<script setup>
import createData from "../../utils/data";
import { ref } from "vue";
import Cart from "../cart/Cart.vue";

const data = ref(
  [...createData()].map((value) => ({
    value,
    flipped: true,
    matched: false,
  }))
);
let timer = ref(false);
let firstCardIndex = ref(null);
let secondCardIndex = ref(null);

function handleCardClick(index) {
  const card = data.value[index];
  if (!card.flipped || card.matched || timer.value) return;

  card.flipped = false;

  if (firstCardIndex.value === null) {
    firstCardIndex.value = index;
  } else {
    timer.value = true;
    secondCardIndex.value = index;
    if (data.value[firstCardIndex.value].value === card.value) {
      data.value[firstCardIndex.value].matched = true;
      card.matched = true;

      resetSelection();
      checkWin();
    } else {
      setTimeout(() => {
        data.value[firstCardIndex.value].flipped = true;
        data.value[secondCardIndex.value].flipped = true;

        resetSelection();
      }, 1000);
    }
  }
}

function checkWin() {
  const allMatched = data.value.every((element) => element.matched === true);
  if (allMatched) {
    setTimeout(() => {
      alert("You WIN!");
    }, 700);
  }
}
function resetSelection() {
  timer.value = false;
  firstCardIndex.value = null;
  secondCardIndex.value = null;
}
</script>

<template>
  <div class="contet">
    <Cart
      v-for="(item, index) in data"
      :key="index"
      :number="item.value"
      :flipped="item.flipped"
      :matches="item.matched"
      @click="handleCardClick(index)"
    />
  </div>
</template>

<style scoped>
.contet {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-top: -100px;
}
</style>
