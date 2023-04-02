import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface PageCryptoProps {
  id: string;
}

const PageCrypto: React.FC<PageCryptoProps> = ({ id }) => {
  const [asset, setAsset] = useState<any>(null);

  useEffect(() => {
    axios.get(`https://api.coincap.io/v2/assets/${id}`)
      .then(response => setAsset(response.data.data))
      /* .catch(error => console.log(error)); */
  }, [id]);

  if (!asset) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{asset.name}</h2>
      <p>Symbol: {asset.symbol}</p>
      <p>Price: {Number(asset.priceUsd).toFixed(2)}$</p>
      <p>Market Cap: {Number(asset.marketCapUsd).toFixed(2)}$</p>
    </div>
  );
};

export default PageCrypto;
