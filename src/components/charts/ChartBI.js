import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Label, 
  ResponsiveContainer, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';


import Title from '../Title';



export default function ChartBI() {
    const theme = useTheme();
    const [chartData, setChartData] = useState([]);
  
    useEffect(() => {
      // Dados fictícios para o gráfico de rentabilidade mensal
      const data = [
        { month: 'Jan', profit: 5000 },
        { month: 'Feb', profit: 6000 },
        { month: 'Mar', profit: 5500 },
        { month: 'Apr', profit: 7000 },
        { month: 'May', profit: 8000 },
        { month: 'Jun', profit: 7500 },
      ];
  
      setChartData(data);
    }, []);
  
    return (
      <React.Fragment>
        <Title>Rentabilidade Mensal</Title>
       
        <ResponsiveContainer>
          <LineChart
            data={chartData}
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
                Rentabilidade
              </Label>
            </YAxis>
            <Tooltip />
            <Line
              isAnimationActive={true}
              type="monotone"
              dataKey="profit"
              stroke="red"
              strokeWidth={2}
              dot={{ stroke: "red", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 8 }}
              name="Rentabilidade Mensal"
            />
          </LineChart>
        </ResponsiveContainer>

        



      </React.Fragment>
    );
  }