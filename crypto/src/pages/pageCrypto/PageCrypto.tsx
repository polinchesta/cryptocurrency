import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './PageCrypto.scss';
import { COINCAP_API_URL } from '../../constant/constant';
import LineChartComponent from './LineChartComponent';

interface PageCryptoProps {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: number;
  changePercent24Hr: number;
  vwap24Hr: string;
  history: any[];
}

const PageCrypto: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [asset, setAsset] = useState<PageCryptoProps | null>(null);

  useEffect(() => {
    axios
      .get(`${COINCAP_API_URL}/assets/${id}`)
      .then(response => setAsset(response.data.data))
      .catch(error => console.log(error));
  }, [id]);


  if (!id) {
    return <h2>Данные потерялись, мы пошли их искать</h2>;
  }


  return (
    <div>
      <Link to={'/'}>
        <button className='buttonHome'>На главную</button>
      </Link>
      {!asset ? (
        <div className='loader' />
      ) : (
        <div className='info'>
          <div className="baseInfo">
            <h2>{asset.name}</h2>
            <p>Символ: {asset.symbol}</p>
            <p>Номер: {asset.rank}</p>
            <p>Цена (USD): {Number(asset.priceUsd).toFixed(4)}$</p>
            <LineChartComponent id={id} />
          </div>
          <div className="allInfo">
            <p>Предложение: {Number(asset.marketCapUsd).toFixed(4)}$</p>
            <p>Объем торгов в долларах США за последние 24 часа: {Number(asset.volumeUsd24Hr).toFixed(4)}$</p>
            <p>Изменения за последние 24 часа: {Number(asset.marketCapUsd).toFixed(4)}%</p>
            <p>Доступное предложение для торговли: {Number(asset.supply).toFixed(4)}</p>
            <p>Общее количество выпущенных активов: {Number(asset.maxSupply).toFixed(4)}</p>
            <p>Средневзвешенная цена за последние 24 часа: {Number(asset.vwap24Hr).toFixed(4)}$</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageCrypto;