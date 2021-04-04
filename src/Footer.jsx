import React from 'react';
import curio from './images/curio.svg';
import logo from './images/logo.svg';
import cards from './images/cards.svg';

class Footer extends React.Component {

  render() {
    const footer = <footer>
        <div class="footer-inner">
          <div class="footerart">
            <div class="footerart__wrapper">
              <img src={curio} alt="Curio Raccoon" />
            </div>
            <div class="footerart__wrapper logo">
              <img src={logo} alt="logo" />
            </div>
            <div class="footerart__wrapper">
              <img src={cards} alt="card art" />
            </div>
          </div>
          <div class="footerlink cell"><a target="_blank" rel="noopener noreferrer" href="https://twitter.com/mycuriocards">@mycuriocards</a></div>
        </div>
    </footer>;

    return footer;
  }
}

export default Footer;