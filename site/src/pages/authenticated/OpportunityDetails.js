import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Button, Typography, Paper, Grid } from '@mui/material';

const Container = styled('div')({
  display: 'block',
  flexDirection: 'column',
  alignItems: 'baseline',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: 'white',
  overflow: 'hidden',
  flex: 1,
  left: 20,
  top: 20,
  marginLeft: '20px',
  marginTop: "100px"
});

const CarouselContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '16px',
  overflow: 'hidden',
  marginBottom: "50px",
  marginTop: "100px"
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

const SubtitleContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
  maxWidth: '600px',
  marginLeft: "100px",
  justifyContent: "center"
})

const ContainerPerfil = styled('div')({
  display: "flex",
  marginLeft: "50px"
})


const CarouselImage = styled('img')({
  display: 'block',
  maxWidth: '100%',
  height: 'auto',
  transition: 'transform 0.3s',
});

export default function OpportunityDetails() {
  const [selectedImage, setSelectedImage] = useState(0);

  const image = [
    'https://s2-g1.glbimg.com/u_Sep5KE8nfnGb8wWtWB-vbBeD0=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2022/N/Q/S27GlHSKA6DAAjshAgSA/bar-paradiso.png',
  ]

  const images = [
    'https://siterg.uol.com.br/wp-content/uploads/2021/08/carat-restaurante-1-1500.jpg',
    'https://i.em.com.br/rAJeeP9SoFSjX_I1nrctXKWpDiM=/1200x900/smart/imgsapp.em.com.br/app/noticia_127983242361/2023/03/20/1470806/fotos-tulio-santosem_1_72755.jpg',
    'https://turismodeminas.com.br/wp-content/uploads/2021/09/Lugares-por-Beaga-Bar-do-Antonio-costelinha-com-molho-de-rapadura-com-queijo-pacha-torresmo-de-barriga-carnoba-file-com-taioba-bacon-batata-credito-Vivi-Martineli-4-scaled.jpg',
  ];

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

            <Button variant="contained" color="primary" backgroundColor="green">
              Propor Serviço
            </Button>

            <SocialMedia>
              <ContactText variant="h5">Instagram:</ContactText>
              <ContactText>@RockandPub</ContactText>
              <ContactText variant="h5">Facebook:</ContactText>
              <ContactText>rockandpub@casa</ContactText>
            </SocialMedia>
          </Container>
        </ContainerPerfil>
      </Grid>
      <Grid item xs={12} md={6}>
        <SubtitleContainer>
          <CarouselContainer>
            {images.map((imgUrl, index) => (
              <CarouselImage
                key={index}
                src={imgUrl}
                alt={`Image ${index}`}
                style={{
                  maxWidth: '350px',
                  height: 'auto',
                }}
              />
            ))}
          </CarouselContainer>
          <Paper elevation={3} style={{ width: '100%', padding: '20px', border: '1px solid black' }}>
            <Typography variant="subtitle1">Somos um bar localizado no coração da cidade
              e temos uma estrutura ideal para shows intimistas e acústicos.
              Nossa casa tem um ambiente descontraído e aconchegante, perfeito para
              quem busca um lugar para relaxar e curtir boa música.
            </Typography>
          </Paper>
        </SubtitleContainer>
      </Grid>
    </Grid>
  );
}
