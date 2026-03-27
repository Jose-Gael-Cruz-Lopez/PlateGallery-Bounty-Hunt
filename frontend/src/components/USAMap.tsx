import { motion } from "framer-motion";
import { USAMap } from "@mirawision/usa-map-react";
import { useNavigate } from "react-router-dom";
import { formatStateLabel, getHeatColor } from "../lib/utils";
import type { StateStats } from "../lib/types";

type Props = {
  states: StateStats[];
};

export function USAMapPanel({ states }: Props) {
  const navigate = useNavigate();
  const maxCount = Math.max(...states.map((item) => item.plateCount), 0);

  const stateSettings = Object.fromEntries(
    states.map((state) => [
      state.state,
      {
        fill: getHeatColor(state.plateCount, maxCount),
        onClick: () => navigate(`/state/${state.state}`),
        tooltip: {
          enabled: true,
          render: () => (
            <div className="map-tooltip">
              <strong>{formatStateLabel(state.state)}</strong>
              <span>{state.plateCount} plates</span>
            </div>
          )
        }
      }
    ])
  );

  return (
    <motion.div
      className="map-shell"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <USAMap stateSettings={stateSettings} />
    </motion.div>
  );
}
