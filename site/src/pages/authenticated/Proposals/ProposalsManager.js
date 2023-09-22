import React from "react"
import { Container } from "@mui/material"

import CardOportunity from "../../../components/CardEventProposal"
import Title from "../../../components/Title"

export default function ProposalsManager(){
    return(
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Title>Propostas recebidas</Title>
            <CardOportunity />
            <CardOportunity />
        </Container>
    )
}