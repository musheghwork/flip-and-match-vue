<script setup>
const props = defineProps({
  number: Number,
  flipped: Boolean,
  matches: Boolean,
  gameMode: String,
});

const imgType = props.gameMode === "dragon" ? "png" : "jpg";

const bgUrl = props.gameMode === "dragon" ? "/back-dragon.png" : "/back.png";

function getImageUrl(number) {
  return `/${number}.${imgType}`;
}
</script>

<template>
  <div class="card-container">
    <div class="card" :class="{ flipped: props.flipped }">
      <div class="card-front" :class="{ matches: props.matches }">
        <img :src="getImageUrl(props.number)" alt="Card front" />
      </div>
      <div class="card-back">
        <img :src="bgUrl" alt="Card back" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-container {
  perspective: 1000px;
  min-width: 50px;
  max-width: 155px;
  aspect-ratio: 2 / 3;
}

.card {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s ease;
  cursor: pointer;
}

.card.flipped {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  overflow: hidden;
  border-radius: 12px;
}

.card-front img,
.card-back img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-front {
  transform: rotateY(0deg);
}

.card-back {
  transform: rotateY(180deg);
}

.matches {
  border: 3px solid rgb(35, 211, 35);
}
</style>
