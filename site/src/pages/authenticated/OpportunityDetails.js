import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Button, Typography, Paper, Grid } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

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

const CarouselContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  marginBottom: "50px",
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

const SubtitleContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '600px',
  marginLeft: "100px",
  justifyContent: "center"
})

const ContainerPerfil = styled('div')({
  display: "flex",
  marginLeft: "50px"
})

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    author: '@arwinneil',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },

];

export default function OpportunityDetails() {
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
            <ImageList
              sx={{ width: 500, height: 370 }}
              variant="quilted"
              cols={4}
              rowHeight={121}
            >
              {itemData.map((item) => (
                <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                  <img
                    {...srcset(item.img, 121, item.rows, item.cols)}
                    alt={item.title}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
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
