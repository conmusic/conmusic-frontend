import React, { useEffect, useState } from "react"
import { format } from "date-fns"
import { Container } from "@mui/material"

import CardArtistProposal from "../../../components/CardArtistProposal"
import Title from "../../../components/Title"

import api from "../../../services/api"

export default function ProposalsManager(){
    const [proposals, setProposals] = useState([])

    useEffect(() => {
        async function getProposals() {
            try {
                const { data } = await api.get("/shows/proposals")

                console.log(data)
                setProposals(data.map(proposal => {
                    let showDate = format(new Date(proposal.schedule.startDateTime), "dd/MM/yyyy");
                    let showStartDateTime = format(new Date(proposal.schedule.startDateTime), "HH:mm");
                    let showEndDateTime = format(new Date(proposal.schedule.endDateTime), "HH:mm");

                    return {
                        establishment: proposal.event.establishment.establishmentName,
                        event: proposal.event.name,
                        artist: proposal.artist.name,
                        artistId: proposal.artist.id,
                        showStart: `${showDate} - ${showStartDateTime}`,
                        showEnd: `${showDate} - ${showEndDateTime}`,
                        id: proposal.id
                    }
                }));
            } catch (error) {
                console.error(error)
            }     
        }

        getProposals()
    }, []);

    return(
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Title>Propostas recebidas</Title>
            {
                proposals.map(item => (
                    <CardArtistProposal 
                        key={`Proposal#${item.id}`}
                        id={item.id}
                        establishment={item.establishment}
                        event={item.event}
                        artist={item.artist}
                        showStart={item.showStart}
                        showEnd={item.showEnd}
                        artistId={item.artistId}
                    />
                ))
            }
        </Container>
    )
}
