import React from 'react';
import './var.css'
import './App.css';
import Addresses from './Addresses.jsx'
import Cards from './Cards.jsx'
import Footer from './Footer.jsx'

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

  async componentDidMount() {
    for (let i = 30; i >= 10; i--) {
      const top = await this.fetchTopHolders(i);
      let newAddresses = this.state.addresses;
      newAddresses[i] = top;
      this.setState({addresses: newAddresses});
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
    return (
      <>
        <div className="title-wrapper">
          <header className="title">Curio Card Collections</header>
        </div>
        <div className="app">

          <section>
            <Addresses addrs={this.state.addresses[30]} selected={this.state.selected} title={30} callback={(e) => { this.addressCallback(e) }} />
            <Addresses addrs={this.state.addresses[29]} selected={this.state.selected} title={29} callback={(e) => { this.addressCallback(e) }} />
            <Addresses addrs={this.state.addresses[28]} selected={this.state.selected} title={28} callback={(e) => { this.addressCallback(e) }} />
            <Addresses addrs={this.state.addresses[27]} selected={this.state.selected} title={27} callback={(e) => { this.addressCallback(e) }} />
            <Addresses addrs={this.state.addresses[26]} selected={this.state.selected} title={26} callback={(e) => { this.addressCallback(e) }} />
            <Addresses addrs={this.state.addresses[25]} selected={this.state.selected} title={25} callback={(e) => { this.addressCallback(e) }} />
            <Addresses addrs={this.state.addresses[24]} selected={this.state.selected} title={24} callback={(e) => { this.addressCallback(e) }} />
            <Addresses addrs={this.state.addresses[23]} selected={this.state.selected} title={23} callback={(e) => { this.addressCallback(e) }} />
            <Addresses addrs={this.state.addresses[22]} selected={this.state.selected} title={22} callback={(e) => { this.addressCallback(e) }} />
            <Addresses addrs={this.state.addresses[21]} selected={this.state.selected} title={21} callback={(e) => { this.addressCallback(e) }} />
            <Addresses addrs={this.state.addresses[20]} selected={this.state.selected} title={20} callback={(e) => { this.addressCallback(e) }} />
            <Addresses addrs={this.state.addresses[19]} selected={this.state.selected} title={19} callback={(e) => { this.addressCallback(e) }} />
            <Addresses addrs={this.state.addresses[18]} selected={this.state.selected} title={18} callback={(e) => { this.addressCallback(e) }} />
            <Addresses addrs={this.state.addresses[17]} selected={this.state.selected} title={17} callback={(e) => { this.addressCallback(e) }} />
            <Addresses addrs={this.state.addresses[16]} selected={this.state.selected} title={16} callback={(e) => { this.addressCallback(e) }} />
            <Addresses addrs={this.state.addresses[15]} selected={this.state.selected} title={15} callback={(e) => { this.addressCallback(e) }} />
            <Addresses addrs={this.state.addresses[14]} selected={this.state.selected} title={14} callback={(e) => { this.addressCallback(e) }} />
            <Addresses addrs={this.state.addresses[13]} selected={this.state.selected} title={13} callback={(e) => { this.addressCallback(e) }} />
            <Addresses addrs={this.state.addresses[12]} selected={this.state.selected} title={12} callback={(e) => { this.addressCallback(e) }} />
            <Addresses addrs={this.state.addresses[11]} selected={this.state.selected} title={11} callback={(e) => { this.addressCallback(e) }} />
            <Addresses addrs={this.state.addresses[10]} selected={this.state.selected} title={10} callback={(e) => { this.addressCallback(e) }} />
          </section>

          <aside>
            <Cards holdings={this.state.holdings}/>
          </aside>

        </div>
      </>
    );
  }
}

export default App;
