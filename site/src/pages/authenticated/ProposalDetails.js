import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Button, Typography, Paper, Grid } from '@mui/material';
import Stack from '@mui/material/Stack';

const style = {
    display: 'flex',
    marginTop: 4,
    flexDirection: 'column',
    marginLeft: 10
}

const styleTags = {
    color: 'white',
    backgroundColor: '#FB2D57',
    width: 100,
    height: '40px',
    borderRadius: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap'
}

const styleSobreShow = {
    display: 'flex',
    fontWeight: 'bold'
}

const ContainerSobreShow = styled('div')({
    display: 'flex',
    flexDirection: 'column',
})

const Container = styled('div')({
    display: 'block',
    flexDirection: 'column',
    alignItems: 'baseline',
    justifyContent: 'center',
    height: '100vh',
    overflow: 'hidden',
    flex: 1,
    left: 20,
    top: 20,
    marginLeft: '20px',
    marginTop: 30
});

const SocialMedia = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
});

const SmallImage = styled('img')({
    width: '150px',
    height: '150px',
    borderRadius: '50%',
});

const HighlightText = styled('span')({
    fontWeight: 'bold',
    fontSize: '24px',
});

const ContactText = styled('p')({
    fontSize: '16px',
    margin: '8px 0',
});


const ContainerPerfil = styled('div')({
    display: "flex",
    marginLeft: "50px"
})
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const ItemArtist = ({ imageSrc, label }) => (
    <div style={{ textAlign: 'center' }}>
        <img src={imageSrc} alt="Item" style={{ width: '150px', display: "flex", 
        flexDirection: "column" }} />
        <Typography variant="caption" align="center" gutterBottom>
            {label}
        </Typography>
    </div>
);

export default function ProposalDetails() {
    const [selectedImage, setSelectedImage] = useState(0);

    const image = [
        'https://s2-g1.glbimg.com/u_Sep5KE8nfnGb8wWtWB-vbBeD0=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2022/N/Q/S27GlHSKA6DAAjshAgSA/bar-paradiso.png',
    ]

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
                <ContainerPerfil>
                    <Container>
                        <CssBaseline />
                        <SmallImage src={image[selectedImage]} alt="Profile" />

                        <Typography variant="h4">
                            <HighlightText>Rock and Pub</HighlightText>
                        </Typography>

                        <ContactText>rockandpub@casa.com</ContactText>
                        <ContactText>(79) 2448-4646</ContactText>

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Button variant="contained" color="success" style={{ width: '23ch', marginBottom: 8 }}>
                                Iniciar Conversa
                            </Button>
                            <Button variant="contained" color="error" style={{ width: '23ch' }}>
                                Recusar
                            </Button>
                        </div>
                        <SocialMedia>
                            <ContactText variant="h5">Instagram:</ContactText>
                            <ContactText>@RockandPub</ContactText>
                            <ContactText variant="h5">Facebook:</ContactText>
                            <ContactText>rockandpub@casa</ContactText>
                        </SocialMedia>
                    </Container>
                </ContainerPerfil>
            </Grid>
            <Grid item xs={12} md={6} sx={style}>
                <Typography variant="h5" style={{ display: 'flex', marginBottom: 25, fontWeight: 'bold' }}>
                    Sobre o Show
                </Typography>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <ContainerSobreShow>
                        <div style={{ display: 'flex', flexDirection: 'column', marginRight: 140, marginBottom: 15 }}>
                            <Typography variant="h6" sx={styleSobreShow}>
                                Localização:
                            </Typography>
                            São Paulo - SP
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', marginRight: 140, marginBottom: 15 }}>
                            <Typography variant="h6" sx={styleSobreShow}>
                                Início:
                            </Typography>
                            01/05/2023 12h00
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 15 }}>
                            <Typography variant="h6" sx={styleSobreShow}>
                                Fim:
                            </Typography>
                            01/05/2023 16h00
                        </div>
                    </ContainerSobreShow>
                    <ContainerSobreShow>
                        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 15 }}>
                            <Typography variant="h6" sx={styleSobreShow} >
                                Evento:
                            </Typography>
                            Noite do Rock
                        </div>
                        <div>
                            <Typography variant="h6" sx={styleSobreShow}>
                                Valor Proposto:
                            </Typography>
                            R$ xxxx,xx
                        </div>
                    </ContainerSobreShow>
                </div>
                <Typography variant="h6" sx={styleSobreShow}>
                    Sobre mim
                </Typography>
                Somos um bar localizado no coração da cidade e temos uma estrutura ideal 
                para shows intimistas e acústicos. Nossa casa tem um ambiente 
                descontraído e aconchegante, perfeito para quem busca um lugar 
                para relaxar e curtir boa música.
                <div style={{
                    display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
                    justifyContent: 'space-between', marginTop: 25, alignItems: 'center'
                }}>
                    <div style={{ fontWeight: 'bold' }}>
                        Tags:
                    </div>
                    <div style={styleTags}>
                        Rock
                    </div>
                    <div style={styleTags}>
                        Samba
                    </div>
                    <div style={styleTags}>
                        Jazz
                    </div>
                </div>
                <div>
                    <Stack direction="row" marginTop={2} justifyContent="space-between" spacing={2}>
                        <ItemArtist imageSrc="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e" label="Item 1" />
                        <ItemArtist imageSrc="https://images.unsplash.com/photo-1551782450-a2132b4ba21d" label="Item 2" />
                        <ItemArtist imageSrc="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62" label="Item 3" />
                    </Stack>
                </div>
            </Grid>
        </Grid>
    );
}
