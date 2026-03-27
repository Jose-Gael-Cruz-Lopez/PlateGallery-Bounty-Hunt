type Props = {
  plateText: string;
  state: string;
  accent?: "amber" | "teal";
};

export function PlateFrame({ plateText, state, accent = "amber" }: Props) {
  return (
    <div className={`plate-frame plate-frame--${accent}`}>
      <span className="plate-frame__bolt plate-frame__bolt--tl" />
      <span className="plate-frame__bolt plate-frame__bolt--tr" />
      <span className="plate-frame__bolt plate-frame__bolt--bl" />
      <span className="plate-frame__bolt plate-frame__bolt--br" />
      <div className="plate-frame__state">{state}</div>
      <div className="plate-frame__text">{plateText || "YOURTAG"}</div>
      <div className="plate-frame__strip">PlateGallery Road Club</div>
    </div>
  );
}

