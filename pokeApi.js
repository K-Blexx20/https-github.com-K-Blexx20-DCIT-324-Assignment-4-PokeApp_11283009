// Thin wrapper around the public PokeAPI (https://pokeapi.co/).
// No API key needed. Screens call these from inside useEffect.

const BASE_URL = "https://pokeapi.co/api/v2";

// Official artwork sprites are hosted in PokeAPI's sprites repo and are
// addressable by Pokemon id, which is more reliable than parsing sprite
// URLs out of the list response.
export function artworkUrl(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

// Pulls the numeric id out of a PokeAPI resource URL like
// "https://pokeapi.co/api/v2/pokemon/25/"
function idFromUrl(url) {
  const parts = url.split("/").filter(Boolean);
  return Number(parts[parts.length - 1]);
}

// GET /pokemon?limit=...&offset=...
// Returns a simplified list: [{ id, name, image }]
export async function fetchPokemonList(limit = 40, offset = 0) {
  const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  if (!response.ok) {
    throw new Error(`Failed to load Pokemon list (status ${response.status})`);
  }
  const data = await response.json();
  return data.results.map((entry) => {
    const id = idFromUrl(entry.url);
    return {
      id,
      name: entry.name,
      image: artworkUrl(id),
    };
  });
}

// GET /pokemon/{name or id}
// Returns the fields the Details screen needs: name, id, image, types,
// height (m), weight (kg), and base stats.
export async function fetchPokemonDetails(nameOrId) {
  const response = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);
  if (!response.ok) {
    throw new Error(`Failed to load Pokemon details (status ${response.status})`);
  }
  const data = await response.json();
  return {
    id: data.id,
    name: data.name,
    image: artworkUrl(data.id),
    types: data.types.map((t) => t.type.name),
    // PokeAPI reports height in decimetres and weight in hectograms.
    heightM: data.height / 10,
    weightKg: data.weight / 10,
    stats: data.stats.map((s) => ({
      name: s.stat.name,
      value: s.base_stat,
    })),
  };
}
