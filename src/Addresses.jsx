import React from 'react';

class Addresses extends React.Component {

  render() {
    let addresses = [];
    if (this.props.addrs && this.props.addrs.length > 0) {
      addresses.push(<header key={this.props.title}>{this.props.title} Card Addresses</header>);
      for (let i = 0; i < this.props.addrs.length; i++) {
        let selected = "";
        if (this.props.selected === this.props.addrs[i]) {
          selected = "selected";
        }

        let addrOrEns;
        if (this.props.ens && this.props.ens[i]) {
          addrOrEns = this.props.ens[i];
        } else {
          addrOrEns = this.props.addrs[i];
        }

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
