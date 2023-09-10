import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
} from '@mui/material';
import myImage from '../assets/images/image.png';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

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

function CardNegotiation() {
  const [value, setValue] = React.useState(2);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [showConfirmationButton, setShowConfirmationButton] = useState(false);

  var status = 'CONCLUDED'

  useEffect(() => {
    if (status === 'CONCLUDED') {
      setShowConfirmationButton(true);
    }
  }, [status]);
  
  return (
    <Grid item xs={12} md={7} sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
      <Card sx={{ display: 'flex', width: 1300 }}>
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
          src={myImage}
        />
        <CardContent sx={{ flex: 1, mt: 1 }}>
          <Typography component="h2" variant="h5">
            <p>Casa de show A</p>
          </Typography>
          <Typography variant="subtitle1" >
            <p>Noite do Jazz</p>
          </Typography>
          <Typography variant="subtitle1" paragraph>
            <p>São Paulo - SP</p>
          </Typography>
        </CardContent>
        <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Typography>
            <p>01/05/2023</p>
          </Typography>
          <Typography variant="subtitle1" >
            <p>01/05/2023</p>
          </Typography>
        </CardContent>
        <CardContent sx={{ display: "flex" }}>
          <div style={{ display: "flex", flexDirection: 'column', justifyContent: showConfirmationButton ? 'space-between' : 'center' }}>
            <Button
              variant="outlined"
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
              }}>
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
                  style={{ display: "flex", marginLeft: "-7px" }}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
              </Box>
              <div sx={styleButton}
                style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Button variant="contained" color="success" style={{ width: '30%' }}>
                  Avaliar
                </Button>
                <Button variant="contained" color="error" style={{ width: '30%' }}>
                  Sair
                </Button>
              </div>
            </Box>
          </Modal>
        </CardContent>
      </Card>
    </Grid>

  )
}
export default CardNegotiation;