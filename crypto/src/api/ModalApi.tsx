import axios from 'axios';
import { COINCAP_API_URL } from '../constant/constant';

export const fetchCurrencies = async () => {
    try {
        const response = await axios.get(`${COINCAP_API_URL}/assets`);
        const apiCurrencyIds = response.data.data.map((currency: any) => currency.id);
        const storedCurrencies = Object.keys(localStorage)
            .filter((key) => {
                return apiCurrencyIds.includes(key);
            })
            .map((key) => {
                const currencyData = response.data.data.find(
                    (currency: any) => currency.id === key
                );
                return {
                    currencyId: key,
                    quantity: localStorage.getItem(key) || '',
                    price: currencyData ? parseFloat(currencyData.priceUsd) : 0,
                };
            });
        return storedCurrencies;
    } catch (error) {
        console.error('Failed to fetch currencies:', error);
        throw error;
    }
};
