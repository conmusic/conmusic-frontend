import CardProposal from "../../components/CardProposal"
import CardShows from "../../components/CardShows"
import Title from "../../components/Title"
import { Container } from "@mui/material"

function Proposal(){
    return(
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Title>Shows Confirmados</Title>
            <CardProposal />
            <CardProposal />
        </Container>


    )
}
export default Proposal