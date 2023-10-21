import React, {useState} from 'react';
import myImage from '../assets/images/image.png';
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
import Autocomplete from '@mui/material/Autocomplete';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import StatusChip from './StatusChip';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

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

function CardEvent({ establishment, event, local, showStart, showEnd, id, status, onUpload }) {
  const [openToast, setOpenToast] = React.useState(false);
  const handleClick = () => {
    setOpenToast(true);
    handleClose()
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const handleCloseToast = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenToast(false);
  };
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
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          src={myImage}
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
          <div style={{ display: "flex", flexDirection: 'column' }}>
            <Button
              variant="outlined"
              color="inherit"
              onClick={handleOpen}
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
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Nome do Evento"
                    id="filled-size-normal"
                    name="establishmentName"
                    fullWidth
                  />

                </Grid>
                <Grid item xs={12} >
                  <Autocomplete
                    fullWidth
                    id="combo-box-demo"
                    options={estabelecimentosExemplo}
                    renderInput={(params) => <TextField {...params} label="Nome do Estabelecimento" />}
                  />
                </Grid>

                <Grid item xs={12} >
                  <Autocomplete
                    fullWidth
                    id="combo-box-demo"
                    options={topEstilosMusicais}
                    renderInput={(params) => <TextField {...params} label="Gênero Musical" />}
                  />
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['TimePicker', 'DateTimePicker']}>
                          <DemoItem label="Data de fim">
                            <DateTimePicker defaultValue={fiveAM} minTime={nineAM} />
                          </DemoItem>
                        </DemoContainer>
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['TimePicker', 'DateTimePicker']}>
                          <DemoItem label="Data de fim">
                            <DateTimePicker defaultValue={fiveAM} minTime={nineAM} />
                          </DemoItem>
                        </DemoContainer>
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
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
                      <InputLabel htmlFor="outlined-adornment-amount">Taxa de Couvert Artístico</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-amount"
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
                  <div style={{ width: '50%' }}>
                    <TextField
                      id="outlined-multiline-static"
                      label="Descrição do Evento"
                      multiline
                      rows={4}
                      fullWidth
                    />
                  </div>
                  <div style={{ width: '50%', marginLeft: 25 }}>
                    <input
                      type="file"
                      accept="image/*"
                      id="upload-button"
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                    />
                    <label htmlFor="upload-button">
                      <Button
                        variant="outlined"
                        color="primary"
                        component="span"
                        startIcon={<CloudUploadIcon />}
                        fullWidth
                        style={{ padding: '13px', fontSize: '1.0rem' }}
                      >
                        Upload de Imagem
                      </Button>
                    </label>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="medium"
                        disabled={!selectedFile}
                        onClick={handleUpload}
                        fullWidth
                        sx={{
                          marginTop: 'auto',
                          borderColor: 'black',
                          backgroundColor: 'red',
                          color: 'white',
                          marginTop: 2,
                          height: 53,
                        }}
                      >
                        Enviar Imagem
                      </Button>
                    </div>
                  </div>
                </Grid>
                <Grid sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                  <Button variant="contained" color="success" style={{ width: "auto", height: "auto" }}>
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