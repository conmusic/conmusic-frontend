import React, { useState, useEffect, useCallback } from 'react';
import api from "../../../services/api";
import {
    Container,
    Grid,
    Button,
    Typography,
    Modal,
    Box,
    TextField,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    Snackbar,
    Alert,
} from '@mui/material';
import { useAuth } from '../../../hooks/auth';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import CardEvent from "../../../components/CardEvent"
import Title from "../../../components/Title"
import eventPropsHelper from '../../../helpers/eventPropsHelper';

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

export default function Events() {
    const { userId } = useAuth();
    const [cardData, setCardData] = useState([]);
    const [genres, setGenres] = useState([]);
    const [establishments, setEstablishments] = useState([])

    const [eventData, setEventData] = useState({
        name: '',
        description: '',
        value: null,
        coverCharge: null,
        establishmentId: undefined,
        genre: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEventData({
            ...eventData,
            [name]: value,
        });
    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [toast, setToast] = useState({
        open: false,
        message: "",
        severity: "info"
    })

    useEffect(() => {
        const getEvents = async () => {
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

        const getEstablishments = async () => {
            try {
                const { data } = await api.get(`/establishments/manager/${userId}`)

                setEstablishments(data.map(e => ({ text: e.establishmentName, value: e.id })))
            }
            catch (e) {
                console.error(e)
            }
        }

        const getGenres = async () => {
            try {
                const { data } = await api.get('/genres')

                setGenres(data)
            }
            catch (e) {
                console.error(e)
            }
        }

        getEvents();
        getGenres();
        getEstablishments();
    }, [userId]);

    const handlePaymentValueChange = useCallback((event) => {
        const value = Number(event.target.value.replace(/\D/gm, ""))

        const formatted = eventPropsHelper.getFormattedPaymentValue(value / 100);

        setEventData(prev => ({
            ...prev,
            paymentValue: formatted
        }))
    }, [])

    const handleCouvertChargeChange = useCallback((event) => {
        const value = Number(event.target.value.replace(/\D/gm, ""))

        const formatted = String((value / 100).toFixed(2)).replace(".", ",")

        setEventData(prev => ({
            ...prev,
            couvertCharge: formatted
        }))
    }, [])

    const handleCloseToast = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setToast({
            open: false,
            message: "",
            severity: "info"
        });
      };
    

    const handleCreateEvent = useCallback(async () => {
        try {
            const token = localStorage.getItem('@conmusic:token');
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
    
            const paymentValue = eventData.paymentValue ? Number(eventData.paymentValue.replace(/\D/gm, "")) / 100 : 0;
            const coverCharge = eventData.coverCharge ? Number(eventData.coverCharge.replace(/\D/gm, "")) / 100 : 0;
    
            const body = {
                name: eventData.name,
                description: eventData.description,
                value: paymentValue.toFixed(2),
                coverCharge: coverCharge.toFixed(2),
                establishmentId: Number.isNaN(Number(eventData.establishmentId)) ? 0 : Number(eventData.establishmentId),
                genre: eventData.genre
            }

            if (body.name === '') {
                setToast({
                    open: true,
                    severity: "error",
                    message: "Nome do evento é inválido"
                })
                return;
            }

            if (body.description === '') {
                setToast({
                    open: true,
                    severity: "error",
                    message: "Descrição do evento é inválido"
                })
                return;
            }

            if (body.genre === '') {
                setToast({
                    open: true,
                    severity: "error",
                    message: "Gênero é inválido"
                })
                return;
            }

            if (body.establishmentId === 0) {
                setToast({
                    open: true,
                    severity: "error",
                    message: "Estabelecimento é inválido"
                })
                return;
            }

            if (body.paymentValue < 200) {
                setToast({
                    open: true,
                    severity: "error",
                    message: "Valor de pagamento deve ser no minímo R$ 200,00"
                })
                return;
            }

            if (body.coverCharge < 0 && body.coverCharge > 100) {
                setToast({
                    open: true,
                    severity: "error",
                    message: "Taxa de Couvert deve ser um percentual (entre 0 e 100)"
                })
                return;
            }
            console.log("eventData:", body)
            const response = await api.post('/events', body, config);

            if (response.status === 201) {
                setToast({
                    open: true,
                    message: "Evento foi cadastrado com sucesso!",
                    severity: "success"
                })
            
                const newCard = {
                    id: response.data.id,
                    local: response.data.establishment.address,
                    establishment: response.data.establishment.establishmentName,
                    event: response.data.name,
                    genero: response.data.genre.name,
                    establishmentId: response.data.establishment.id,
                }
            
                setCardData(prev => [...prev, newCard])
            
                handleClose();
            } else {
                console.error('Erro ao criar o evento:', response);
            }

        } catch (error) {
            console.error('Erro ao criar o evento:', error);
            console.error('Mensagem de erro do servidor:', error.response.data);
        }
    }, [eventData]);

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
                            <FormControl fullWidth>
                                <TextField
                                    id='nameId'
                                    name="name"
                                    label='Nome do evento'
                                    value={eventData.name}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} >
                            <FormControl fullWidth>
                                <InputLabel id='establishment-id-select-label'>Estabelecimento</InputLabel>
                                <Select
                                    id="establishment-id-select-id"
                                    labelId='establishment-id-select-label'
                                    name="establishmentId"
                                    label="Estabelecimento"
                                    value={eventData.establishmentId}
                                    onChange={handleInputChange}
                                    error={eventData.establishmentId === 0}
                                    required
                                >
                                    <MenuItem value={0}>Selecionar estabelecimento</MenuItem>
                                    {
                                        establishments.map(e => (<MenuItem key={e.value} value={e.value}>{e.text}</MenuItem>))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id='genreIdLabel'>Gênero Musical</InputLabel>
                                <Select
                                    id="genreId"
                                    labelId='genreIdLabel'
                                    name="genre"
                                    label="Gênero musical"
                                    value={eventData.genre}
                                    onChange={handleInputChange}
                                    error={eventData.genre === "none"}
                                    required
                                >
                                    <MenuItem value="none">Selecionar Gênero musical</MenuItem>
                                    {
                                        genres.map((g, i) => (<MenuItem key={i} value={g.name}>{g.name}</MenuItem>))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    label="Valor Proposto"
                                    name="value"
                                    value={eventData.value}
                                    onChange={handlePaymentValueChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Taxa de Couvert (%)"
                                    name="coverCharge"
                                    value={eventData.coverCharge}
                                    onChange={handleCouvertChargeChange}
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
            <Snackbar open={toast.open} autoHideDuration={6000} onClose={handleCloseToast}>
                <Alert severity={toast.severity} sx={{ width: '100%' }}>
                    {toast.message}
                </Alert>
            </Snackbar>
        </Container>
    )
}