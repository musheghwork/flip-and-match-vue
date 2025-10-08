<script setup>
const props = defineProps({
  number: Number,
  flipped: Boolean,
  matches: Boolean,
});
function getImageUrl(number) {
  return new URL(`../../assets/${number}.jpg`, import.meta.url).href;
}
</script>

<template>
  <div class="card-container">
    <div class="card" :class="{ flipped: props.flipped }">
      <div class="card-front" :class="{ matches: props.matches }">
        <img :src="getImageUrl(number)" />
      </div>
      <div class="card-back">
        <img src="../../assets/back.png" alt="Card back" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-container {
  perspective: 1000px;
  width: 190px;
  height: 200px;
}

.card {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  cursor: pointer;
}

.card.flipped {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  position: absolute;
  width: 155px;
  height: 230px;
  backface-visibility: hidden;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 7em;
}

.card-front {
  left: 70px;
  top: 50px;
  background-color: #f2f2f2;
  height: 190px;
  width: 140px;
  color: #333;
  overflow: hidden;
}
.card-front img {
  height: 190px;
  width: 130px;
}

.card-back {
  transform: rotateY(180deg);
  overflow: hidden;
}

img {
  height: 230px;
  object-fit: cover;
  border-radius: 12px;
}
.matches {
  background-color: rgb(35, 211, 35);
}
</style>
