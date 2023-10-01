import React, { useEffect, useState } from 'react';
import { format, isAfter } from 'date-fns';
import {
    Container,
    Grid,
    Paper,
} from '@mui/material';

import api from '../../../services/api';

import Title from '../../../components/Title';
import CardShows from '../../../components/CardShows';
import CurrentNegotiationsTable from '../../../components/CurrentNegotiationsTable';

export default function DashboardManager() {
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
                            artist: obj.artist.name,
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
        <Container maxWidth="lg" sx={{ mt: 3, mb: 3 }}>
            <Title>Shows Confirmados</Title>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={4}>
                    {/* Conteúdo da Card */}
                    {cardData.length > 1 && (
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: "auto",
                            }}
                        >
                            <CardShows
                               mode="Manager"
                               name={cardData[0].artist}
                               eventName={cardData[0].event}
                               showDate={cardData[0].date}
                               showTime={cardData[0].time}
                            />
                        </Paper>
                    )}
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    {/* Conteúdo da Card */}
                    {cardData.length > 2 && (
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: "auto",
                            }}
                        >
                            <CardShows
                                mode="Manager"
                                name={cardData[1].artist}
                                eventName={cardData[1].event}
                                showDate={cardData[1].date}
                                showTime={cardData[1].time}
                            />
                        </Paper>
                    )}
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    {/* Conteúdo da Card */}
                    {cardData.length > 3 && (
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: "auto",
                            }}
                        >
                            <CardShows
                                mode="Manager"
                                name={cardData[2].artist}
                                eventName={cardData[2].event}
                                showDate={cardData[2].date}
                                showTime={cardData[2].time}
                            />
                        </Paper>
                    )}

                </Grid>
                {/* Recent Orders */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <CurrentNegotiationsTable mode="Manager" />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}   