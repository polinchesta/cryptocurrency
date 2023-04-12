import React, { useState } from 'react';
import Modal from '../../../ui/modal/Modal';
import { Link } from 'react-router-dom';

interface Asset {
    id: string;
    rank: number;
    name: string;
    priceUsd: string;
    changePercent24Hr: string;
}

interface MainTableProps {
    assets: Asset[];
    handleOpenModal: (assetId: string) => void;
    handleCloseModal: () => void;
    isOpen: boolean;
    selectedAssetId: string;
}

const MainTable = ({ assets }: MainTableProps) => {
    const [selectedAssetId, setSelectedAssetId] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleOpenModal = (id: string) => {
        setSelectedAssetId(id);
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    return (
        <table>
            <thead>
                <tr>
                    <th className="firstColumn">Номер</th>
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
                        <td className="firstColumn">{asset.rank}</td>
                        <td>{asset.name}</td>
                        <td>{Number(asset.priceUsd).toFixed(2)}</td>
                        <td>{Number(asset.changePercent24Hr).toFixed(2)}</td>
                        <td className="buttonModal">
                            <button onClick={() => handleOpenModal(asset.id)}>+</button>
                            {selectedAssetId === asset.id && (
                                <Modal
                                    onClose={handleCloseModal}
                                    isOpen={isOpen}
                                    title="Добавление в портфель пользователя"
                                    assetId={selectedAssetId}
                                />
                            )}
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
