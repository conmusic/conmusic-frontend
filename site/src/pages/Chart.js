import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';
import Title from './Title';
import api from '../services/api';
import { format, getYear } from 'date-fns';
import showMonthHelper from '../helpers/showMonthHelper'

export default function Chart() {
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
      <Title>Shows Confirmados por Mês e Evolução</Title>
      <ResponsiveContainer>
        <LineChart
          data={ChartData}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Qtd Shows Confirmados
            </Label>
          </YAxis>
          <Tooltip />
          <Line
            isAnimationActive={true}
            type="monotone"
            dataKey="count"
            stroke="red"
            strokeWidth={2}
            dot={{ stroke: "red", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 8 }}
            name="Shows confirmados"
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}