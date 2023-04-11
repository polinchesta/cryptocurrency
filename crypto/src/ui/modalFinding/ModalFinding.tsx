import React, { useState, useEffect } from 'react';
import { fetchCurrencies } from '../../api/ModalApi';
import { Currency, ModalProps } from '../../types/ModalTypes';
import "./ModalFinding.scss"

const ModalFinding: React.FC<ModalProps> = ({ onClose, isOpen, title }) => {
    const [currencies, setCurrencies] = useState<Currency[]>([]);
    const [initialPortfolioValue, setInitialPortfolioValue] = useState<number>(0);
    const [portfolioValue, setPortfolioValue] = useState(initialPortfolioValue);
    const [percentageChange, setPercentageChange] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedCurrencies = await fetchCurrencies();
                setCurrencies(storedCurrencies);

                const totalValue = storedCurrencies.reduce((total, currency) => {
                    return total + parseFloat(currency.quantity) * currency.price;
                }, 0);
                setPortfolioValue(totalValue);

                localStorage.setItem('portfolioValue', totalValue.toString());

                setInitialPortfolioValue(totalValue);
            } catch (error) {
                console.error('Failed to fetch currencies:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const initialPortfolioValue = currencies.reduce((total, currency) => {
            return total + parseFloat(currency.quantity) * currency.price;
        }, 0);
        setInitialPortfolioValue(initialPortfolioValue);

        const portfolioValue = currencies.reduce((total, currency) => {
            const storedPrice = localStorage.getItem(currency.currencyId);
            const price = storedPrice ? parseFloat(storedPrice) : currency.price;
            return total + parseFloat(currency.quantity) * price;
        }, 0);
        setPortfolioValue(portfolioValue);
    }, [currencies]);

    useEffect(() => {
        const percentageChange = ((portfolioValue - initialPortfolioValue) / initialPortfolioValue * 100).toFixed(2);
        setPercentageChange(parseFloat(percentageChange));
        localStorage.setItem('percentageChange', percentageChange);
    }, [portfolioValue, initialPortfolioValue]);

    if (!isOpen) {
        return null;
    }

    const handleDeleteCurrency = (currencyId: string) => {
        localStorage.removeItem(currencyId);

        const updatedCurrencies = currencies.filter(currency => currency.currencyId !== currencyId);
        setCurrencies(updatedCurrencies);

        const totalValue = updatedCurrencies.reduce((total, currency) => {
            return total + parseFloat(currency.quantity) * currency.price;
        }, 0);
        setPortfolioValue(totalValue);

        const percentageChange = ((totalValue - initialPortfolioValue) / initialPortfolioValue * 100).toFixed(2);
        localStorage.setItem('portfolioValue', totalValue.toString());
        localStorage.setItem('percentageChange', percentageChange);
    };


    return (
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
                                <th className='modalFinding-table'>Валюта</th>
                                <th className='modalFinding-table'>Кол-во</th>
                                <th className='modalFinding-table'>Цена (USD)</th>
                                <th className='modalFinding-table'>Общая сумма</th>
                                <th className='modalFinding-table'>Изменения</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currencies.map((currency) => (
                                <tr key={currency.currencyId}>
                                    <td className='modalFinding-table'>{currency.currencyId}</td>
                                    <td className='modalFinding-table'>{currency.quantity}</td>
                                    <td className='modalFinding-table'>{Number(currency.price).toFixed(2)}</td>
                                    <td className='modalFinding-table'>{(parseFloat(currency.quantity) * currency.price).toFixed(2)}</td>
                                    {localStorage.getItem(currency.currencyId) && (
                                        <td className='modalFinding-table'>
                                            <button onClick={() => handleDeleteCurrency(currency.currencyId)}>
                                                Удалить
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div>
                        {localStorage.getItem('percentageChange') !== '' && localStorage.getItem('percentageChange') !== null && !isNaN(Number(localStorage.getItem('percentageChange'))) ? (
                            <p>
                                Стоимость портфеля пользователя: {Number(localStorage.getItem('portfolioValue')).toFixed(2)} USD
                                ({localStorage.getItem('percentageChange')}%)
                            </p>
                        ) : (
                            <p>Значения не найдены в localStorage.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalFinding;