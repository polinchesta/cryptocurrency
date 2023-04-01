import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Main.scss"

type Asset = {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  priceUsd: string;
  changePercent24Hr: string;
};

type AssetsData = {
  data: Asset[];
};

const PAGE_SIZE = 100;

const fetchData = async (page: number): Promise<Asset[]> => {
  const response = await axios.get<AssetsData>(`https://api.coincap.io/v2/assets?limit=${PAGE_SIZE}&offset=${(page - 1) * PAGE_SIZE}`);
  return response.data.data;
};

const useAssets = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchData(currentPage)
      .then((data) => {
        setAssets(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [currentPage]);

  return { assets, currentPage, setCurrentPage, loading };
};

const Main = () => {
  const { assets, currentPage, setCurrentPage, loading } = useAssets();
  
  const handleFirstPage = () => {
    setCurrentPage(1);
  };
  

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      {loading ? (
        <div className="loader" />
        ) : (
        <table>
        <thead>
          <tr>
            <th>Номер</th>
            <th>Название</th>
            <th>Цена (USD)</th>
            <th>Изменения за 24 часа (%)</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr key={asset.id}>
              <td>{asset.rank}</td>
              <td>{asset.name}</td>
              <td>{asset.priceUsd}</td>
              <td>{asset.changePercent24Hr}</td>
              <td><button>+</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
      <button onClick={handleFirstPage} disabled={currentPage === 1}>
        1 страница
      </button>
      <button onClick={handlePrevPage} disabled={currentPage === 1}>
        Предыдущая
      </button>
      <button onClick={handleNextPage} disabled={currentPage === 24}>Следующая</button>
    </div>
  );
};

export default Main;
