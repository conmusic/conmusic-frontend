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

function CardEventNegotiation({ establishment, event, local, showStart, showEnd, id, status, establishmentId}) {
  const navigate = useNavigate();

  const handleClick = async () => {
    const getValue = value;
    const getEstablishmentId = establishmentId;
    const data = {
      rating: getValue,
      comentary: comentario,
      artistId: localStorage.getItem('@conmusic:id'),
      establishmentId: getEstablishmentId,
    };

    try {
      await api.post('/avaliation', data);
    } catch (error) {
      console.error(error);
    }
    setOpenToast(true);  
    handleClose();
  };

  const [comentario, setComentario] = useState(null);
  const [value, setValue] = React.useState(2);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [showConfirmationButton, setShowConfirmationButton] = useState(false);
  const [openToast, setOpenToast] = React.useState(false);

  const [perfilImage, setPerfilImage] = useState('');

  useEffect(() => {
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

    getPerfilImage(establishmentId);
  }, []);

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
          src={perfilImage}
        />
        <CardContent sx={{ flex: 1, mt: 1 }}>
          <Typography component="h2" variant="h5" fontWeight="bold">
            {event}
          </Typography>
          <Typography variant="subtitle1" >
            {establishment}
          </Typography>
          <Typography variant="subtitle1" paragraph>
            {local}
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
        <CardContent sx={{ display: "flex", flex: 0.5 }}>
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
            {showConfirmationButton && (
              <Button
                variant="outlined"
                color="inherit"
                sx={{
                  mt: 1,
                  mr: 3,
                  alignSelf: "center",
                  borderColor: 'black',
                  backgroundColor: 'green',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'white',
                    color: 'black',
                  },
                  width: "147px",
                  height: "auto"
                }}
                onClick={handleOpen}>
                Avaliar
              </Button>
            )}
          </div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <style>
                {`.custom-rating-icon {font-size: 4rem;}`}
              </style>
              <Box component="fieldset" mb={3} borderColor="transparent">
                <Typography variant="h6" style={{ fontWeight: 'bold' }}>Avaliar Estabelecimento</Typography>
                <Rating
                  name="simple-controlled"
                  value={value}
                  classes={{ icon: 'custom-rating-icon' }}
                  precision={0.5}
                  style={{ display: "flex", marginLeft: "-7px" }}
                  onChange={(getValue, newValue) => {
                    setValue(newValue);
                  }}
                />
                <TextField
                  id="commentSection"
                  label="Comentário"
                  multiline
                  rows={4}
                  style={{ display: "flex", width: "auto", marginTop: 15 }}
                  value={comentario}
                  onChange={(event) => {
                    setComentario(event.target.value);
                  }}
                />

              </Box>

              <div sx={styleButton}
                style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Button variant="contained" color="success" style={{ width: '30%' }}
                  onClick={handleClick}>
                  Avaliar
                </Button>
                <Button variant="contained" color="error" style={{ width: '30%' }} onClick={handleClose}>
                  Sair
                </Button>
              </div>
            </Box>
          </Modal>
          <Snackbar open={openToast} autoHideDuration={6000} onClose={handleCloseToast}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Avaliação enviada!
            </Alert>
          </Snackbar>
        </CardContent>
      </Card>
    </Grid>

  )
}
export default CardEventNegotiation;