import React, { useState, useEffect } from 'react';
import { fetchCurrencies } from '../../api/ModalApi';
import { Currency, ModalProps } from '../../types/ModalTypes';
import './ModalFinding.scss';

const ModalFinding: React.FC<ModalProps> = ({ onClose, isOpen, title }) => {
    const [currencies, setCurrencies] = useState<Currency[]>([]);
    const [initialPortfolioValue, setInitialPortfolioValue] = useState(Number(localStorage.getItem('initialPortfolioValue')));
    const [portfolioValue, setPortfolioValue] = useState(0);
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedCurrencies = await fetchCurrencies();
                setCurrencies(storedCurrencies);
    
                const totalValue = storedCurrencies.reduce((total, currency) => {
                    return total + parseFloat(currency.quantity) * currency.price;
                }, 0);
                setPortfolioValue(totalValue);
            } catch (error) {
                console.error('Failed to fetch currencies:', error);
            }
        };
    
        fetchData();
    }, []);

    useEffect(() => {
        const storedInitialValue = localStorage.getItem('initialPortfolioValue');
        if (storedInitialValue) {
            setInitialPortfolioValue(parseFloat(storedInitialValue));
        }
    }, []);
    
    
    useEffect(() => {
        const difference = initialPortfolioValue - portfolioValue;
        const calculatedPercent = ((difference / initialPortfolioValue) * 100).toFixed(2);
        setPercent(Number(calculatedPercent));
    }, [initialPortfolioValue, portfolioValue]);
    
    useEffect(() => {
        localStorage.setItem('initialPortfolioValue', initialPortfolioValue.toString());
    }, [initialPortfolioValue]);
    
    useEffect(() => {
        localStorage.setItem('portfolioValue', portfolioValue.toString());
    }, [portfolioValue]);
    
    if (!isOpen) {
        return null;
    }
    
    const handleDeleteCurrency = (currencyId: string) => {
        localStorage.removeItem(currencyId);
        localStorage.removeItem('portfolioValue');
        localStorage.removeItem('initialPortfolioValue');

    
        const updatedCurrencies = currencies.filter(
            (currency) => currency.currencyId !== currencyId
        );
        setCurrencies(updatedCurrencies);
    };
    
    return (
        <div className="modal-wrapper">
            <div className="modalFinding">
                <div className="modalFinding-content">
                    <div className="modalFinding-close" onClick={onClose}>
                        &times;
                    </div>
                    <div className="modalFinding-title">{title}</div>
                    <div className="modalFinding-body">
                        <table>
                            <thead>
                                <tr>
                                    <th className="modalFinding-table">Валюта</th>
                                    <th className="modalFinding-table">Кол-во</th>
                                    <th className="modalFinding-table">Цена (USD)</th>
                                    <th className="modalFinding-table">Общая сумма</th>
                                    <th className="modalFinding-table">Изменения</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currencies.map((currency) => (
                                    <tr key={currency.currencyId}>
                                        <td className="modalFinding-table">{currency.currencyId}</td>
                                        <td className="modalFinding-table">{currency.quantity}</td>
                                        <td className="modalFinding-table">
                                            {Number(currency.price).toFixed(2)}
                                        </td>
                                        <td className="modalFinding-table">
                                            {(parseFloat(currency.quantity) * currency.price).toFixed(
                                                2
                                            )}
                                        </td>
                                        {localStorage.getItem(currency.currencyId) && (
                                            <td className="modalFinding-table">
                                                <button
                                                    onClick={() =>
                                                        handleDeleteCurrency(currency.currencyId)
                                                    }>
                                                    Удалить
                                                </button>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="modal-overlay"></div>
        </div>
    );
};

export default ModalFinding;
