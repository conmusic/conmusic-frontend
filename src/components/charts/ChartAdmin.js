import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { format, getYear } from 'date-fns';
import showMonthHelper from '../../helpers/showMonthHelper'

import api from '../../services/api';

import Title from '../Title';

export default function ChartAdmin() {
    const theme = useTheme();
    const [ChartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                var token = localStorage.getItem('@conmusic:token');
                let endDate = new Date()
                let startDate = new Date(getYear(endDate), 0, 1)
                const config = {
                    headers: { Authorization: `Bearer ${token}` },
                    params: {
                        startDate: format(startDate, "yyyy-MM-dd HH:mm:ss"),
                        endDate: format(endDate, "yyyy-MM-dd HH:mm:ss"),
                    }
                };

                const response = await api.get('/shows/statistics/count-confirmed-by-month', config);
                var graphData = response.data.map(obj => {
                    return {
                        month: showMonthHelper.getDisplayMonth(obj.month),
                        count: obj.count
                    }
                })
                setChartData(graphData)
            } catch (error) {
                console.error('Erro ao buscar os dados do gráfico:', error);
            }
        };

        fetchChartData();
    }, []);

    return (
        <React.Fragment>
            <Title>Artistas que mais Fizeram Sucesso nos Últimos Mêses</Title>
            <BarChart
                xAxis={[
                    {
                        id: 'barCategories',
                        data: ['Felipe', 'Guilherme', 'Cleber', 'Matheus', 'Calebe', 'Vinicius', 
                        'Igor', 'Leandro', 'Leticia'],
                        scaleType: 'band',
                    },
                ]}
                series={[
                    {
                        data: [2, 5, 3, 4, 5, 3, 7, 8, 10],
                        color: '#2D75FB'
                    },
                ]}
            />
        </React.Fragment>
    );
}
