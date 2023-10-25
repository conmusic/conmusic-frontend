import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import { useTheme } from '@mui/material';

export default function ChartBIBar() {
    const theme = useTheme();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Dados fictícios para o gráfico de gêneros musicais mais tocados por mês
    const data = [
      { month: 'Jan', rock: 500, pop: 300, hipHop: 400 },
      { month: 'Feb', rock: 600, pop: 350, hipHop: 450 },
      { month: 'Mar', rock: 550, pop: 320, hipHop: 420 },
      { month: 'Apr', rock: 700, pop: 400, hipHop: 500 },
      { month: 'May', rock: 800, pop: 450, hipHop: 550 },
      { month: 'Jun', rock: 750, pop: 420, hipHop: 480 },
    ];

    setChartData(data);
  }, []);

  return (
    <React.Fragment>
      <div className="chart-container">
        <h2 angle={270}
                position="left"
                style={{
                  textAnchor: 'middle',
                  fill: theme.palette.text.primary,
                  ...theme.typography.body1,
                }}>Gêneros mais tocados por mês</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="rock" stackId="a" fill="#8884d8" name="Rock" />
            <Bar dataKey="pop" stackId="a" fill="#82ca9d" name="Pop" />
            <Bar dataKey="hipHop" stackId="a" fill="#ffc658" name="Hip Hop" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </React.Fragment>
  );
}
