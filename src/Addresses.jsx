import React from 'react';

class Addresses extends React.Component {

  render() {
    let addresses = [];
    if (this.props.addrs && this.props.addrs.length > 0) {
      addresses.push(<header>{this.props.title} cards</header>);
      for (let i = 0; i < this.props.addrs.length; i++) {
        addresses.push(<a id={this.props.addrs[i]} className="address" href="#" onClick={this.props.callback}>{this.props.addrs[i]}</a>);
      }
    }
    return addresses;
  }
}

export default Addresses;