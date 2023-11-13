import React, { useCallback, useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Box,
  Typography,
  Select,
  OutlinedInput,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';
import ChartBI from '../../../components/charts/ChartBI'
import { BarChart } from '@mui/x-charts/BarChart';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { makeStyles } from '@material-ui/core/styles';
import Title from '../../../components/Title';
import CardAdmin from '../../../components/CardAdmin';
import styled from 'styled-components';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const useStyles = makeStyles({
  input: {
    width: '200px',
    display: "flex"
  },
});

const dataset = [
  {
    genre: 'Rock',
    value: 120,
    color: '#ff5733', // Specify a color for the Rock genre
  },
  {
    genre: 'Pop',
    value: 90,
    color: '#3366ff', // Specify a color for the Pop genre
  },
  {
    genre: 'Samba',
    value: 85,
    color: '#33ff33', // Specify a color for the Samba genre
  },
  {
    genre: 'Eletronica',
    value: 70,
    color: '#ffcc33', // Specify a color for the Eletronica genre
  },
  {
    genre: 'Jazz',
    value: 60,
    color: '#9933ff', // Specify a color for the Jazz genre
  },
  {
    genre: 'Classica',
    value: 50,
    color: '#ff33cc', // Specify a color for the Classica genre
  },
];

const CenteredTypography = styled(Typography)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
`;

const cardStyle = {
  height: 'fit-content',
};

const chartSetting = {
  xAxis: [
    {
      label: 'Shows Realizados',
    },
  ],
  height: 320,

};

const valueFormatter = (value) => `${value} Shows`;
const customColorScheme = {
  domain: ['#ff5733', '#3366ff', '#33ff33', '#ffcc33', '#9933ff', '#ff33cc'],
};
export default function DashboardAdmin() {
  const classes = useStyles();

  const [dateRange, setDateRange] = useState({
    startDate: dayjs().subtract(1, 'month'),
    endDate: dayjs()
  })

  const [period, setPeriod] = useState(0)

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

      <Title>Desempenho</Title>
      <Paper
        sx={{
          padding: 2,
          maxWidth: 'fit-content',
          marginBottom: 1
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs} >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <DatePicker
              label="Data Início"
              disableFuture
              views={['year', 'month', 'day']}
              value={dateRange.startDate}
              onChange={(newValue) => setDateRange(prev => ({ ...prev, startDate: newValue }))}
            />
            <DatePicker
              label="Data Termino"
              disableFuture
              views={['year', 'month', 'day']}
              value={dateRange.endDate}
              onChange={(newValue) => setDateRange(prev => ({ ...prev, endDate: newValue }))}
            />
          </Box>
        </LocalizationProvider>
      </Paper>
      <Box>
        <Grid container spacing={3} flexWrap={'nowrap'}>
          {/* Recent CardAdmin */}
          <Grid item xs={12} md={4} lg={4}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 200,
                marginBottom: 3,
                width: "auto"
              }}
            >

              <Typography component="p" fontWeight="bold">Propostas Recebidas:</Typography>
              <CardAdmin sx={{ height: '50%' }} valor='45' />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 200,
                marginBottom: 3,
                width: "auto"
              }}
            >
              <Typography component="p" fontWeight="bold">Negociações iniciadas</Typography>
              <CardAdmin sx={{ height: '50%' }} valor='70' />
              <CenteredTypography component="p">Por você: 10</CenteredTypography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 200,
                marginBottom: 3,
                width: "auto"
              }}
            >
              <Typography component="p" fontWeight="bold">Shows Confirmados</Typography>
              <CardAdmin sx={{ height: '50%' }} valor='70%' />
              <CenteredTypography component="p">Total de confirmados: 10</CenteredTypography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 200,
                marginBottom: 3,
                width: "auto"

              }}
            >

              <Typography component="p" fontWeight="bold">Shows Cancelados</Typography>
              <CardAdmin sx={{ height: '50%' }} valor='10%' />
              <CenteredTypography component="p">Total de cancelados: 7</CenteredTypography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Paper
        sx={{
          padding: 2,
          width: '50%',
          marginTop: 2,
          marginBottom: 2
        }}
      >
        <FormControl sx={{ width: '100%' }}>
          <InputLabel id='chart-period-label'>Período</InputLabel>
          <Select
            id='chart-period'
            labelId='chart-period-label'
            value={period}
            input={<OutlinedInput id="select-period" label="Período" />}
          >
            <MenuItem value={0}>Selecionar período</MenuItem>
            <MenuItem value={1}>Diário</MenuItem>
            <MenuItem value={2}>Semanal</MenuItem>
            <MenuItem value={3}>Mensal</MenuItem>
            <MenuItem value={4}>Trimestral</MenuItem>
            <MenuItem value={5}>Anual</MenuItem>
          </Select>
        </FormControl>
      </Paper>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={6}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 350,
            }}
          >
            <Title>Gêneros Musicais que mais Tiveram Shows</Title>
            <BarChart
              dataset={dataset}
              yAxis={[{ scaleType: 'band', dataKey: 'genre' }]}
              series={[{ dataKey: 'value', label: 'Gêneros Musicais mais tocados', valueFormatter, color: 'blue' }]}
              layout="horizontal"
              {...chartSetting}
            />
          </Paper>
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          <ChartBI sx={{ height: '50%' }} />
        </Grid>
      </Grid>
    </Container>
  );
}