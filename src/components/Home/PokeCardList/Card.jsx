import capitalizeEachWord from "../../CapitalizeEachWord";
import "./Card.css";
import pokeBall from "../../../assets/Pokeball.png";

const typeColors = {
  normal: { bg: "#f3dfd7", text: "#333" },
  fire: { bg: "#fa522e", text: "#f5f5f5" },
  water: { bg: "#2ec5fa", text: "#333" },
  grass: { bg: "#62d857", text: "#f5f5f5" },
  electric: { bg: "#e6ed18", text: "#333" },
  ice: { bg: "#25eee3", text: "#333" },
  fighting: { bg: "#e5a96c", text: "#f5f5f5" },
  poison: { bg: "#c63ccd", text: "#f5f5f5" },
  ground: { bg: "#b27118", text: "#f5f5f5" },
  flying: { bg: "#c1f5f0", text: "#333" },
  psychic: { bg: "#ff79fb", text: "#f5f5f5" },
  bug: { bg: "#3dd02f", text: "#f5f5f5" },
  rock: { bg: "#b7b7b7", text: "#333" },
  ghost: { bg: "#96739a", text: "#f5f5f5" },
  dragon: { bg: "#6c5fda", text: "#f5f5f5" },
  dark: { bg: "#585858", text: "#f5f5f5" },
  steel: { bg: "#9ed1d6", text: "#333" },
  fairy: { bg: "#fea5fc", text: "#333" },
  default: { bg: "#333", text: "#f5f5f5" },
};

export default function Card({ image, id, name, types }) {
  return (
    <div
      className="flex flex-col justify-center text-[17px] basis-[calc(50%-50px)] md:basis-[calc(25%-90px)] text-center gap-4 rounded-2xl border-y-7 border-x-3 border-x-(--dark) border-y-(--red) shadow-2xl"
      style={{ paddingBlock: "1rem" }}
    >
      <img src={image} alt={name} />
      <div
        className="flex flex-col justify-center gap-2 border-t-2 relative"
        style={{ paddingTop: "2rem" }}
      >
        <div className="flex justify-center">
          <img
            src={pokeBall}
            alt="Poke Ball"
            className="w-10 absolute top-0 -translate-y-[21px]"
          />
        </div>
        <div>
          <span
            className="bg-(--red) rounded-[10px] text-(--white)"
            style={{ paddingInline: "12px", paddingBlock: "2px" }}
          >
            #{id}
          </span>
        </div>
        <span>{capitalizeEachWord(name)}</span>
        <div className="flex-wrap gap-2 justify-center flex">
          {types.map((type) => {
            const colors = typeColors[type] || typeColors.default;
            const backgroundColor = colors.bg;
            const textColor = colors.text;

            return (
              <span
                key={type}
                style={{
                  backgroundColor: backgroundColor,
                  color: textColor,
                  paddingInline: "1rem",
                  paddingBlock: "0.2rem",
                }}
                className="rounded-[10px] shadow"
              >
                {capitalizeEachWord(type)}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
