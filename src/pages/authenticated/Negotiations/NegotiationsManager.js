import React, { useState, useEffect } from 'react';
import { Container } from "@mui/material"
import { format } from 'date-fns';

import CardArtistNegotiation from "../../../components/CardArtistNegotiation"
import Title from "../../../components/Title"

import api from "../../../services/api";

export default function NegotiationsManager() {
    const [cardData, setCardData] = useState([]);

    useEffect(() => {
        const fetchCardData = async () => {
            try {
                var token = localStorage.getItem('@conmusic:token');
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };
                const response = await api.get('/shows/negotiations', config);
                console.log(response);
                var card = response.data
                    .map(obj => {
                        let showDate = format(new Date(obj.schedule.startDateTime), "dd/MM/yyyy");
                        let showStartDateTime = format(new Date(obj.schedule.startDateTime), "HH:mm");
                        let showEndDateTime = format(new Date(obj.schedule.endDateTime), "HH:mm");

                        return {
                            establishment: obj.event.establishment.establishmentName,
                            event: obj.event.name,
                            artist: obj.artist.name,
                            showStart: `${showDate} - ${showStartDateTime}`,
                            showEnd: `${showDate} - ${showEndDateTime}`,
                            id: obj.id,
                            status: obj.status,
                            artistId: obj.artist.id
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
            <Title>Negociações</Title>
            {
                cardData.map(item => (
                    <CardArtistNegotiation
                        key={`Negotiation#${item.id}`}
                        id={item.id}
                        establishment={item.establishment}
                        event={item.event}
                        artist={item.artist}
                        showStart={item.showStart}
                        showEnd={item.showEnd}
                        status={item.status}
                        artistId={item.artistId}
                    />
                ))
            }
        </Container>
    )
}