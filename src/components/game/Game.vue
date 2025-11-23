<script setup>
import { ref } from "vue";
import Cart from "../cart/Cart.vue";
import { useGame } from "../../hooks/useGame";

const { data, gameStarted, startGame, handleCardClick } = useGame();

const gameMode = ref("classic");

function chageGameMod(props) {
  gameStarted.value = false;
  gameMode.value = props;
  if (!gameStarted.value) return;
  startGame();
}
function rematch() {
  if (!gameStarted.value) return;
  startGame();
}
</script>

<template>
  <div class="settings">
    <div class="mode-block">
      <h3>Game Mode</h3>
      <button
        :class="{ active: gameMode === 'classic' }"
        @click="chageGameMod('classic')"
      >
        Classic
      </button>
      <button
        :class="{ active: gameMode === 'dragon' }"
        @click="chageGameMod('dragon')"
      >
        Dragon
      </button>
    </div>
  </div>
  <div class="game-buttons">
    <button @click="startGame" class="start-btn" :disabled="!!gameStarted">
      Start
    </button>
    <button @click="rematch" class="rematch-btn" :disabled="!gameStarted">
      Rematch
    </button>
  </div>

  <div class="contet" v-if="gameStarted">
    <Cart
      v-for="(item, index) in data"
      :gameMode="gameMode"
      :key="index"
      :number="item.value"
      :flipped="item.flipped"
      :matches="item.matched"
      @click="handleCardClick(index)"
    />
  </div>
</template>

<style scoped>
.settings h3 {
  font-weight: 600;
  font-size: 30px;
  color: #764ba2;
}
.settings {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin: 20px;
  text-align: center;
}

.settings button {
  margin: 5px;
  padding: 10px 18px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  transition: 0.2s;
}

.settings button.active {
  background: #764ba2;
  color: white;
  transform: scale(1.05);
}

.game-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 25px;
}

.start-btn,
.rematch-btn {
  padding: 12px 25px;
  font-size: 16px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  background: #667eea;
  color: white;
  transition: 0.25s;
}

.rematch-btn:disabled {
  background: #bbb;
  cursor: not-allowed;
}

.start-btn:hover,
.rematch-btn:hover:not(:disabled) {
  transform: scale(1.07);
}

.contet {
  display: grid;
  grid-template-columns: repeat(4, minmax(50px, 170px));
  gap: 30px;
  width: fit-content;
  max-height: 90vh;
  max-width: 100vw;
  padding: 40px;
  border-radius: 20px;
  margin: 20px auto;
}

@media (max-width: 450px) {
  .contet {
    gap: 10px;
    padding: 10px;
  }
}
</style>
