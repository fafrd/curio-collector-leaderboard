# Modernization Plan

## Done
- [x] Migrate from Create React App to Vite

## To Do

### React upgrade
- [ ] Upgrade React 17 → 19
- [ ] Update `src/index.jsx` to use `createRoot` (React 18+ API)
- [ ] Upgrade `@testing-library/react` and other testing libs to match

### Hooks migration
- [ ] Convert `App.jsx` from class component to functional component with hooks
- [ ] Convert `Addresses.jsx` to functional component
- [ ] Convert `Cards.jsx` to functional component
- [ ] Convert `Footer.jsx` to functional component

### TypeScript (optional)
- [ ] Add TypeScript (`vite --template react-ts`)
- [ ] Type the GraphQL response shapes
- [ ] Type component props

### Quick wins
- [ ] Move `GRAPH_ENDPOINT` and `ENS_ENDPOINT` to `.env` (`VITE_` prefix)
- [ ] Replace 30 individual image imports in `Cards.jsx` with dynamic lookup
- [ ] Replace `href="#"` anchors in `Addresses.jsx` with `<button>` elements
- [ ] Fix pre-existing CSS warnings (`@import` ordering in `var.css`, trailing comma in `App.css`)
