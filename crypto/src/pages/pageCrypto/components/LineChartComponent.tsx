import React, { useEffect, useState } from 'react';
import { XAxis, YAxis, Tooltip, Legend, Area, AreaChart, ResponsiveContainer } from 'recharts';
import axios, { AxiosError } from 'axios';
import { COINCAP_API_URL } from '../../../constant/constant';
import './LineChartComponent.scss'

interface LineChartComponentProps {
    id: string;
}

interface HistoryData {
    date: string;
    priceUsd: number;
    time: number;
}

const LineChartComponent: React.FC<LineChartComponentProps> = ({ id }) => {
    const [data, setData] = useState<HistoryData[]>([]);

    useEffect(() => {
        axios
            .get(`${COINCAP_API_URL}/assets/${id}/history?interval=d1`)
            .then((response) => {
                const historyData: HistoryData[] = response.data.data;
                setData(historyData);
            })
            .catch((error: AxiosError) => {
                console.error('История данных потерялась ', error);
            });
    }, [id]);

    return (
        <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 10,
                        bottom: 10,
                        left: 10,
                    }}>
                    <XAxis /* dataKey='time'  */ />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                        type="monotone"
                        dataKey="priceUsd"
                        stroke="#8884d8"
                        fillOpacity={1}
                        fill="url(#colorUv)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default LineChartComponent;
