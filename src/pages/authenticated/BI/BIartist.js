import React, { useState, useEffect } from 'react';
import { format, isAfter } from 'date-fns';
import {
  Container,
  Grid,
  Paper,
  Box
} from '@mui/material';
import Typography from '@mui/material/Typography';
import ChartBI from '../../../components/charts/ChartBI'
import api from '../../../services/api';
import { BarChart } from '@mui/x-charts/BarChart';
import ChartAdmin from '../../../components/charts/ChartAdmin';
import ChartAdminMonth from '../../../components/charts/ChartAdminMonth';
import Title from '../../../components/Title';
import CardAdmin from '../../../components/CardAdmin';

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

  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        var token = localStorage.getItem('@conmusic:token');
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        const response = await api.get('/shows/confirmed', config);
        var card = response.data
          .filter(obj => isAfter(new Date(obj.schedule.startDateTime), new Date()))
          .map(obj => {
            let showDate = format(new Date(obj.schedule.startDateTime), "dd/MM/yyyy");
            let showStartDateTime = format(new Date(obj.schedule.startDateTime), "HH:mm");
            let showEndDateTime = format(new Date(obj.schedule.endDateTime), "HH:mm");

            return {
              establishment: obj.event.establishment.establishmentName,
              event: obj.event.name,
              date: showDate,
              time: `${showStartDateTime} - ${showEndDateTime}`,
            }
          })
        setCardData(card);
      } catch (error) {
        console.error('Erro ao buscar os dados dos cards:', error);
      }
    };

    fetchCardData();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Title>Visão Geral</Title>
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
                width: 225
              }}
            >
              <Typography component="p">Propostas Recebidas:</Typography>
              <CardAdmin sx={{ height: '100%' }} />
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
                width: 225
              }}
            >
              <Typography component="p">Shows Confirmados:</Typography>
              <CardAdmin sx={{ height: '50%' }} />
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
                width: 225
              }}
            >

              <Typography component="p">Shows Cancelados:</Typography>
              <CardAdmin sx={{ height: '50%' }} />
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
                width: 225
              }}
            >

              <Typography component="p">Negociações Vantajosas:</Typography>
              <CardAdmin sx={{ height: '50%' }} />
            </Paper>
          </Grid>
        </Grid>
      </Box>

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
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 350,
            }}
          >
            <div style={{display: 'flex', alignSelf: 'center'}}>
            <Title>Faturamento</Title>
            </div>
            <ChartBI sx={{ height: '50%' }} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}