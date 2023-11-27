import React, { useState } from 'react';
import { useNavigate } from "react-router";
import { useCallback } from 'react';
import {
  Grid,
  Button,
  Typography,
  Modal,
  Box,
  TextField,
  CardMedia,
  CardContent,
  Card,
} from '@mui/material';
import dayjs from 'dayjs';


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
  paddingX: 4,
  paddingY: 2,
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: 'auto',
  alignItems: 'center',
  gap: 2
};

const fiveAM = dayjs().set('hour', 5).startOf('hour');
const nineAM = dayjs().set('hour', 9).startOf('hour');

function CardEvent({ establishment, event, local, showStart, showEnd, id, establishmentId, genero, onUpload }) {
  // const [openToast, setOpenToast] = React.useState(false);

  const [selectedFile, setSelectedFile] = useState(null);

  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    const getImage = async () => {
      try {
        var token = localStorage.getItem('@conmusic:token');
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };

        const response = await api.get(`/establishments/image/perfil/${establishmentId}`, config);

        console.log(response.data.url);

        setImageURL(response.data.url);
      } catch (error) {
        console.error('Erro ao buscar imagem:', error);
      }
    }

    getImage();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile);
      setSelectedFile(null);
    }
  };

  const [open, setOpen] = React.useState(false);
  
  const navigate = useNavigate();
  const handleNavigation = useCallback(() => {
    navigate(`/events/${id}`)
  }, [navigate, id])

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Grid item xs={12} md={7} sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
      <Card sx={{ display: 'flex', width: 1300, alignItems: 'center', justifyContent: 'space-between' }}>
        {/* <CardMedia
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
        /> */}
        <CardContent sx={{ flex: 1, mt: 1, paddingLeft: 7 }}>
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
        Gêneros:<b>{genero}</b>
        </CardContent>
        <CardContent sx={{ display: "flex" }}>
          <div style={{ display: "flex", flexDirection: 'column' }}>
            <Button
              variant="outlined"
              color="inherit"
              onClick={handleNavigation}
              sx={{
                mt: 1,
                mr: 3,
                alignSelf: "center",
                borderColor: 'black',
                backgroundColor: '#006ab5',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'white',
                  color: 'black',
                },
              }}
            >
              Atualizar
            </Button>
          </div>

        </CardContent>
      </Card>
    </Grid>

  )
}
export default CardEvent;

const estabelecimentosExemplo = [
  { label: 'Bar do Chico' },
  { label: 'Bar do Chico 2' },
]

const topEstilosMusicais = [
  { label: 'Rock' },
  { label: 'Pop' },
  { label: 'Hip Hop' },
  { label: 'Jazz' },
  { label: 'Blues' },
  { label: 'Country' },
  { label: 'Eletrônica' },
  { label: 'Clássica' },
  { label: 'R&B' },
  { label: 'Reggae' },
  { label: 'Funk' },
  { label: 'Soul' },
  { label: 'Metal' },
  { label: 'Punk' },
  { label: 'Folk' },
  { label: 'Indie' },
  { label: 'Alternativo' },
  { label: 'Rap' },
  { label: 'EDM (Electronic Dance Music)' },
  { label: 'Latina' },
  { label: 'Sertanejo' },
  { label: 'Samba' },
  { label: 'Forró' },
  { label: 'Gospel' },
  { label: 'MPB (Música Popular Brasileira)' },
  { label: 'Axé' },
  { label: 'Bossa Nova' },
  { label: 'Pagode' },
  { label: 'Gótico' },
  { label: 'Raggamuffin' },
  { label: 'K-Pop' },
  { label: 'Disco' },
  { label: 'Ranchera' },
  { label: 'Fado' },
  { label: 'Flamenco' },
  { label: 'J-Pop' },
  { label: 'Hard Rock' },
  { label: 'Death Metal' },
  { label: 'Ska' },
  { label: 'Celtic' },
  { label: 'Piano Bar' },
  { label: 'Musical' },
  { label: 'New Wave' },
  { label: 'Grunge' },
  { label: 'Rapcore' },
  { label: 'Trap' },
  { label: 'Rap Metal' },
  { label: 'Indie Pop' },
  { label: 'Hardcore Punk' },
  { label: 'Soul Jazz' },
  { label: 'Country Rock' },
  { label: 'Smooth Jazz' },
  { label: 'Rockabilly' },
  { label: 'R&B Contemporâneo' },
  { label: 'Soul Clássico' },
  { label: 'Hip Hop Alternativo' },
  { label: 'Reggaeton' },
  { label: 'Trance' },
  { label: 'Dubstep' },
  { label: 'Salsa' },
  { label: 'Merengue' },
  { label: 'Punk Rock' },
  { label: 'Pop Punk' },
  { label: 'Hardstyle' },
  { label: 'Bluegrass' },
  { label: 'Jazz Fusion' },
  { label: 'Cumbia' },
  { label: 'Chiptune' },
  { label: 'House' },
  { label: 'Techno' },
  { label: 'Gospel Contemporâneo' },
  { label: 'R&B Alternativo' },
  { label: 'Metalcore' },
  { label: 'Rap Latino' },
  { label: 'Pop Rock Brasileiro' },
  { label: 'Reggae Brasileiro' },
  { label: 'Funk Carioca' },
  { label: 'Frevo' },
  { label: 'Brega' },
  { label: 'Pop Latino' },
  { label: 'Rock Progressivo' },
  { label: 'Heavy Metal' },
  { label: 'Indie Rock' },
  { label: 'Rap Nacional' },
  { label: 'Música Clássica Indiana' },
  { label: 'Sertanejo Universitário' },
  { label: 'Samba-Reggae' },
  { label: 'Música Eletrônica Brasileira' },
  { label: 'Maracatu' },
  { label: 'Samba Enredo' },
  { label: 'Baião' },
  { label: 'Manguebeat' },
  { label: 'Metal Alternativo' },
  { label: 'Pós-Punk' },
  { label: 'Gospel Brasileiro' },
  { label: 'Música Tradicional Chinesa' },
  { label: 'Música Tradicional Japonesa' },
  { label: 'Música Tradicional Africana' },
  { label: 'Música Tradicional Irlandesa' },
  { label: 'Música Tradicional Escocesa' },
  { label: 'Música Tradicional Árabe' },
];