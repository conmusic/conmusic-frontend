import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';
import Title from './Title';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData('Janeiro', 0),
  createData('Fevereiro', 300),
  createData('Março', 600),
  createData('Abriu', 800),
  createData('Maio', 1500),
  createData('Junho', 2000),
  createData('Julho', 2400),
  createData('Agosto', 2100),
  createData('Setembro', 1950),
  createData('Outubro', 2000),
  createData('Novembro', 2400),
  createData('Dezembro', 2350),
];

export default function Chart() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Shows Confirmados por Mês e Evolução</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
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
            dataKey="amount"
            stroke="red"
            strokeWidth={2}
            dot={{ stroke: "red", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}