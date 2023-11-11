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
import { makeStyles } from '@material-ui/core/styles';
import Title from '../../../components/Title';
import CardAdmin from '../../../components/CardAdmin';
import styled from 'styled-components';
import Select from '../../../components/Select';

const useStyles = makeStyles({
  input: {
    width: '200px',
    display: "flex"
  },
});

const dataset = [
  {
    genre: 'Evento 1',
    value: 120,
    color: '#ff5733', // Specify a color for the Rock genre
  },
  {
    genre: 'Evento 2',
    value: 90,
    color: '#3366ff', // Specify a color for the Pop genre
  },
  {
    genre: 'Evento 3',
    value: 85,
    color: '#33ff33', // Specify a color for the Samba genre
  },
  {
    genre: 'Evento 4',
    value: 70,
    color: '#ffcc33', // Specify a color for the Eletronica genre
  },
  {
    genre: 'Evento 5',
    value: 60,
    color: '#9933ff', // Specify a color for the Jazz genre
  },
  {
    genre: 'Evento 6',
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
      label: 'Eventos Realizados',
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
      <LocalizationProvider dateAdapter={AdapterDayjs} >
        <DemoContainer
          components={['MultiInputDateRangeField', 'SingleInputDateRangeField']}
        >
          <MultiInputDateRangeField
            slotProps={{
              textField: ({ position }) => ({
                label: position === 'Data inicial' ? 'Departure' : 'Data final',
                className: classes.input
              }),
            }}
          />
        </DemoContainer>
      </LocalizationProvider>
      <Box>
        <Grid container spacing={3} flexWrap={'nowrap'} marginTop={1}>
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
                color: "white",
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

              <Typography component="p">Propostas Recebidas:</Typography>
              <CardAdmin sx={{ height: '50%' }} valor='45%' />
              <CenteredTypography component="p">Total de propostas: 12</CenteredTypography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Select />
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
            <Title>Eventos com mais Propostas Recebidas</Title>
            <BarChart
              dataset={dataset}
              yAxis={[{ scaleType: 'band', dataKey: 'genre' }]}
              series={[{ dataKey: 'value', label: 'Propostas Recebidas', valueFormatter, color: '#2D75FB' }]}
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