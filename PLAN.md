# Modernization Plan

## Done
- [x] Migrate from Create React App to Vite
- [x] Upgrade React 17 → 19
- [x] Update `src/index.jsx` to use `createRoot` (React 18+ API)
- [x] Upgrade `@testing-library/react` and other testing libs to match
- [x] Convert `App.jsx` from class component to functional component with hooks
- [x] Convert `Addresses.jsx` to functional component
- [x] Convert `Cards.jsx` to functional component
- [x] Convert `Footer.jsx` to functional component
- [x] Move `GRAPH_ENDPOINT` and `ENS_ENDPOINT` to `.env` (`VITE_` prefix)
- [x] Replace 30 individual image imports in `Cards.jsx` with dynamic lookup
- [x] Replace `href="#"` anchors in `Addresses.jsx` with `<button>` elements
- [x] Fix pre-existing CSS warnings (`@import` ordering in `var.css`, trailing comma in `App.css`)

## To Do

### TypeScript (optional)
- [ ] Add TypeScript (`vite --template react-ts`)
- [ ] Type the GraphQL response shapes
- [ ] Type component props
