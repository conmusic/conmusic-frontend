import React, { useState, useEffect } from 'react';
import { format, isAfter } from 'date-fns';
import {
  Box,
  Toolbar,
  Container,
  Grid,
  Paper,
} from '@mui/material';

import api from '../../services/api';

import Chart from '../../components/charts/Chart';
import CardShows from '../../components/CardShows';
import CurrentNegotiationsTable from '../../components/CurrentNegotiationsTable';
import Title from '../../components/Title';
import SideBar from '../../components/SideBar';
import Header from '../../components/Header';

export default function Dashboard() {
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
    <Box sx={{ display: 'flex', }}>
      <Header />
      <SideBar />      
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Title>Shows Confirmados</Title>
          <Grid container spacing={3}>
            {/* Recent CardShows */}
            <Grid item xs={12} md={4} lg={3}>
              {cardData.length > 0 && (
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 310,
                  }}
                >
                  <CardShows
                    estabelecimento={cardData[0].establishment}
                    evento={cardData[0].event}
                    dataDoShow={cardData[0].date}
                    horarioMarcado={cardData[0].time}
                  />
                </Paper>
              )}
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              {/* Conteúdo da Card */}
              {cardData.length > 1 && (
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 310,
                  }}
                >
                  <CardShows
                    estabelecimento={cardData[1].establishment}
                    evento={cardData[1].event}
                    dataDoShow={cardData[1].date}
                    horarioMarcado={cardData[1].time}
                  />
                </Paper>
              )}
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              {/* Conteúdo da Card */}
              {cardData.length > 2 && (
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 310,
                  }}
                >
                  <CardShows
                    estabelecimento={cardData[2].establishment}
                    evento={cardData[2].event}
                    dataDoShow={cardData[2].date}
                    horarioMarcado={cardData[2].time}
                  />
                </Paper>
              )}
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              {/* Conteúdo da Card */}
              {cardData.length > 3 && (
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 310,
                  }}
                >
                  <CardShows
                    estabelecimento={cardData[3].establishment}
                    evento={cardData[3].event}
                    dataDoShow={cardData[3].date}
                    horarioMarcado={cardData[3].time}
                  />
                </Paper>
              )}

            </Grid>
            {/* Recent CurrentNegotiationsTable */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <CurrentNegotiationsTable />
              </Paper>
            </Grid>
            {/* Chart */}
            <Grid item xs={12} md={12} lg={12}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 350,
                }}
              >
                <Chart sx={{ height: '50%' }} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}