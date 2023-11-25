import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
} from '@mui/material';

import myImage from '../assets/images/image.png';
import api from '../services/api';

function CardArtistProposal({ establishment, event, artist, showStart, showEnd, id, artistId }) {
  const navigate = useNavigate();

  const handleNavigation = useCallback(() => {
    navigate(`/proposals/${id}`)
  }, [navigate, id])

  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    const getImage = async () => {
      try {
        var token = localStorage.getItem('@conmusic:token');
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };

        const response = await api.get(`/artists/image/perfil/${artistId}`, config);

        console.log(response.data.url);

        setImageURL(response.data.url);
      } catch (error) {
        console.error('Erro ao buscar imagem:', error);
      }
    }

    getImage();
  }, []);

  return (
    <Grid item xs={12} md={7} sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
      <Card sx={{
        display: 'flex',
        width: 1300,
      }}>
        <CardMedia
          component="img"
          sx={{
            width: 120,
            height: 120,
            display: { xs: 'none', sm: 'block' },
            alignSelf: "center",
            borderRadius: 10,
            ml: 3,
          }}
          src={imageURL}
        />
        <CardContent sx={{ flex: 1, mt: 1 }}>
          <Typography component="h2" variant="h5" fontWeight="bold">
            {artist}
          </Typography>
          <Typography variant="subtitle1" >
            {event}
          </Typography>
          <Typography variant="subtitle1" paragraph>
            {establishment}
          </Typography>
        </CardContent>
        <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", mt: 2 }}>
          <Typography>
            {showStart}
          </Typography>
          <Typography variant="subtitle1" >
            {showEnd}
          </Typography>
        </CardContent>
        <CardContent sx={{ display: "flex" }}>
          <Button
            variant="outlined"
            size="medium"
            color="inherit"
            sx={{
              mt: 1,
              mr: 3,
              alignSelf: "center",
              borderColor: 'black',
              backgroundColor: '#fb2b57',
              color: 'white',
              '&:hover': {
                backgroundColor: 'white',
                color: 'black',
              },
            }}
            onClick={handleNavigation}
          >
            Ver Detalhes
          </Button>
        </CardContent>
      </Card>
    </Grid>

  )
}
export default CardArtistProposal;