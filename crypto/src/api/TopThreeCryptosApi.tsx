import axios from 'axios';
import { COINCAP_API_URL } from '../constant/constant';

export const fetchTopThreeCryptos = async () => {
    try {
        const response = await axios.get(`${COINCAP_API_URL}/assets?limit=3&sort=rank`);
        const data = response.data.data;
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
};
