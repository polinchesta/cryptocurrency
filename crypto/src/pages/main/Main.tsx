import React, { useState } from 'react';
import useAssets from '../../api/useAssets';
import './Main.scss';
import MainTable from './components/MainTable';
import Pagination from './components/MainPagination';
import { Asset } from '../../types/ApiTypes';

const Main = () => {
    const { assets, currentPage, setCurrentPage, loading } = useAssets();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedAssetId, setSelectedAssetId] = useState('');

    const handleFirstPage = () => {
        setCurrentPage(1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handleOpenModal = (assetId: string) => {
        setSelectedAssetId(assetId);
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedAssetId('');
        setIsOpen(false);
    };

    return (
        <div>
            {loading ? (
                <div className="loader" />
            ) : (
                <div>
                    <MainTable
                        assets={assets as Asset[]} // Update the type of assets
                        handleOpenModal={handleOpenModal}
                        handleCloseModal={handleCloseModal}
                        isOpen={isOpen}
                        selectedAssetId={selectedAssetId}
                    />
                    <Pagination
                        handleFirstPage={handleFirstPage}
                        handlePrevPage={handlePrevPage}
                        handleNextPage={handleNextPage}
                        currentPage={currentPage}
                    />
                </div>
            )}
        </div>
    );
};

export default Main;
