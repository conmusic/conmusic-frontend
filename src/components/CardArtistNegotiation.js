import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from "react-router";
import {
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
} from '@mui/material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import StatusChip from './StatusChip';

import api from '../services/api';

const style = {
  position: 'absolute',
  display: 'flex',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: 'auto'
};

const styleButton = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CardArtistNegotiation({ establishment, event, artist, showStart, showEnd, id, status, artistId }) {
  const navigate = useNavigate();

  const [value, setValue] = React.useState(2);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [showConfirmationButton, setShowConfirmationButton] = useState(false);
  const [openToast, setOpenToast] = React.useState(false);

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

  const handleClick = () => {
    setOpenToast(true);
    handleClose()
  };

  const handleNavigation = useCallback(() => {
    navigate(`/negotiations/${id}`)
  }, [navigate, id])

  const handleCloseToast = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenToast(false);
  };

  useEffect(() => {
    console.log("Test")
    if (status === 'CONCLUDED') {
      setShowConfirmationButton(true);
    }
  }, [status]);

  return (
    <Grid item xs={12} md={7} sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
      <Card sx={{ display: 'flex', width: 1300, alignItems: 'center', justifyContent: 'space-between' }}>
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
        <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Typography>
            {showStart}
          </Typography>
          <Typography variant="subtitle1" >
            {showEnd}
          </Typography>
        </CardContent>
        <CardContent sx={{ flex: 0.5, display: "flex" }}>
          <StatusChip label={status} />
        </CardContent>
        <CardContent sx={{ display: "flex" }}>
          <div style={{ display: "flex", flexDirection: 'column', justifyContent: showConfirmationButton ? 'space-between' : 'center' }}>
            <Button
              variant="outlined"
              color="inherit"
              onClick={handleNavigation}
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
            >
              Ir para o chat
            </Button>
          </div>
        </CardContent>
      </Card>
    </Grid>

  )
}
export default CardArtistNegotiation;