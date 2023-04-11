import axios from 'axios';
import { COINCAP_API_URL } from '../constant/constant';

export const fetchAssetData = async (id: string) => {
    try {
        const response = await axios.get(`${COINCAP_API_URL}/assets/${id}`);
        const data = response.data.data;
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
};
