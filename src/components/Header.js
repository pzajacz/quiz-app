import React, {Component} from 'react';
import styled from "styled-components";
import logo from '../images/logo.svg';


class Headers extends Component {
  render() {
    return (
      <HeaderStyled>
        <div className="region region-header">
          <div className="block-system-branding-block">
            <div className="inner-container">
              <a href="/" title="Domov" rel="home" className="site-logo">
                <img src={logo} alt="Domov" />
              </a>
            </div>
          </div>
          <nav role="navigation" className="block block-menu navigation menu--main">
            <ul className="menu">
              <li className="menu-item menu-item--active-trail">
                <a href="/consulo" className="is-active">Kto sme</a>
              </li>
              <li className="menu-item">
                <a href="/sluzby">Služby</a>
              </li>
              <li className="menu-item">
                <a href="/partneri">Partneri</a>
              </li>
              <li className="menu-item">
                <a href="/kariera">Kariéra</a>
              </li>
              <li className="menu-item">
                <a href="/kontakt">Kontakt</a>
              </li>
            </ul>
          </nav>

        </div>
      </HeaderStyled>
    );
  }
}

const HeaderStyled = styled.header`
  width: 100%;
  display: flex;

  .block-system-branding-block .site-logo img {
    height: 40px;
  }

  .menu--main {
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
  }
  
  .menu--main .menu {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin: 0;
    padding: 0
  }

  .menu--main .menu-item a {
    transition: .3s;
    font-family: Rubik,sans-serif;
    font-size: 1.2rem;
    color: #564b59;
    font-weight: 500;
    text-transform: uppercase
  }
`;


export default Headers;
