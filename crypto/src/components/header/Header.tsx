import React, { useState, useEffect } from 'react';
import logo from '../../../public/logo.png';
import backpack from '../../../public/backpack.jpg';
import { Link } from 'react-router-dom';
import './Header.scss';
import ModalFinding from '../../ui/modalFinding/ModalFinding';
import { fetchTopThreeCryptos } from '../../api/TopThreeCryptosApi';
import { Asset } from '../../types/ApiTypes';

function Header() {
    const [topThreeCryptos, setTopThreeCryptos] = useState<Asset[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchTopThreeCryptos();
            setTopThreeCryptos(data);
        };
        fetchData();
    }, []);

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    return (
        <header>
            <div className="header">
                <div className="header-info">
                    <Link className="linkLogo" to="/">
                        <h1>
                            CRYPT
                            <img className="logo" src={logo} alt="Logo" />
                            CURRENCY
                        </h1>
                    </Link>
                    <div className="header-popularCrypto">
                        {topThreeCryptos.map((asset) => (
                            <div className="header-popularCrypto__info" key={asset.id}>
                                <p>
                                    {asset.name} = {Number(asset.priceUsd).toFixed(4)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="header-backpack">
                    <img
                        className="backpack"
                        src={backpack}
                        alt="User Backpack"
                        onClick={handleOpenModal}></img>
                    <ModalFinding
                        onClose={handleCloseModal}
                        isOpen={isOpen}
                        title="Портфель пользователя" assetId={''} />
                </div>
            </div>
        </header>
    );
}

export default Header;
