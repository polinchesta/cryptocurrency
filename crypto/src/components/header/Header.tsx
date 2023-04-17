import React, { useState, useEffect } from 'react';
import logo from '../../ui/image/logo.png';
import backpack from '../../ui/image/backpack.jpg';
import { Link } from 'react-router-dom';
import './Header.scss';
import ModalFinding from '../../ui/modalFinding/ModalFinding';
import { fetchTopThreeCryptos } from '../../api/TopThreeCryptosApi';
import { Asset } from '../../types/ApiTypes';

function Header() {
    const [topThreeCryptos, setTopThreeCryptos] = useState<Asset[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [portfolioValue, setPortfolioValue] = useState(Number(localStorage.getItem('portfolioValue')));
    const [initialPortfolioValue, setInitialPortfolioValue] = useState(Number(localStorage.getItem('initialPortfolioValue')));
    const [difference, setDifference] = useState(0);
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        const portfolioValueFromLocalStorage = Number(localStorage.getItem('portfolioValue'));
        const initialPortfolioValueFromLocalStorage = Number(localStorage.getItem('initialPortfolioValue'));
        if (!initialPortfolioValueFromLocalStorage) {
            localStorage.setItem('initialPortfolioValue', portfolioValueFromLocalStorage.toString());
            setInitialPortfolioValue(portfolioValueFromLocalStorage);
        } else {
            setInitialPortfolioValue(initialPortfolioValueFromLocalStorage);
        }

        const difference = portfolioValueFromLocalStorage - initialPortfolioValueFromLocalStorage;
        const percent = ((difference / initialPortfolioValueFromLocalStorage) * 100).toFixed(3);
        setPortfolioValue(portfolioValueFromLocalStorage);
        setDifference(difference);
        setPercent(Number(percent));
    }, [localStorage.getItem('portfolioValue'), localStorage.getItem('initialPortfolioValue')]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchTopThreeCryptos();
            setTopThreeCryptos(data);
        };
        fetchData();
    }, []);

    const displayDifference = difference < 0 ? `- ${Math.abs(difference).toFixed(2)}` : `+ ${difference.toFixed(2)}`;
    const displayPercent = isNaN(percent) ? '0' : `${percent}%`;

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
                    <div>
                        <p>
                            Сумма: {Number(initialPortfolioValue).toFixed(2)} USD {displayDifference} ({displayPercent})
                        </p>
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
                        title="Портфель пользователя"
                        assetId={''}
                    />
                </div>
            </div>
        </header>
    );
}

export default Header;
