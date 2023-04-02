import React, { useState } from "react";
import useAssets from "./useAssets";
import "./Main.scss";
import Modal from '../modal/Modal'
import { Link } from "react-router-dom";


const Main = () => {
  const { assets, currentPage, setCurrentPage, loading } = useAssets();
  const [isOpen, setIsOpen] = useState(false);

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
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
              <th>Добавить в портфель</th>
              <th>Информация</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr key={asset.id}>
                <td>{asset.rank}</td>
                <td>{asset.name}</td>
                <td>{Number(asset.priceUsd).toFixed(4)}</td>
                <td>{Number(asset.changePercent24Hr).toFixed(4)}</td>
                <td className="buttonModal"><button onClick={handleOpenModal}>+</button>
                  <Modal onClose={handleCloseModal} isOpen={isOpen} title="Добавление в портфель пользователя">
                    <label>Введите количество:</label>
                    <input type="text"></input>
                    <button className="buttonModal" type="submit">Сохранить</button>
                  </Modal></td>
                <td><Link to={`/currency/${asset.id}`}><button>Подробнее</button></Link></td>

              </tr>
            ))}

          </tbody>
        </table>
      )}
      <div className="buttonPagination">
        <button onClick={handleFirstPage} disabled={currentPage === 1}>
          1 страница
        </button>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Предыдущая
        </button>
        <button onClick={handleNextPage} disabled={currentPage === 24}>Следующая</button>
      </div>

    </div>
  );
};

export default Main;