export function Logo() {
  return (
    <svg
      width="56"
      height="34"
      viewBox="0 0 56 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="PlateGallery"
    >
      <defs>
        <linearGradient id="pgPlate" x1="0" y1="0" x2="56" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f5b731" />
          <stop offset="1" stopColor="#c47200" />
        </linearGradient>
        <linearGradient id="pgShine" x1="0" y1="0" x2="0" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="rgba(255,255,255,0.18)" />
          <stop offset="0.5" stopColor="rgba(255,255,255,0.00)" />
        </linearGradient>
      </defs>
      {/* Plate body */}
      <rect width="56" height="34" rx="5" fill="url(#pgPlate)" />
      {/* Top shine */}
      <rect width="56" height="34" rx="5" fill="url(#pgShine)" />
      {/* Inner frame */}
      <rect x="3" y="3" width="50" height="28" rx="3" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.75" />
      {/* Mounting screws */}
      <circle cx="9" cy="17" r="2.25" fill="rgba(0,0,0,0.28)" />
      <circle cx="9" cy="17" r="1" fill="rgba(0,0,0,0.35)" />
      <circle cx="47" cy="17" r="2.25" fill="rgba(0,0,0,0.28)" />
      <circle cx="47" cy="17" r="1" fill="rgba(0,0,0,0.35)" />
      {/* PG lettering */}
      <text
        x="28"
        y="23"
        textAnchor="middle"
        fill="white"
        fontSize="16"
        fontWeight="900"
        fontFamily="'Bebas Neue', Impact, 'Arial Black', sans-serif"
        letterSpacing="3"
        style={{ userSelect: "none" }}
      >
        PG
      </text>
    </svg>
  );
}
