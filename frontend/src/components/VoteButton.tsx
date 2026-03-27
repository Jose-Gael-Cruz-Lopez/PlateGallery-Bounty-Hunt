import { motion } from "framer-motion";
import { useVote } from "../hooks/useVote";

type Props = {
  initialScore: number;
};

export function VoteButton({ initialScore }: Props) {
  const { selected, score, castVote } = useVote(initialScore);

  return (
    <div className="vote-stack" aria-label="Vote controls">
      <motion.button
        whileTap={{ scale: 0.88, y: 2 }}
        transition={{ type: "spring", stiffness: 380, damping: 18 }}
        className={`vote-chip ${selected === 1 ? "is-active-up" : ""}`}
        onClick={() => castVote(1)}
        type="button"
        aria-label="Upvote"
      >
        ▲
      </motion.button>
      <strong>{score}</strong>
      <motion.button
        whileTap={{ scale: 0.92, y: 2 }}
        transition={{ type: "spring", stiffness: 340, damping: 20 }}
        className={`vote-chip ${selected === -1 ? "is-active-down" : ""}`}
        onClick={() => castVote(-1)}
        type="button"
        aria-label="Downvote"
      >
        ▼
      </motion.button>
    </div>
  );
}

