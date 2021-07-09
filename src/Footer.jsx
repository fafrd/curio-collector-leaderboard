import React from 'react';
import curio from './images/curio.svg';
import logo from './images/logo.svg';
import cards from './images/cards.svg';

class Footer extends React.Component {

  render() {
    const footer = <footer>
        <div className="footer-inner">
          <div className="footerart">
            <div className="footerart__wrapper">
              <img src={curio} alt="Curio Raccoon" />
            </div>
            <div className="footerart__wrapper logo">
              <img src={logo} alt="logo" />
            </div>
            <div className="footerart__wrapper">
              <img src={cards} alt="card art" />
            </div>
          </div>
          <div className="footerlink cell"><a target="_blank" rel="noopener noreferrer" href="https://twitter.com/mycuriocards">@mycuriocards</a></div>
        </div>
    </footer>;

    return footer;
  }
}

export default Footer;
