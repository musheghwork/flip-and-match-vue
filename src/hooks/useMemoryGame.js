// utils/useMemoryGame.js
import { ref } from "vue";

export function useMemoryGame(initialData) {
  const data = ref(
    [...initialData].map((value) => ({
      value,
      flipped: true,
      matched: false,
    }))
  );

  const timer = ref(false);
  const firstCardIndex = ref(null);
  const secondCardIndex = ref(null);

  const handleCardClick = (index, onWin) => {
    const card = data.value[index];
    if (!card.flipped || card.matched || timer.value) return;

    card.flipped = false;

    if (firstCardIndex.value === null) {
      firstCardIndex.value = index;
    } else {
      secondCardIndex.value = index;
      timer.value = true;
      checkMatch(onWin);
    }
  };

  const checkMatch = (onWin) => {
    const firstCard = data.value[firstCardIndex.value];
    const secondCard = data.value[secondCardIndex.value];

    if (firstCard.value === secondCard.value) {
      firstCard.matched = true;
      secondCard.matched = true;
      resetSelection();
      checkWin(onWin);
    } else {
      setTimeout(() => {
        firstCard.flipped = true;
        secondCard.flipped = true;
        resetSelection();
      }, 1000);
    }
  };

  const resetSelection = () => {
    timer.value = false;
    firstCardIndex.value = null;
    secondCardIndex.value = null;
  };

  const checkWin = (onWin) => {
    if (data.value.every((card) => card.matched)) {
      setTimeout(() => {
        if (onWin) onWin();
      }, 700);
    }
  };

  return {
    data,
    handleCardClick,
  };
}
