import CardOportunity from "../../components/CardOportunity"
import CardShows from "../../components/CardShows"
import Title from "../../components/Title"
import { Container } from "@mui/material"

function Oportunity(){
    return(
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Title>Negociações</Title>
            <CardOportunity />
            <CardOportunity />
        </Container>


    )
}
export default Oportunity