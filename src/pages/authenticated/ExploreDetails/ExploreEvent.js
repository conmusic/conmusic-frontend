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
  const originalWidth = size * cols;
  const originalHeight = size * rows;
  const aspectRatio = originalWidth / originalHeight;

  // Definindo nova largura e altura com base na proporção original
  let newWidth = originalWidth;
  let newHeight = originalHeight;

  if (cols > rows) {
    newHeight = Math.round(originalWidth / aspectRatio);
  } else if (cols < rows) {
    newWidth = Math.round(originalHeight * aspectRatio);
  }

  return {
    src: `${image}?w=${newWidth}&h=${newHeight}&fit=crop&auto=format`,
    srcSet: `${image}?w=${newWidth}&h=${newHeight}&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function ExploreEventDetails() {
  const navigate = useNavigate();
  const { exploreId } = useParams();

  const [perfilImage, setPerfilImage] = useState('');
  const [images, setImages] = useState([]);

  async function getPerfilImage(establishmentId) {
    try {
      var token = localStorage.getItem('@conmusic:token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await api.get(`/establishments/image/perfil/${establishmentId}`, config);

      setPerfilImage(response.data.url);

    } catch (error) {
      console.error('Erro ao buscar imagem:', error);
    }
  }

  async function getImages(establishmentId) {
    try {
      var token = localStorage.getItem('@conmusic:token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await api.get(`/establishments/images/${establishmentId}`, config);

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

        if (data) {
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

          if (data.establishment.id) {
            console.log("Test: " + data.establishment.id);
            await Promise.all([
              getPerfilImage(data.establishment.id),
              getImages(data.establishment.id)
            ]);
          }
        }
      } catch (error) {
        console.error(error)
      }
    }

    getEventData()
  }, [exploreId])

  const handleMakeProposal = useCallback(() => {
    navigate(`/make-proposal/${exploreId}`)
  }, [navigate, exploreId])


  return (
    <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
      <Grid item xs={12} md={4}>
        <Paper sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: 4, gap: 1, my: 2 }}>
          <SmallImage src={perfilImage} alt="Profile" />
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
              {images.map((item) => (
                <ImageListItem key={item.url} cols={item.cols || 1} rows={item.rows || 1}>
                  <img
                    {...srcset(item.url, 121, item.rows, item.cols)}
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
