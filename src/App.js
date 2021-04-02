import React from 'react';
import './App.css';
import Addresses from './Addresses.js'
import Cards from './Cards.js'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      addresses: [],
      holdings: []
    };
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
    let endpoint = "https://graph.wizwar.net/subgraphs/id/QmX5BVVFdP7bqwGKHEjUewoRPNtLv4vQgCWkoAg9wCMMJS";
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
    return res["data"]['cardHolders'][0]["holdings"];
  }

  // Given a number (30, 29, 28...) fetch the accounts that have this many different card types collected.
  async fetchTopHolders(uniqueCardHoldings) {
    let endpoint = "https://graph.wizwar.net/subgraphs/id/QmX5BVVFdP7bqwGKHEjUewoRPNtLv4vQgCWkoAg9wCMMJS";
    let query = `{
        cardHolders(where: { uniqueCards_in: [${uniqueCardHoldings}] }) {
          id
        }
      }`;
    let res = await this.queryGraph(endpoint, query);
    return res.data.cardHolders.map(e => e.id);
  }

  async componentDidMount() {
    const top30 = await this.fetchTopHolders(30);
    this.setState({addresses: top30});
  }

  async addressCallback(e) {
    const cardHoldings = await this.fetchHoldingsForAccount(e.target.id);
    this.setState({holdings: cardHoldings});
  }

  render() {
    return (
      <div className="app">

        <section>
          <header>30 cards</header>
          <Addresses addrs={this.state.addresses} callback={(e) => { this.addressCallback(e) }} />
        </section>

        <aside>
          <Cards holdings={this.state.holdings}/>
        </aside>

      </div>
    );
  }
}

export default App;
