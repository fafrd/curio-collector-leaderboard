import React from 'react';
import './var.css'
import './App.css';
import Addresses from './Addresses.jsx'
import Cards from './Cards.jsx'
import selectAddress from './images/Select-Collection.svg'

let GRAPH_ENDPOINT = "https://api.studio.thegraph.com/query/507/curio-cards/version/latest";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addresses: [],
      holdings: [],
      ens: {}
    };

    this.addrLimit = 10; // show down to 10 cards held
    this.ensQueue = [];
    this.processingEns = false;
  }

  async postJson(endpoint, query) {
    try {
      let resp = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      return resp.json();
    } catch (error) {
      console.error('Error while querying Graph node:', error);
    }
  }

  async getJson(endpoint) {
    try {
      let resp = await fetch(endpoint, {
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

  // Given an account, fetch the holdings for this account.
  async fetchHoldingsForAccount(account) {
    let query = `{
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
    let res = await this.postJson(GRAPH_ENDPOINT, query);
    try {
      return res["data"]['cardHolders'][0]["holdings"];
    } catch (e) {
      console.error("Unexpected response while fetching holdings for account " + account + "; response: " + JSON.stringify(res));
      throw e;
    }
  }

  // Given a number (30, 29, 28...) fetch the accounts that have this many different card types collected.
  async fetchTopHolders(uniqueCardHoldings) {
    let query = `{
        cardHolders(where: { uniqueCards_in: [${uniqueCardHoldings}] }) {
          id
        }
      }`;
    let res = await this.postJson(GRAPH_ENDPOINT, query);
    return res.data.cardHolders.map((e) => e.id);
  }

  // Process ENS lookups based on a queue.
  async fetchEnsForQueue() {
    if (this.processingEns || this.ensQueue.length === 0) return;
    this.processingEns = true;

    while (this.ensQueue.length > 0) {
      const address = this.ensQueue.shift();
      const endpoint = `https://ens.fafrd.workers.dev/ens/${address}?mode=fast`;

      try {
        const res = await this.getJson(endpoint);
        const ensName = res.reverseRecord || "";

        console.log("ENS for address", address, "is", ensName);
        this.setState((prevState) => ({
          ens: {
            ...prevState.ens,
            [address]: ensName,
          },
        }));
      } catch (e) {
        console.warn("Error when fetching ENS for address:", address, e);
      }
    }

    this.processingEns = false;
  }

  enqueueEnsLookup(addresses) {
    this.ensQueue.push(...addresses);
    this.fetchEnsForQueue();
  }

  async componentDidMount() {
    for (let i = 31; i >= this.addrLimit; i--) {
      const top = await this.fetchTopHolders(i);

      this.setState((prevState) => {
        const newAddresses = [...prevState.addresses];
        newAddresses[i] = top;
        return { addresses: newAddresses };
      });

      this.enqueueEnsLookup(top);
    }
  }

  async addressCallback(e) {
    const cardHoldings = await this.fetchHoldingsForAccount(e.target.id);
    this.setState({
      holdings: cardHoldings,
      selected: e.target.id,
    });
  }

  render() {
    const addrs = [];
    for (let i = 31; i >= this.addrLimit; i--) {
      addrs.push(<Addresses addrs={this.state.addresses[i]} key={i} ens={this.state.ens} selected={this.state.selected} title={i} callback={(e) => { this.addressCallback(e) }} />);
    }

    let cardElement;
    if (this.state.holdings.length > 0) {
      cardElement = <Cards holdings={this.state.holdings}/>;
    } else {
      cardElement = <div className="select-address">
          <img alt="Click addresses in the nav to see their card holdings" src={selectAddress} />
          <p>Select an address to view its Curio collection</p>
        </div>
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
}

export default App;
