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
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MultiInputDateRangeField } from '@mui/x-date-pickers-pro/MultiInputDateRangeField';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import Title from '../../../components/Title';
import CardAdmin from '../../../components/CardAdmin';
import Select from '../../../components/Select';
import styled from 'styled-components';


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

      <Title>Desempenho</Title>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={['MultiInputDateRangeField', 'SingleInputDateRangeField']}
      >
        <MultiInputDateRangeField
          slotProps={{
            textField: ({ position }) => ({
              label: position === 'start' ? 'Departure' : 'Return',
            }),
          }}
        />
        <SingleInputDateRangeField label="Departure - Return" />
      </DemoContainer>
    </LocalizationProvider>
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
                width: "auto",
                background: 'linear-gradient(to right, #2D75FB, #4D9CFF, #4D9CFF, #6CB6FF, #A7E9FF, #A7E9FF)',
                color: "white"
              }}
            >
              <Typography component="p" color={"black"}>Faturamento:</Typography>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 300,
                  boxShadow: 0,
                  background: 'transparent'
                }}
              >
                <Typography variant="h3" color="#15005A">
                  R$ 650
                </Typography>
              </Paper>

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
              <Typography component="p">Shows Confirmados:</Typography>
              <CardAdmin sx={{ height: '50%' }} valor='70%' />
              <CenteredTypography component="p">Total de Shows: 10</CenteredTypography>
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

              <Typography component="p">Shows Cancelados:</Typography>
              <CardAdmin sx={{ height: '50%' }} valor='10%' />
              <CenteredTypography component="p">Total de cancelados: 7</CenteredTypography>
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

              <Typography component="p">Negociações Vantajosas:</Typography>
              <CardAdmin sx={{ height: '50%' }} valor='45%' />
              <CenteredTypography component="p">Total de negociações: 12</CenteredTypography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Select />
      <Grid container spacing={3}>
        <Grid item xs={12} md={9} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 300,
            }}
          >
            <Title>Gêneros Musicais que mais Tiveram Shows</Title>
            <BarChart
              dataset={dataset}
              yAxis={[{ scaleType: 'band', dataKey: 'genre' }]}
              series={[{ dataKey: 'value', label: 'Gêneros Musicais mais tocados', valueFormatter, color: '#2D75FB' }]}
              layout="horizontal"
              {...chartSetting}
            />
          </Paper>
        </Grid>

        <Grid item xs={3} md={3} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 300,
              width: "auto"
            }}
          >
            <Typography component="p">Propostas Recebidas::</Typography>
            <CardAdmin sx={{ height: '50%' }} valor='70%' />
            <CenteredTypography component="p">Total de Shows: 10</CenteredTypography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={12} lg={12}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 300,
            }}
          >
            <div style={{ display: 'flex', alignSelf: 'center' }}>
              <Title>Faturamento</Title>
            </div>
            <ChartBI sx={{ height: '50%' }} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}