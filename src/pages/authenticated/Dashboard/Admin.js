import React, { useState, useEffect } from 'react';
import { format, isAfter } from 'date-fns';
import {
    Container,
    Grid,
    Paper,
    Box
} from '@mui/material';
import Typography from '@mui/material/Typography';

import api from '../../../services/api';

import ChartAdmin from '../../../components/charts/ChartAdmin';
import ChartAdminMonth from '../../../components/charts/ChartAdminMonth';
import Title from '../../../components/Title';
import CardAdmin from '../../../components/CardAdmin';

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
                <Grid container spacing={3}>
                    {/* Recent CardAdmin */}
                    <Grid item xs={12} md={4} lg={4}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 300,
                                marginBottom: 3
                            }}
                        >
                            <Typography component="p">Artistas que Fizeram Apenas um Show:</Typography>
                            <CardAdmin  sx={{ height: '100%' }}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 300,
                                marginBottom: 3
                            }}
                        >
                            <Typography component="p">Casas de Show que não Voltam a Anuciar:</Typography>
                            <CardAdmin sx={{ height: '50%' }}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 300,
                                marginBottom: 3
                            }}
                        >
                            
                            <Typography component="p">Porcentagem de Shows que são Cancelados:</Typography>
                            <CardAdmin sx={{ height: '50%' }}/>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={6} md={6} lg={6}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 350,
                        }}
                    >
                        <Title>Quantidade de Shows Confirmados dos Últimos Mêses</Title>
                        <ChartAdminMonth sx={{ height: '50%' }} />
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
                        <Title>Tempo Médio de Espera para Confirmação de Shows</Title>
                        <ChartAdminMonth sx={{ height: '50%' }} />
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
                        <ChartAdmin sx={{ height: '50%' }} />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}