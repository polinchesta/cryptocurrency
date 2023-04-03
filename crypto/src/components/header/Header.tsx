import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../../../public/logo.png';
import backpack from '../../../public/backpack.jpg'
import { Link } from 'react-router-dom';
import './Header.scss'
import { COINCAP_API_URL } from '../../constant/constant';
import Modal from '../modal/Modal';

interface Crypto {
  id: string;
  name: string;
  priceUsd: string;
}

function Header() {
  const [topThreeCryptos, setTopThreeCryptos] = useState<Crypto[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function fetchTopThreeCryptos() {
      try {
        const response = await axios.get(`${COINCAP_API_URL}/assets?limit=3&sort=rank`);
        const data = response.data.data;
        setTopThreeCryptos(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchTopThreeCryptos();
  }, []);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };


  return (
    <header>
      <div className='header'>
        <div className="header-info">
          <Link className='linkLogo' to="/"><h1>CRYPT<img className='logo' src={logo} alt="Logo" />CURRENCY</h1></Link>
          <div className="header-popularCrypto">
            {topThreeCryptos.map((asset) => (
              <div className='header-popularCrypto__info'>
                <p key={asset.id}>
                  {asset.name} = {Number(asset.priceUsd).toFixed(4)}
                </p>
              </div>

            ))}
          </div>
        </div>
        <div className="header-backpack">
          <img className='backpack' src={backpack} alt="User Backpack" onClick={handleOpenModal}></img>
          <Modal onClose={handleCloseModal} isOpen={isOpen} title="Портфель пользователя">
            <label>Общее количество:</label>
            <input type="text"></input>
            <button className="buttonModal" type="submit">Сохранить</button>
          </Modal>
        </div>   
        
    </div>
    </header >
  );
}

export default Header;