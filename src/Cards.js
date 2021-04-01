import React from 'react';
import './Cards.css';

class Cards extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    let cards = [];
    for (let i=1; i <= 30; i++) {
      var className;
      if (this.props.holdings["data"]['cardHolders'][0]["holdings"].find(c => c.cardNumber == i)) {
        className = ""
        console.log("yep")
      } else {
        className = "hide";
      }
      cards.push(<span><img id={`card-${i}`} alt={`Curio${i}`} src="https://via.placeholder.com/150x200" className={className} /></span>);
    }
    return cards;
  }
}

export default Cards;