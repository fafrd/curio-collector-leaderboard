import React from "react";

// there's probably a better way to do this
import image1 from "./images/1.jpg";
import image2 from "./images/2.jpg";
import image3 from "./images/3.jpg";
import image4 from "./images/4.jpg";
import image5 from "./images/5.jpg";
import image6 from "./images/6.jpg";
import image7 from "./images/7.jpg";
import image8 from "./images/8.jpg";
import image9 from "./images/9.jpg";
import image10 from "./images/10.jpg";
import image11 from "./images/11.jpg";
import image12 from "./images/12.jpg";
import image13 from "./images/13.jpg";
import image14 from "./images/14.jpg";
import image15 from "./images/15.jpg";
import image16 from "./images/16.jpg";
import image17 from "./images/17.jpg";
import image17b from "./images/17b.png";
import image18 from "./images/18.jpg";
import image19 from "./images/19.jpg";
import image20 from "./images/20.jpg";
import image21 from "./images/21.png";
import image22 from "./images/22.png";
import image23 from "./images/23.gif";
import image24 from "./images/24.jpg";
import image25 from "./images/25.jpg";
import image26 from "./images/26.jpg";
import image27 from "./images/27.jpg";
import image28 from "./images/28.jpg";
import image29 from "./images/29.jpg";
import image30 from "./images/30.gif";
let images = {
  1: image1,
  2: image2,
  3: image3,
  4: image4,
  5: image5,
  6: image6,
  7: image7,
  8: image8,
  9: image9,
  10: image10,
  11: image11,
  12: image12,
  13: image13,
  14: image14,
  15: image15,
  16: image16,
  17: image17,
  "17b": image17b,
  18: image18,
  19: image19,
  20: image20,
  21: image21,
  22: image22,
  23: image23,
  24: image24,
  25: image25,
  26: image26,
  27: image27,
  28: image28,
  29: image29,
  30: image30,
};

const cardNames = new Set([
  "Curio1",
  "Curio2",
  "Curio3",
  "Curio4",
  "Curio5",
  "Curio6",
  "Curio7",
  "Curio8",
  "Curio9",
  "Curio10",
  "Curio11",
  "Curio12",
  "Curio13",
  "Curio14",
  "Curio15",
  "Curio16",
  "Curio17",
  "Curio18",
  "Curio19",
  "Curio20",
  "Curio21",
  "Curio22",
  "Curio23",
  "Curio24",
  "Curio25",
  "Curio26",
  "Curio27",
  "Curio28",
  "Curio29",
  "Curio30",
  "Curio17b",
]);

class Cards extends React.Component {
  render() {
    let cards = [];
    if (this.props.holdings.length > 0) {
      //console.debug("DEBUG props.holdings: ");
      //console.debug(this.props.holdings);
      for (const cardName of cardNames) {
        let balance = 0;
        let number = cardName.split("Curio")[1];
        const card = this.props.holdings.find(c => c.type.name === cardName);

        if (card) {
          balance = Number(card.unwrapped) + Number(card.wrappedOfficial) + Number(card.wrappedUnofficial);
        }

        if (balance > 0) {
          cards.push(
            <span key={number}>
              <div className="overlay-container">
                <div className="overlay"></div>
                <img id={`card-${number}`} alt={card} src={images[number]} />
              </div>
              <p>{balance}x</p>
            </span>
          );
        } else {
          cards.push(
            <span key={number}>
              <div className="overlay-container">
                <div className="overlay overlay-enabled"></div>
                <img
                  id={`card-${number}`}
                  alt={card}
                  src={images[number]}
                  className="grayscale"
                />
              </div>
              <p>{balance}x</p>
            </span>
          );
        }
      }
    }
    return <div className="card-wrapper">{cards}</div>;
  }
}

export default Cards;
