import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Crypto {
    id: string;
    name: string;
    priceUsd: string;
  }
  
const TopThreeCryptos = () => {
  const [topThreeCryptos, setTopThreeCryptos] = useState<Crypto[]>([]);
  const [cryptoList, setCryptoList] = useState<Crypto[]>([]);

  useEffect(() => {
    const getTopThreeCryptos = async () => {
        const { data } = await axios.get('https://api.coincap.io/v2/assets');
        console.log(data); // <-- Add this line
        let topThreeCryptos = Object.values(data);
        topThreeCryptos = data.slice(0, 3); // <-- This line is causing the error
        setTopThreeCryptos(topThreeCryptos);
      };

    getTopThreeCryptos();
  }, []);

  return (
    <div>
      <p>Top Three Cryptocurrencies:</p>
      <ul>
        {topThreeCryptos.map((crypto) => (
          <li key={crypto.id}>
            {crypto.name}: ${crypto.priceUsd}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopThreeCryptos;
