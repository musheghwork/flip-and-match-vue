import { ref } from "vue";
import createData from "../utils/data";

export function useGame() {
  const data = ref([]);
  const timer = ref(false);
  const firstCardIndex = ref(null);
  const secondCardIndex = ref(null);
  const gameStarted = ref(false);

  function generateCards() {
    return [...createData()].map((value) => ({
      value,
      flipped: true,
      matched: false,
    }));
  }

  function startGame() {
    data.value = generateCards();
    firstCardIndex.value = null;
    secondCardIndex.value = null;
    timer.value = false;
    gameStarted.value = true;
  }

  function resetSelection() {
    timer.value = false;
    firstCardIndex.value = null;
    secondCardIndex.value = null;
  }

  function checkWin(onWin) {
    const allMatched = data.value.every((c) => c.matched === true);
    if (allMatched) {
      setTimeout(() => {
        onWin(), (gameStarted.value = false);
      }, 1000);
    }
  }

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
        checkWin(() => alert("You WIN!"));
      } else {
        setTimeout(() => {
          data.value[firstCardIndex.value].flipped = true;
          data.value[secondCardIndex.value].flipped = true;
          resetSelection();
        }, 1000);
      }
    }
  }

  return {
    data,
    timer,
    gameStarted,
    startGame,
    handleCardClick,
    resetSelection,
  };
}
