import React, { useEffect, useState } from "react"
import { format } from "date-fns"
import { Container } from "@mui/material"

import CardEventProposal from "../../../components/CardEventProposal"
import Title from "../../../components/Title"

import api from "../../../services/api"
import Pagina from "../../../components/PaginationForCards"

export default function ProposalsArtist(){
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
                        establishmentId: proposal.event.establishment.id,
                        event: proposal.event.name,
                        local: proposal.event.establishment.address,
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
                    <CardEventProposal 
                        key={`Proposal#${item.id}`}
                        id={item.id}
                        establishment={item.establishment}
                        establishmentId={item.establishmentId}
                        event={item.event}
                        local={item.local}
                        showStart={item.showStart}
                        showEnd={item.showEnd}
                    />
                ))
            }
            <Pagina />
        </Container>
    )
}
