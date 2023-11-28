import CardEventNegotiation from "../../../components/CardEventNegotiation"
import Title from "../../../components/Title"
import { Container } from "@mui/material"
import { format } from 'date-fns';
import React, { useState, useEffect } from 'react';
import api from "../../../services/api";
import Pagina from "../../../components/PaginationForCards";

export default function NegotiationsArtist() {
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
                            establishmentId: obj.event.establishment.id,
                            establishment: obj.event.establishment.establishmentName,
                            establishmentId: obj.event.establishment.id,
                            event: obj.event.name,
                            local: obj.event.establishment.address,
                            showStart: `${showDate} - ${showStartDateTime}`,
                            showEnd: `${showDate} - ${showEndDateTime}`,
                            id: obj.id,
                            status: obj.status
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
                    <CardEventNegotiation
                        key={`Negotiation#${item.id}`}
                        id={item.id}
                        establishment={item.establishment}
                        establishmentId={item.establishmentId}
                        event={item.event}
                        local={item.local}
                        showStart={item.showStart}
                        showEnd={item.showEnd}
                        status={item.status}
                    />
                ))
            }
            <Pagina />
        </Container>
    )
}