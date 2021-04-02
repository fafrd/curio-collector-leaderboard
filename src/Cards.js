import React from 'react';
import './Cards.css';

class Cards extends React.Component {

  render() {
    let cards = [];
    for (let i=1; i <= 30; i++) {
      let className = "";
      // hide card if account doesn't have it
      if (!this.props.holdings.find(c => c.cardNumber === i.toString())) {
        className = "hide";
      }

      cards.push(<span><img id={`card-${i}`} alt={`Curio${i}`} src="https://via.placeholder.com/150x200" className={className} /></span>);
    }
    return cards;
  }
}

export default Cards;