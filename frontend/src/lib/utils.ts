import type { StateStats } from "./types";

export const stateNames: Record<string, string> = {
  AL: "Alabama",
  AK: "Alaska",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
  DC: "District of Columbia"
};

export function getHeatColor(count: number, maxCount: number) {
  if (!count) {
    return "#a8b0b8";
  }

  const ratio = maxCount === 0 ? 0 : count / maxCount;

  if (ratio < 0.25) {
    return "#9ebd8b";
  }

  if (ratio < 0.5) {
    return "#6fa56c";
  }

  if (ratio < 0.75) {
    return "#4d8e56";
  }

  return "#2f6d44";
}

export function timeAgo(value: string) {
  const now = Date.now();
  const then = new Date(value).getTime();
  const diff = Math.max(1, Math.floor((now - then) / 1000));
  const units = [
    { size: 60, label: "s" },
    { size: 60, label: "m" },
    { size: 24, label: "h" },
    { size: 7, label: "d" },
    { size: 4.345, label: "w" },
    { size: 12, label: "mo" }
  ];

  let valueOut = diff;
  let label = "s";

  for (const unit of units) {
    if (valueOut < unit.size) {
      break;
    }

    valueOut = Math.floor(valueOut / unit.size);
    label = unit.label;
  }

  return `${valueOut}${label} ago`;
}

export function formatStateLabel(abbr: string) {
  return stateNames[abbr] ?? abbr;
}

export function unlockedStates(states: StateStats[]) {
  return states.filter((state) => state.plateCount > 0).length;
}
