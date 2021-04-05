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

  async queryGraph(endpoint, query) {
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

  // Given an account, fetch the holdings for this account.
  async fetchHoldingsForAccount(account) {
    let endpoint = "https://graph.wizwar.net/subgraphs/id/QmeCq9tzDQ5f6TJvPS5VKFSu5AEN9gtXcM2hyMcqBGjFkH";
    let query = `{
        cardHolders(where: { id: "${account}" }) {
          id
          holdings {
            cardNumber
            balance
          }
        }
      }`;
    let res = await this.queryGraph(endpoint, query);
    try {
      return res["data"]['cardHolders'][0]["holdings"];
    } catch (e) {
      console.error("Unexpected response while fetching holdings for account " + account + "; response: " + JSON.stringify(res))
      throw e;
    }
  }

  // Given a number (30, 29, 28...) fetch the accounts that have this many different card types collected.
  async fetchTopHolders(uniqueCardHoldings) {
    let endpoint = "https://graph.wizwar.net/subgraphs/id/QmeCq9tzDQ5f6TJvPS5VKFSu5AEN9gtXcM2hyMcqBGjFkH";
    let query = `{
        cardHolders(where: { uniqueCards_in: [${uniqueCardHoldings}] }) {
          id
        }
      }`;
    let res = await this.queryGraph(endpoint, query);
    return res.data.cardHolders.map(e => e.id);
  }

  // Given a list of addresses, return a new array with entries set to the ENS or empty string
  async fetchEns(accounts) {
    console.log("fetching ens for accounts " + JSON.stringify(accounts));

    let endpoint = "https://graph.wizwar.net/subgraphs/id/Qmb5arRTXt2DJCPakb8iptE5mhVwNVZR5ZZR5Sm3QhvZa8";
    let query = `{
        ${accounts.map(addr => {
            return `
                addr_${addr}: domains(where:{owner:"${addr.toLowerCase()}"}) {
                    name
                }
            `;
        })}
    }`;

    let res = await this.queryGraph(endpoint, query);
    console.log(JSON.stringify(res));

    let ens = new Array(accounts.length);
    console.log("ens.length " + ens.length)

    for (let i = 0; i < accounts.length; i++) {
      if (res.data["addr_" + accounts[i]].length > 0) {
        ens[i] = res.data["addr_" + accounts[i]][0].name;
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
      addrs.push(<Addresses addrs={this.state.addresses[i]} ens={this.state.ens[i]} selected={this.state.selected} title={i} callback={(e) => { this.addressCallback(e) }} />);
    }

    let cardElement;
    if (this.state.holdings.length > 0) {
      cardElement = <Cards holdings={this.state.holdings}/>;
    } else {
      cardElement = <div class="select-address">
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
