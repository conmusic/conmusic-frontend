import CardNegotiation from "../../components/CardNegotiation"
import Title from "../../components/Title"
import { Container } from "@mui/material"

function Negotiation(){
    return(
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Title>Negociações</Title>
            <CardNegotiation />
            <CardNegotiation />
        </Container>


    )
}
export default Negotiation