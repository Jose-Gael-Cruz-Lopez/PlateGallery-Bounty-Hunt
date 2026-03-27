import { useOptimistic, useState } from "react";

export function useVote(initialScore: number) {
  const [selected, setSelected] = useState<1 | -1 | 0>(0);
  const [optimisticScore, updateOptimisticScore] = useOptimistic(initialScore, (score, value: number) => score + value);

  function castVote(value: 1 | -1) {
    const delta = selected === value ? -value : selected === 0 ? value : value * 2;
    setSelected((current) => (current === value ? 0 : value));
    updateOptimisticScore(delta);
  }

  return {
    selected,
    score: optimisticScore,
    castVote
  };
}

