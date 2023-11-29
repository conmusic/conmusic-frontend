import CardEvent from "../../../components/CardEvent"
import Title from "../../../components/Title"
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
import { useAuth } from '../../../hooks/auth';
import Autocomplete from '@mui/material/Autocomplete';
import dayjs from 'dayjs';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import Pagina from "../../../components/PaginationForCards";
import { es } from "date-fns/locale";

dayjs.extend(customParseFormat);

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
    gap: 2,
    overflowY: "scroll",
    maxHeight: "100%"
};

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Events(onUpload) {
    const { userId } = useAuth();
    const [cardData, setCardData] = useState([]);

    const [eventData, setEventData] = useState({
        name: '',
        description: '',
        value: 0,
        coverCharge: 0,
        establishmentId: userId,
        genre: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEventData({
            ...eventData,
            [name]: value,
        });
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [openToast, setOpenToast] = React.useState(false);

    const [selectedFile, setSelectedFile] = useState(null);

    const handleCloseToast = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenToast(false);
    };

    useEffect(() => {
        const getEstablishments = async () => {
            try {
                var token = localStorage.getItem('@conmusic:token');
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };
                const response = await api.get(`/events/establishment/${userId}`, config)

                var card = response.data
                    .map(establishment => {
                        return {
                            id: establishment.id,
                            local: establishment.establishment.address,
                            establishment: establishment.establishment.establishmentName,
                            event: establishment.name,
                            genero: establishment.genre.name,
                            establishmentId: establishment.establishment.id,
                        }
                    })
                setCardData(card);
            } catch (error) {
                console.error('Erro ao buscar os dados dos cards:', error);
                console.error('Mensagem de erro do servidor:', error.response.data);
            }
        };
        if (userId !== 0) {
            getEstablishments();
        }
    }, [userId]);

    const handleCreateEvent = async () => {
        try {
            const token = localStorage.getItem('@conmusic:token');
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            console.log("eventData:", eventData)
            const response = await api.post('/events', eventData, config);

            if (response.status === 201) {
                setOpenToast(true);
                handleClose();
            } else {
                console.error('Erro ao criar o evento:', response);
            }

        } catch (error) {
            console.error('Erro ao criar o evento:', error);
            console.error('Mensagem de erro do servidor:', error.response.data);
        }
    };

    const getYourEstablishments = async () => {
        try {
            const token = localStorage.getItem('@conmusic:token');
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            const response = await api.get(`/establishments/manager/${userId}`, config);
            var establishmentData = response.data.map(establishment => {
                return {
                    id: establishment.id,
                    name: establishment.establishmentName,
                }
            });
        } catch (error) {
            console.error('Erro ao buscar os estabelecimentos:', error);
            console.error('Mensagem de erro do servidor:', error.response.data);
        }
    }
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
                        key={item.id}
                        id={item.id}
                        establishment={item.establishment}
                        event={item.event}
                        local={item.local}
                        genero={item.genero}
                        establishmentId={item.establishmentId}
                    />
                ))
            }
            <Pagina ></Pagina>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{ overflowY: "scroll" }}
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
                                name="name"
                                value={eventData.name}
                                onChange={handleInputChange}
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
                        <Grid item xs={12}>
                            <Autocomplete
                                fullWidth
                                id="combo-box-demo"
                                options={topEstilosMusicais}
                                getOptionLabel={(option) => option.label}
                                value={topEstilosMusicais.find(option => option.label === eventData.genre) || null}
                                onChange={(event, newValue) => {
                                    setEventData({ ...eventData, genre: newValue ? newValue.label : '' });
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Gênero Musical" />
                                )}
                            />
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    label="Valor Proposto"
                                    name="value"
                                    value={eventData.value}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Taxa de Couvert"
                                    name="coverCharge"
                                    value={eventData.coverCharge}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sx={{ display: "flex", flexDirection: "row" }}>
                            <TextField
                                label="Descrição do Evento"
                                multiline
                                name="description"
                                rows={4}
                                fullWidth
                                value={eventData.description}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <Button variant="contained"
                                color="success"
                                style={{ width: "auto", height: "auto" }}
                                onClick={handleCreateEvent}
                            >
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
            {selectedFile && (
                <Snackbar open={openToast} autoHideDuration={6000} onClose={handleCloseToast}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Avaliação enviada!
                    </Alert>
                </Snackbar>
            )}
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