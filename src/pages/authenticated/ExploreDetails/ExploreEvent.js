import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
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
import PowerIcon from '@mui/icons-material/Power';

import api from '../../../services/api';
import eventPropsHelper from '../../../helpers/eventPropsHelper';

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

export default function ExploreEventDetails() {
  const navigate = useNavigate();
  const { exploreId } = useParams();

  const [perfilImage, setPerfilImage] = useState('');
  const [images, setImages] = useState([]);

  async function getPerfilImage(artistId) {
    try {
      var token = localStorage.getItem('@conmusic:token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await api.get(`/artists/image/perfil/${artistId}`, config);

      if (response.data.url) {
        setPerfilImage(response.data.url);
      } else {
        // Caso o artista não tenha imagem de perfil cadastrada, limpar a imagem anterior
        setPerfilImage('');
      }
    } catch (error) {
      console.error('Erro ao buscar imagem:', error);
    }
  }

  async function getImages(artistId) {
    try {
      var token = localStorage.getItem('@conmusic:token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await api.get(`/artists/images/${artistId}`, config);

      const patternMapping = {
        0: { cols: 2, rows: 2 },
        1: { cols: 1, rows: 1 },
        2: { cols: 1, rows: 1 },
        3: { cols: 2, rows: 1 },
        4: { cols: 2, rows: 1 },
        5: { cols: 2, rows: 2 },
        6: { cols: 1, rows: 1 },
        7: { cols: 1, rows: 1 },
      };

      const updatedImages = response.data.map((image, index) => ({
        ...image,
        ...patternMapping[index],
      }));

      setImages(updatedImages);
    } catch (error) {
      console.error('Erro ao buscar imagens:', error);
    }
  }

  const [event, setEvent] = useState({
    establishmentId: '',
    name: '',
    genre: '',
    paymentValue: '',
    couvertCharge: '',
    establishmentName: '',
    address: {
      address: '',
      city: '',
      state: '',
      zipCode: '',
    },
    phoneNumber: '',
    infrastructure: {
      capacity: '',
      outlet110: '',
      outlet220: '',
    },
    description: '',
  })

  useEffect(() => {
    const getEventData = async () => {
      try {
        const { data } = await api.get(`/events/${exploreId}`)

        setEvent({
          establishmentId: data.establishment.id,
          name: data.name,
          genre: data.genre.name,
          paymentValue: data.value,
          couvertCharge: data.coverCharge,
          establishmentName: data.establishment.fantasyName,
          address: {
            address: data.establishment.address,
            city: data.establishment.city,
            state: data.establishment.state,
            zipCode: data.establishment.zipCode,
          },
          phoneNumber: data.establishment.phoneNumber,
          infrastructure: {
            capacity: data.establishment.capacity,
            outlet110: data.establishment.amount110Outlets,
            outlet220: data.establishment.amount220Outlets,
          },
          description: data.description
        });
      } catch (error) {
        console.error(error)
      }
    }

    getEventData()
  }, [exploreId])

  const handleMakeProposal = useCallback(() => {
    navigate(`/make-proposal/${exploreId}`)
  }, [navigate, exploreId])


  const image = [
    'https://s2-g1.glbimg.com/u_Sep5KE8nfnGb8wWtWB-vbBeD0=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2022/N/Q/S27GlHSKA6DAAjshAgSA/bar-paradiso.png',
  ]

  return (
    <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
      <Grid item xs={12} md={4}>
        <Paper sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: 4, gap: 1, my: 2 }}>
          <SmallImage src={image[0]} alt="Profile" />
          <Typography variant="h5" fontWeight='bold' style={{ color: '#FB2D57', marginTop: 2 }}>
            {event.name}
          </Typography>
          <Box>
            <Chip sx={{ backgroundColor: '#FB2D57', color: '#F2F2F2' }} label={event.genre} />
          </Box>
          <Divider orientation="horizontal" flexItem />
          <Box>
            <Typography variant="h6" mb={1} fontWeight="bold">Pagamento</Typography>
            <Box variant="body1" display='flex' flexDirection="row">
              <Typography fontWeight="bold" mr={0.5}>Valor fixo:</Typography>
              <Typography>{eventPropsHelper.getFormattedPaymentValue(event.paymentValue)}</Typography>
            </Box>
            <Box variant="body1" display='flex' flexDirection="row">
              <Typography fontWeight="bold" mr={0.5}>Taxa de Couvert:</Typography>
              <Typography>{eventPropsHelper.getFormattedCouvertCharge(event.couvertCharge)}</Typography>
            </Box>
          </Box>
          <Divider orientation="horizontal" flexItem />
          <Button
            variant="contained"
            color="success"
            sx={{ marginY: 1.5 }}
            onClick={handleMakeProposal}
          >
            Propor Serviço
          </Button>
          <Divider orientation="horizontal" flexItem />
          <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
            {event.establishmentName}
          </Typography>
          <Typography>
            {eventPropsHelper.getFormattedPhoneNumber(event.phoneNumber)}
          </Typography>
          <Typography variant='body1'>
            {eventPropsHelper.getFormattedAddress(event.address)}
          </Typography>
          <Typography variant='body1'>
            {eventPropsHelper.getFormattedZipCode(event.address.zipCode)}
          </Typography>
          <Divider orientation="horizontal" flexItem />
          <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
            Infraestrutura
          </Typography>
          <Box variant="body1" display='flex' flexDirection="row">
            <Typography fontWeight="bold" mr={0.5}>Capacidade:</Typography>
            <Typography textTransform='capitalize'>{event.infrastructure.capacity} pessoas</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Chip
              icon={<PowerIcon color='#F2F2F2' />}
              label={`110V: ${event.infrastructure.outlet110}`}
              sx={{ backgroundColor: '#FB2D57', color: '#F2F2F2' }}
            />
            <Chip
              icon={<PowerIcon color='#F2F2F2' />}
              label={`220V: ${event.infrastructure.outlet220}`}
              sx={{ backgroundColor: '#FB2D57', color: '#F2F2F2' }}
            />
          </Box>
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
            <Typography variant="h6" mb={1} fontWeight="bold">Descrição do Evento</Typography>
            <Typography variant="subtitle1">
              {event.description}
            </Typography>
          </Paper>
        </SubtitleContainer>
      </Grid>
    </Grid>
  );
}
