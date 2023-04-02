import { useState, useEffect } from "react";
import axios from "axios";

type Asset = {
    id: string;
    rank: string;
    symbol: string;
    name: string;
    priceUsd: string;
    changePercent24Hr: string;
};

type AssetsData = {
    data: Asset[];
};

const PAGE_SIZE = 100;

const fetchData = async (page: number): Promise<Asset[]> => {
    const response = await axios.get<AssetsData>(`https://api.coincap.io/v2/assets?limit=${PAGE_SIZE}&offset=${(page - 1) * PAGE_SIZE}`
    );
    return response.data.data;
};

const useAssets = () => {
    const [assets, setAssets] = useState<Asset[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetchData(currentPage)
            .then((data) => {
                setAssets(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, [currentPage]);

    return { assets, currentPage, setCurrentPage, loading };
};

export default useAssets;