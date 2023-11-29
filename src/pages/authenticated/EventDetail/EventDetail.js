import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
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
  Modal,
  Divider,
  TextField,
  Snackbar,
  Alert
} from '@mui/material';
import PowerIcon from '@mui/icons-material/Power';

import api from '../../../services/api';
import eventPropsHelper from '../../../helpers/eventPropsHelper';
import Autocomplete from '@mui/material/Autocomplete';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ScheduleTable from '../../../components/ScheduleTable';
import ButtonHour from '../../../components/ButtonHour';
import { de, tr } from 'date-fns/locale';
import { set } from 'date-fns';

const CarouselContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  marginBottom: "50px",
  marginTop: 30
});

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

export default function EventDetail(onUpload) {
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


  const [open, setOpen] = React.useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const { eventId } = useParams();

  const [selectedImage, setSelectedImage] = useState(0);
  const [genres, setGenres] = useState({
    name: '',
  });
  const [event, setEvent] = useState({
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


  const fiveAM = dayjs().set('hour', 5).startOf('hour');
  const nineAM = dayjs().set('hour', 9).startOf('hour');

  const [selectedFile, setSelectedFile] = useState(null);

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


  useEffect(() => {
    const getEventData = async () => {
      try {
        const { data } = await api.get(`/events/${eventId}`)

        setEvent({
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
  }, [eventId])

  const [openToast, setOpenToast] = React.useState(false);
  const handleCloseToast = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenToast(false);
  };



  const handleClick = async () => {
    const nomeDoEventoInput = document.getElementById('outlined-multiline-static');
    const generoMusicalInput = document.getElementById('genre');
    const valorPropostoInput = document.getElementById('outlined-adornment-amount');
    const taxaCouvertArtisticoInput = document.getElementById('couver');
    const descricaoDoEventoInput = document.getElementById('descricao');
    const data = {
      name: nomeDoEventoInput.value,
      description: descricaoDoEventoInput.value,
      value: parseFloat(valorPropostoInput.value.replace(/\D/g, '.')),
      coverCharge: parseFloat(taxaCouvertArtisticoInput.value.replace(/\D/g, '.')),
      genre: generoMusicalInput.value,
    };

    try {
      await api.put(`/events/${eventId}`, data);
    } catch (error) {
      console.error(error);
      console.log(data);
    }
    setOpenToast(true);
  };

  const handleClickDeletion = async () => {
    try {
      await api.delete(`/events/inactivate/${eventId}`);
    } catch (error) {
      console.error(error);
    }
    setOpenToast(true);
  };

  const data = [
    {
      horarioInicio: "10:00",
      horarioFim: "12:00",
      confirmado: true,
    },
    {
      horarioInicio: "13:00",
      horarioFim: "15:00",
      confirmado: false,
    },
    {
      horarioInicio: "16:00",
      horarioFim: "18:00",
      confirmado: true,
    },
  ];

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
      <Grid item xs={12} md={6} mt={2}>
        <Grid display={'flex'} justifyContent={'flex-end'}>
          <Button
            variant="outlined"
            color="inherit"
            onClick={handleOpen}
            sx={{
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
          <Button
            variant="outlined"
            color="inherit"
            onClick={handleClickDeletion}
          >
            Desativar
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} spacing={2}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Atualizar seu Evento
              </Typography>
              <Box
                component="form"
                sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                noValidate
                autoComplete="off"
              >
                <Grid>
                  <div style={{ width: '100%' }}>
                    <TextField
                      id="outlined-multiline-static"
                      label="Nome do Evento"
                      fullWidth
                    />
                  </div>
                </Grid>
                <Grid item xs={12} >
                  <Autocomplete
                    fullWidth
                    id="genre"
                    options={topEstilosMusicais}
                    renderInput={(params) => <TextField {...params} label="Gênero Musical" />}
                  />
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="outlined-adornment-amount">Valor Proposto</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-amount"
                        startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                        label="Valor Proposto"
                        onChange={(event) => {
                          let { value } = event.target;
                          value = value.replace(/\D/g, '');
                          if (value) {
                            value = parseFloat(value) / 100;
                            event.target.value = value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                          } else {
                            event.target.value = value;
                          }
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="couver">Taxa de Couvert Artístico</InputLabel>
                      <OutlinedInput
                        id="couver"
                        startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                        label="Taxa de Couvert Artístico"
                        onChange={(event) => {
                          let { value } = event.target;
                          value = value.replace(/\D/g, '');
                          if (value) {
                            value = parseFloat(value) / 100;
                            event.target.value = value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                          } else {
                            event.target.value = value;
                          }
                        }}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid item xs={12} sx={{ display: "flex", flexDirection: "row" }}>
                  <div style={{ width: '100%' }}>
                    <TextField
                      id="descricao"
                      label="Descrição do Evento"
                      multiline
                      rows={4}
                      fullWidth
                    />
                  </div>
                </Grid>
                <Grid sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                  <Button variant="contained" color="success" style={{ width: "auto", height: "auto" }} onClick={handleClick}>
                    Atualizar Evento
                  </Button>
                  <Button variant="contained" color="error" style={{ width: "auto", height: "auto" }}
                    onClick={handleClose}>
                    Cancelar
                  </Button>
                </Grid>
              </Box>
            </Box>
          </Modal>
        </Grid>
        <Snackbar open={openToast} autoHideDuration={6000} onClose={handleCloseToast}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Avaliação enviada!
          </Alert>
        </Snackbar>
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
          <Grid display={'flex'} justifyContent={'flex-end'} padding={'20px'} flexDirection={'row'} alignContent={"flex-end"}>
            <ButtonHour eventId={eventId} />
          </Grid>
          <Paper style={{ width: '100%', padding: '20px' }}>
            <ScheduleTable eventId={eventId} />
          </Paper>
        </SubtitleContainer>
      </Grid>


    </Grid>
  );
}
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
