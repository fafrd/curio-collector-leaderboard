# Curio Cards Leaderboard

Leaderboard for the top [curio.cards](https://curio.cards) holders. Curio Cards is an early NFT-like project on Ethereum- think trading cards on a blockchain.

View the site:
### [leaderboard.curio.cards](https://leaderboard.curio.cards)

## How it works

The cool part of this project is actually the subgraph I created- [github.com/fafrd/curio-cards-subgraph](https://github.com/fafrd/curio-cards-subgraph)

This uses [Graph Protcol's indexing tech](https://github.com/graphprotocol/graph-node/blob/master/docs/getting-started.md) to index the blockchain, creating a 'subgraph' of curio-specific data that can then be queried easily.

## Developing

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

