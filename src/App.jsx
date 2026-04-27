import { useState, useEffect, useRef } from 'react';
import './var.css'
import './App.css';
import Addresses from './Addresses.jsx'
import Cards from './Cards.jsx'
import selectAddress from './images/Select-Collection.svg'

const GRAPH_ENDPOINT = import.meta.env.VITE_GRAPH_ENDPOINT;
const ENS_ENDPOINT = import.meta.env.VITE_ENS_ENDPOINT;
const ADDR_LIMIT = 10;
const PAGE_SIZE = 1000;

function App() {
  const [addresses, setAddresses] = useState([]);
  const [holdings, setHoldings] = useState([]);
  const [ens, setEns] = useState({});
  const [selected, setSelected] = useState(null);
  const ensQueue = useRef([]);
  const processingEns = useRef(false);

  async function postJson(endpoint, query) {
    try {
      const resp = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
      const json = await resp.json();
      if (json.errors) {
        throw new Error(JSON.stringify(json.errors));
      }
      return json;
    } catch (error) {
      console.error('Error while querying Graph node:', error);
    }
  }

  async function getJson(endpoint) {
    try {
      const resp = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      return resp.json();
    } catch (error) {
      console.error('Error while fetching ENS domains:', error);
    }
  }

  async function fetchHoldingsForAccount(account) {
    const query = `{
        cardHolders(where: { id: "${account}" }) {
          id
          holdings {
            type {
              name
            }
            wrappedOfficial
            wrappedUnofficial
            unwrapped
          }
        }
      }`;
    const res = await postJson(GRAPH_ENDPOINT, query);
    try {
      return res["data"]['cardHolders'][0]["holdings"];
    } catch (e) {
      console.error("Unexpected response while fetching holdings for account " + account + "; response: " + JSON.stringify(res));
      throw e;
    }
  }

  async function fetchPositiveBalances(skip) {
    const query = `{
        cardBalances(
          first: ${PAGE_SIZE}
          skip: ${skip}
          where: {
            or: [
              { unwrapped_gt: 0 }
              { wrappedOfficial_gt: 0 }
              { wrappedUnofficial_gt: 0 }
            ]
          }
        ) {
          id
          user {
            id
          }
          type {
            id
          }
          unwrapped
          wrappedOfficial
          wrappedUnofficial
        }
      }`;
    const res = await postJson(GRAPH_ENDPOINT, query);
    return res.data.cardBalances;
  }

  async function fetchLeaderboardAddresses() {
    const uniqueCardsByHolder = {};

    for (let skip = 0; ; skip += PAGE_SIZE) {
      const balances = await fetchPositiveBalances(skip);
      if (!balances || balances.length === 0) break;

      for (const balance of balances) {
        const total =
          Number(balance.unwrapped) +
          Number(balance.wrappedOfficial) +
          Number(balance.wrappedUnofficial);
        if (total <= 0) continue;

        const holder = balance.user.id;
        if (!uniqueCardsByHolder[holder]) {
          uniqueCardsByHolder[holder] = new Set();
        }
        uniqueCardsByHolder[holder].add(balance.type.id);
      }

      if (balances.length < PAGE_SIZE) break;
    }

    const addressesByUniqueCards = [];
    for (const holder of Object.keys(uniqueCardsByHolder)) {
      const uniqueCards = uniqueCardsByHolder[holder].size;
      if (uniqueCards >= ADDR_LIMIT) {
        if (!addressesByUniqueCards[uniqueCards]) {
          addressesByUniqueCards[uniqueCards] = [];
        }
        addressesByUniqueCards[uniqueCards].push(holder);
      }
    }

    return addressesByUniqueCards;
  }

  async function fetchEnsForQueue() {
    if (processingEns.current || ensQueue.current.length === 0) return;
    processingEns.current = true;

    while (ensQueue.current.length > 0) {
      const address = ensQueue.current.shift();
      const endpoint = `${ENS_ENDPOINT}/ens/${address}?mode=fast`;

      try {
        const res = await getJson(endpoint);
        const ensName = res.reverseRecord || "";

        console.log("ENS for address", address, "is", ensName);
        setEns((prev) => ({ ...prev, [address]: ensName }));
      } catch (e) {
        console.warn("Error when fetching ENS for address:", address, e);
      }
    }

    processingEns.current = false;
  }

  function enqueueEnsLookup(addrs) {
    ensQueue.current.push(...addrs);
    fetchEnsForQueue();
  }

  useEffect(() => {
    async function load() {
      const leaderboardAddresses = await fetchLeaderboardAddresses();
      setAddresses(leaderboardAddresses);

      for (let i = 31; i >= ADDR_LIMIT; i--) {
        enqueueEnsLookup(leaderboardAddresses[i] || []);
      }
    }

    load();
  }, []);

  async function addressCallback(address) {
    const cardHoldings = await fetchHoldingsForAccount(address);
    setHoldings(cardHoldings);
    setSelected(address);
  }

  const addrs = [];
  for (let i = 31; i >= ADDR_LIMIT; i--) {
    addrs.push(
      <Addresses
        addrs={addresses[i]}
        key={i}
        ens={ens}
        selected={selected}
        title={i}
        callback={addressCallback}
      />
    );
  }

  let cardElement;
  if (holdings.length > 0) {
    cardElement = <Cards holdings={holdings} />;
  } else {
    cardElement = (
      <div className="select-address">
        <img alt="Click addresses in the nav to see their card holdings" src={selectAddress} />
        <p>Select an address to view its Curio collection</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="title-wrapper">
        <header className="title">Curio Card Leaderboard</header>
      </div>
      <div className="app">
        <nav>
          {addrs}
        </nav>
        <aside>
          {cardElement}
        </aside>
      </div>
    </div>
  );
}

export default App;
