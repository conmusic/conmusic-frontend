import CardEvent from "../../../components/CardEvent"
import Title from "../../../components/Title"
import { format } from 'date-fns';
import React, { useState, useEffect } from 'react';
import api from "../../../services/api";
import {
    Container,
    Grid,
    Button,
    Typography,
    Modal,
    Box,
    TextField,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormHelperText from '@mui/material/FormHelperText';

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

export default function Events() {
    const [cardData, setCardData] = useState([]);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const fetchCardData = async () => {
            try {
                var token = localStorage.getItem('@conmusic:token');
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };
                const response = await api.get('/shows/negotiations', config);
                console.log(response);
                var card = response.data
                    .map(obj => {
                        let showDate = format(new Date(obj.schedule.startDateTime), "dd/MM/yyyy");
                        let showStartDateTime = format(new Date(obj.schedule.startDateTime), "HH:mm");
                        let showEndDateTime = format(new Date(obj.schedule.endDateTime), "HH:mm");

                        return {
                            establishment: obj.event.establishment.establishmentName,
                            event: obj.event.name,
                            local: obj.event.establishment.address,
                            showStart: `${showDate} - ${showStartDateTime}`,
                            showEnd: `${showDate} - ${showEndDateTime}`,
                            id: obj.id,
                            status: obj.status
                        }
                    })
                setCardData(card);
            } catch (error) {
                console.error('Erro ao buscar os dados dos cards:', error);
            }
        };

        fetchCardData();
    }, []);

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                <Title>Seus Eventos</Title>
                <Button
                    variant="outlined"
                    color="inherit"
                    onClick={handleOpen}
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
                    }}
                >
                    Criar Evento
                </Button>
            </Grid>
            {
                cardData.map(item => (
                    <CardEvent
                        id={item.id}
                        establishment={item.establishment}
                        event={item.event}
                        local={item.local}
                        showStart={item.showStart}
                        showEnd={item.showEnd}
                        status={item.status}
                    />
                ))
            }

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} spacing={2}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Crie e anuncie seu Evento
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
                                        <DatePicker sx={{ width: '100%' }} helperText="Some important text" />
                                    </LocalizationProvider>
                                    <FormHelperText sx={{ marginTop: 0, alignSelf: 'flex-start' }}>
                                        Data do inicio do evento
                                    </FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker sx={{ width: '100%' }} />
                                    </LocalizationProvider>
                                    <FormHelperText sx={{ marginTop: 0, alignSelf: 'flex-start' }}>
                                        Data do fim do evento
                                    </FormHelperText>
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
                        <Grid item xs={12} >
                            <TextField
                                id="outlined-multiline-static"
                                label="Descrição do Evento"
                                fullWidth
                                multiline
                                rows={4}
                            />
                        </Grid>
                        <Grid sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <Button variant="contained" color="success" style={{ width: "auto", height: "auto" }}>
                                Criar Evento
                            </Button>
                            <Button variant="contained" color="error" style={{ width: "auto", height: "auto" }}
                                onClick={handleClose}>
                                Cancelar
                            </Button>
                        </Grid>
                    </Box>
                </Box>
            </Modal>
        </Container>
    )
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