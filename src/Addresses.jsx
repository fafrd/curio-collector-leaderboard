import React from 'react';

class Addresses extends React.Component {

  render() {
    let addresses = [];
    if (this.props.addrs && this.props.addrs.length > 0) {
      addresses.push(<header key={this.props.title}>{this.props.title} Card Addresses</header>);
      for (let i = 0; i < this.props.addrs.length; i++) {
        const address = this.props.addrs[i];
        const selected = this.props.selected === address ? "selected" : "";

        const addrOrEns = this.props.ens[address] || address;

        addresses.push(
          <a id={this.props.addrs[i]} key={this.props.addrs[i]} className={"address " + selected} href="#" onClick={this.props.callback}>
            <span>{addrOrEns}</span>
            <div className={"arrow " + selected}>---&gt;</div>
          </a>);
      }
    }
    return addresses;
  }
}

export default Addresses;
