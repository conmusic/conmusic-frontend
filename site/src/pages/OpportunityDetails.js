import React, { useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { mainListItems } from './listItems';
import logo from '../assets/images/logoConMusic-removebg-preview.png';
import { spacing } from '@mui/system';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: 'white',
  flex: 1,
  left: 20,
  top: 20,
  marginLeft: '20px', // Espaçamento aqui
  marginTop: '20px',
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

const LargeImageContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: '16px',
  flex: 1,
  justifyContent: 'center',
});

const SubtitleContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
  maxWidth: '600px',
  marginLeft: "100px",
  justifyContent: "center"
})

const LargeImage = styled('img')({
  display: 'solid',
  maxWidth: '400px',
  maxHeight: '400px',
});

const ContainerPerfil = styled('div')({
  display: "flex",
  marginLeft: "50px"
})

const CarouselContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '16px',
  overflow: 'hidden',
  marginBottom: "50px",
  marginLeft: "100px"
});

const CarouselImage = styled('img')({
  display: 'block',
  maxWidth: '100%',
  height: 'auto',
  transition: 'transform 0.3s',
});

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  boxShadow: 'none',
  borderBottom: '1px solid #ccc',
}));

const theme = createTheme({
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: '#fb2b57',
        },
      },
    },
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: spacing(9),
        },
      }),
    },
  }),
);

export default function OpportunityDetails() {
  const [selectedImages, setSelectedImages] = useState(0);
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
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute">
          <Toolbar
            sx={{
              backgroundColor: 'white',
              pr: '24px',
            }}
          >
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              <a href="/#" className="nav__logo">
                <img src={logo} alt="" className="nav__logo-img" />
              </a>
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" >
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton>
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>
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
          <Paper elevation={3} style={{ width: 'calc(100% - 100px)', padding: '20px', border: '1px solid black', 
          marginLeft: "100px", 
          }}>
            <Typography variant="subtitle1">Somos um bar localizado no coração da cidade 
            e temos uma estrutura ideal para shows intimistas e acústicos. 
            Nossa casa tem um ambiente descontraído e aconchegante, perfeito para 
            quem busca um lugar para relaxar e curtir boa música.
            </Typography>
          </Paper>
        </SubtitleContainer>
      </Box>
    </ThemeProvider >
  );
}
