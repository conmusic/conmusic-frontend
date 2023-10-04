import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { 
  Button, 
  Typography, 
  Paper, 
  Grid, 
  ImageList, 
  ImageListItem, 
  Box,
  Chip,
  Divider
} from '@mui/material';

const CarouselContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  marginBottom: "50px",
  marginTop: 30
});

const SmallImage = styled('img')({
  width: '150px',
  height: '150px',
  borderRadius: '50%',
});

const SubtitleContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '600px',
  marginLeft: "100px",
  justifyContent: "center"
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

export default function Tinder() {
    const [selectedImage, setSelectedImage] = useState(0);

  const image = [
    'https://s2-g1.glbimg.com/u_Sep5KE8nfnGb8wWtWB-vbBeD0=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2022/N/Q/S27GlHSKA6DAAjshAgSA/bar-paradiso.png',
  ]

  return (
    <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
      <Grid item xs={12} md={4}>
        <Paper sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: 4, gap: 1, my: 2 }}>
          <SmallImage src={image[selectedImage]} alt="Profile" />
          <Typography variant="h5" fontWeight='bold' style={{  marginTop: 2 }}>
            José da Silva
          </Typography>
          <Typography variant="subtitle1">
            jose-artista@gmail.com
          </Typography>
          <Typography variant="subtitle1">
            (11) 99999-9999
          </Typography>
          <Divider orientation="horizontal" flexItem />
          <Divider orientation="horizontal" flexItem />
          <Button component={'/tinder/proposal'} variant="contained" color="success" sx={{ marginY: 1.0 }}>
            Iniciar conversa
          </Button>
          <Button variant="contained" color="error" sx={{ marginY: 1.0 }}>
            Proximo artista
          </Button>
          <Divider orientation="horizontal" flexItem />
          <Typography variant='subtitle1'>
            Instagram: @joseartista
          </Typography>
          <Typography variant='subtitle1'>
            Facebook: /joseartista
          </Typography>

          <Divider orientation="horizontal" flexItem />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <SubtitleContainer>
          <CarouselContainer>
            <ImageList
              sx={{ width: '100%', height: 370 }}
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
          <Paper style={{ width: '100%', padding: '20px' }}>
            <Typography variant="h6" mb={1} fontWeight="bold">Sobre o artista</Typography>
            <Typography variant="subtitle1">
              Descriação artista
            </Typography>
          </Paper>
          <Divider orientation="horizontal" flexItem />
          <Paper style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: '20px', width:'100%'}}>
          <Typography variant="h6" mb={1} fontWeight="bold">
            Gêneros musicais
          </Typography>
          <Box style={{ display: 'flex', 	flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <Chip sx={{ backgroundColor: '#FB2D57', color: '#F2F2F2' , marginY: 1.5 }} label= "Pop" />
            <Chip sx={{ backgroundColor: '#FB2D57', color: '#F2F2F2' , marginY: 1.5 }} label= "Rock" />
            <Chip sx={{ backgroundColor: '#FB2D57', color: '#F2F2F2' , marginY: 1.5 }} label= "Sertanejo" />
          </Box>
          </Paper>
        </SubtitleContainer>
      </Grid>
    </Grid>
  );
}
