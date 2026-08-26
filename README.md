# Pokedex App — DCIT 324 Assignment 4

A React Native (Expo) Pokemon browser: a Home screen that lists live
Pokemon from PokeAPI, a Details screen with type/height/weight/stats, and
three layers of navigation — stack, bottom tabs, and a drawer.

## What's included

- **Reusable `PokemonCard`** (`src/components/PokemonCard.js`) — takes
  `name`, `image`, `number`, and `onPress` as props; keeps its own
  favourite-toggle state internally with `useState`
- **Reusable `TypeBadge`** (`src/components/TypeBadge.js`) — a small flat
  pill colored per Pokemon type
- **Home screen** (`src/screens/HomeScreen.js`) — fetches the Pokemon
  list on mount with `useEffect` + `fetch` (via `src/api/pokeApi.js`),
  shows a loading spinner while fetching and a retry message on failure,
  and renders results in a 2-column grid of `PokemonCard`s
- **Details screen** (`src/screens/PokemonDetailsScreen.js`) — reads the
  tapped Pokemon's `name`/`id` from `route.params`, fetches its full
  detail record, and shows type badges, height, weight, and base stats
- **Bottom tabs** — Home and About (`src/navigation/MainTabs.js`)
- **Drawer** — wraps the tabs and adds Settings, Help & Support, and a
  Logout action with a confirmation alert (`src/navigation/RootDrawer.js`,
  using a custom `drawerContent` so Logout can run code instead of
  navigating to a screen)
- **Root stack** (`src/navigation/RootNavigator.js`) — sits above the
  drawer so the Details screen opens full-screen, covering the tab bar
  and drawer, when a card is tapped

## Project structure

```
PokedexApp/
├── App.js                          # GestureHandlerRootView + RootNavigator
├── app.json
├── babel.config.js                 # includes the reanimated plugin (needed by the drawer)
├── package.json
├── assets/
└── src/
    ├── api/pokeApi.js              # fetchPokemonList, fetchPokemonDetails
    ├── theme/colors.js             # flat colors + per-type color map
    ├── components/
    │   ├── PokemonCard.js
    │   └── TypeBadge.js
    ├── navigation/
    │   ├── RootNavigator.js        # Stack: RootDrawer, PokemonDetails
    │   ├── RootDrawer.js           # Drawer: Pokedex (tabs), Settings, Help & Support, Logout
    │   └── MainTabs.js             # Bottom tabs: Home, About
    └── screens/
        ├── HomeScreen.js
        ├── PokemonDetailsScreen.js
        ├── AboutScreen.js
        ├── SettingsScreen.js
        └── HelpSupportScreen.js
```

## Data source

All Pokemon data comes from [PokeAPI](https://pokeapi.co) — free, no
signup or key required:

- `GET /pokemon?limit=&offset=` — the list on the Home screen
- `GET /pokemon/{name or id}` — full details (types, height, weight,
  base stats) on the Details screen

Artwork is pulled from PokeAPI's sprite repo by Pokemon id, since the
list endpoint doesn't include images directly.

## Run it locally

```bash
npm install
npx expo install --fix
npx expo start
```

`expo install --fix` corrects any dependency versions that don't match
your installed Expo SDK — Expo Go only supports the current SDK version,
so this step avoids a red error screen on your phone even if `npm install`
finished without errors. Scan the QR code with **Expo Go**, or press `a`
for an Android emulator / `i` for an iOS simulator.

You'll need an internet connection on your phone/emulator for the app to
load any Pokemon — it fetches everything live from PokeAPI.
