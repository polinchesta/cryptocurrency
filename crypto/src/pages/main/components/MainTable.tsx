import React from 'react';
import Modal from '../../../ui/modal/Modal';
import { Link } from 'react-router-dom';

interface MainTableProps {
    assets: Array<any>;
    handleOpenModal: (id: string) => void;
    handleCloseModal: () => void;
    isOpen: boolean;
    selectedAssetId: string;
}

const MainTable = ({ assets, handleOpenModal, handleCloseModal, isOpen, selectedAssetId }: MainTableProps) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Номер</th>
                    <th>Валюта</th>
                    <th>Цена (USD)</th>
                    <th>Изм.за 24ч (%)</th>
                    <th>Добавить в портф.</th>
                    <th>Изучить</th>
                </tr>
            </thead>
            <tbody>
                {assets.map((asset) => (
                    <tr key={asset.id}>
                        <td>{asset.rank}</td>
                        <td>{asset.name}</td>
                        <td>{Number(asset.priceUsd).toFixed(2)}</td>
                        <td>{Number(asset.changePercent24Hr).toFixed(2)}</td>
                        <td className="buttonModal">
                            <button onClick={() => handleOpenModal(asset.id)}>+</button>
                            <Modal
                                onClose={handleCloseModal}
                                isOpen={isOpen}
                                title="Добавление в портфель пользователя"
                                assetId={selectedAssetId}
                            />
                        </td>
                        <td>
                            <Link to={`/currency/${asset.id}`}>
                                <button>Подробнее</button>
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default MainTable;
