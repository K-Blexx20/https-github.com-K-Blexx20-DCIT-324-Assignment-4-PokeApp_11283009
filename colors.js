// Flat, simple color palette — matches the "flat colours, simple icons,
// no decorative graphics" instruction in the assignment brief.

export const COLORS = {
  primary: "#E63946",
  background: "#F7F7FA",
  card: "#FFFFFF",
  text: "#1E1B2E",
  subtext: "#8A8D9F",
  border: "#ECECF2",
};

// One flat color per Pokemon type, used for badges on the card and the
// details screen.
export const TYPE_COLORS = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

export function typeColor(type) {
  return TYPE_COLORS[type] || COLORS.subtext;
}
