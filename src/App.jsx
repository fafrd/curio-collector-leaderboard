import React from 'react';
import './var.css'
import './App.css';
import Addresses from './Addresses.jsx'
import Cards from './Cards.jsx'
import selectAddress from './images/Select-Collection.svg'

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      addresses: [],
      holdings: [],
      ens: [],
    };

    this.addrLimit = 10; // show down to 10 cards held
  }

  async postJson(endpoint, query) {
    try {
        let resp = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({query})
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
            }
        });

        return resp.json();
    } catch (error) {
        console.error('Error while fetching ENS domains:', error);
    }
  }

  // Given an account, fetch the holdings for this account.
  async fetchHoldingsForAccount(account) {
    let endpoint = "https://api.thegraph.com/subgraphs/name/fafrd/curio-cards";
    let query = `{
        cardHolders(where: { id: "${account}" }) {
          id
          holdings {
            cardNumber
            balance
          }
        }
      }`;
    let res = await this.postJson(endpoint, query);
    try {
      return res["data"]['cardHolders'][0]["holdings"];
    } catch (e) {
      console.error("Unexpected response while fetching holdings for account " + account + "; response: " + JSON.stringify(res))
      throw e;
    }
  }

  // Given a number (30, 29, 28...) fetch the accounts that have this many different card types collected.
  async fetchTopHolders(uniqueCardHoldings) {
    let endpoint = "https://api.thegraph.com/subgraphs/name/fafrd/curio-cards";
    let query = `{
        cardHolders(where: { uniqueCards_in: [${uniqueCardHoldings}] }) {
          id
        }
      }`;
    let res = await this.postJson(endpoint, query);
    return res.data.cardHolders.map(e => e.id);
  }

  // Given a list of addresses, return a new array with entries set to the ENS or empty string
  async fetchEns(accounts) {
    console.debug("fetching ens for accounts " + JSON.stringify(accounts));

    let ens = new Array(accounts.length);
    for (let i = 0; i < accounts.length; i++) {
      let endpoint = `https://ens.fafrd.workers.dev/ens/${accounts[i]}`;
      let res = await this.getJson(endpoint);
      console.debug(JSON.stringify(res));

      console.debug("ens.length " + ens.length)

      if (res.reverseRecord) {
        ens[i] = res.reverseRecord;
      } else {
        ens[i] = "";
      }
    }

    return ens;
  }

  async componentDidMount() {
    for (let i = 30; i >= this.addrLimit; i--) {
      const top = await this.fetchTopHolders(i);
      let newAddresses = this.state.addresses;
      newAddresses[i] = top;

      this.setState({addresses: newAddresses});

      // asynchronously kick off ENS lookup
      (async (iter) => {
        try {
          const ens = await this.fetchEns(this.state.addresses[iter]);
          let newEns = this.state.ens;
          newEns[iter] = ens;

          this.setState({ens: newEns})
        } catch (e) { console.warn("Error when fetching ENS", e); }
      })(i);
    }
  }

  async addressCallback(e) {
    const cardHoldings = await this.fetchHoldingsForAccount(e.target.id);
    this.setState({
      holdings: cardHoldings,
      selected: e.target.id
    });
  }

  render() {
    let addrs = [];
    for (let i = 30; i >= this.addrLimit; i--) {
      addrs.push(<Addresses addrs={this.state.addresses[i]} key={i} ens={this.state.ens[i]} selected={this.state.selected} title={i} callback={(e) => { this.addressCallback(e) }} />);
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
