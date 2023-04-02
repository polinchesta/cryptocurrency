import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../../../public/logo.png';
import { Link } from 'react-router-dom';
import './Header.scss'

interface Crypto {
  id: string;
  name: string;
  priceUsd: string;
}

function Header() {
  const [topThreeCryptos, setTopThreeCryptos] = useState<Crypto[]>([]);

  useEffect(() => {
    async function fetchTopThreeCryptos() {
      try {
        const response = await axios.get("https://api.coincap.io/v2/assets?limit=3&sort=rank");
        const data = response.data.data;
        setTopThreeCryptos(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchTopThreeCryptos();
  }, []);

  return (
    <header>
      <div className='header'>
        <Link className='linkLogo' to="/"><h1>CRYPT<img className='logo' src={logo} alt="My Logo" />CURRENCY</h1></Link>
        <div className="header-popularCrypto">
          {topThreeCryptos.map((currency) => (
            <div className='header-popularCrypto__info'>
              <p key={currency.id}>
                {currency.name} = {Number(currency.priceUsd).toFixed(4)}
              </p>
            </div>

          ))}
        </div>
      </div>
    </header>
  );
}

export default Header;