import React from 'react';
import './Addresses.css';

class Addresses extends React.Component {

  render() {
    let addresses = [<header>{this.props.title} cards</header>];
    if (this.props.addrs) {
      for (let i = 0; i < this.props.addrs.length; i++) {
        addresses.push(<a id={this.props.addrs[i]} className="address" href="#" onClick={this.props.callback}>{this.props.addrs[i]}</a>);
      }
    }
    return addresses;
  }
}

export default Addresses;