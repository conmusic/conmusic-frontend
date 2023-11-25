import React, { useCallback, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import {
    Button,
    Typography,
    Paper,
    Grid,
    Divider,
    Box,
    Chip,
    ImageList,
    ImageListItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Snackbar,
    Alert as MuiAlert
} from '@mui/material';
import PowerIcon from '@mui/icons-material/Power';
import { useNavigate, useParams } from 'react-router';
import api from '../../../services/api';
import dateHelper from '../../../helpers/dateHelper';
import eventPropsHelper from '../../../helpers/eventPropsHelper';

const CarouselContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: "50px",
    marginTop: 30
});

const SmallImage = styled('img')({
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    objectFit: 'cover'
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

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ProposalEvent() {
    const { proposalId } = useParams();
    const navigate = useNavigate();

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

    const [proposal, setProposal] = useState({
        establishment: {
            name: null,
            phoneNumber: null,
            outlets110: null,
            outlets220: null,
            capacity: null,
        },
        address: {
            address: null,
            city: null,
            state: null,
            zipCode: null,
        },
        startDateTime: null,
        endDateTime: null,
        paymentValue: null,
        couvertCharge: null,
        event: {
            name: null,
            description: null,
            genre: null,
        }
    })

    const [rejectDialogOpen, setRejectDialogOpen] = useState(false)
    const [toast, setToast] = useState({
        open: false,
        message: "",
        severity: "info"
    })

    const handleRejectProposal = useCallback(async () => {
        setRejectDialogOpen(false)

        try {
            const response = await api.delete(`/shows/proposals/${proposalId}`)

            if (response.status === 204) {
                setToast({
                    open: true,
                    message: "Proposta rejeitada com sucesso",
                    severity: "success"
                })

                setTimeout(() => {
                    navigate('/proposals')
                }, 6000)
            } else {
                setToast({
                    open: true,
                    message: "Erro ao rejeitar proposta",
                    severity: "error"
                })
            }
        }
        catch (error) {
            console.log(error)
        }
    }, [proposalId, navigate])

    const handleStartNegotiation = useCallback(async () => {
        try {
            const { data } = await api.patch(`/shows/proposals/${proposalId}`)

            if (data.status === "NEGOTIATION") {
                setToast({
                    open: true,
                    message: "Iniciando negociação!",
                    severity: "success"
                })

                setTimeout(() => {
                    navigate(`/negotiations/${proposalId}`)
                }, 6000)
            } else {
                setToast({
                    open: true,
                    message: "Erro ao aceitar proposta",
                    severity: "error"
                })
            }
        }
        catch (error) {
            console.log(error)
        }
    }, [proposalId, navigate])

    useEffect(() => {
        async function getProposal() {
            try {
                const { data } = await api.get(`/shows/${proposalId}`)

                console.log(data)

                setProposal({
                    establishment: {
                        name: data.event.establishment.fantasyName,
                        phoneNumber: data.event.establishment.phoneNumber,
                        outlets110: data.event.establishment.amount110Outlets,
                        outlets220: data.event.establishment.amount220Outlets,
                        capacity: data.event.establishment.capacity
                    },
                    address: {
                        address: data.event.establishment.address,
                        city: data.event.establishment.city,
                        state: data.event.establishment.state,
                        zipCode: data.event.establishment.zipCode,
                    },
                    startDateTime: data.schedule.startDateTime,
                    endDateTime: data.schedule.endDateTime,
                    paymentValue: data.value,
                    couvertCharge: data.coverCharge,
                    event: {
                        name: data.event.name,
                        description: data.event.description,
                        genre: data.event.genre.name
                    }
                })

                await getPerfilImage(data.event.establishment.id)
                await getImages(data.event.establishment.id)
            } catch (error) {
                console.error(error)
            }
        }

        getProposal()
    }, [proposalId])

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

    return (
        <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
            <Grid item xs={12} md={4}>
                <Paper sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: 4, gap: 1, my: 2 }}>
                    <SmallImage src={perfilImage} alt="Profile" />
                    <Typography variant="h5" fontWeight='bold' style={{ color: '#FB2D57', marginTop: 2 }}>
                        {proposal.event.name}
                    </Typography>
                    <Box>
                        <Chip sx={{ backgroundColor: '#FB2D57', color: '#F2F2F2' }} label={proposal.event.genre} />
                    </Box>
                    <Divider orientation="horizontal" flexItem />
                    <Box>
                        <Typography variant="h6" mb={1} fontWeight="bold">Data e Horário:</Typography>
                        <Box variant="body1" display='flex' flexDirection="row">
                            <Typography fontWeight="bold" mr={0.5}>Início:</Typography>
                            <Typography textTransform='capitalize'>{dateHelper.getFormattedScheduleDate(proposal.startDateTime)}</Typography>
                        </Box>
                        <Box variant="body1" display='flex' flexDirection="row">
                            <Typography fontWeight="bold" mr={0.5}>Término:</Typography>
                            <Typography textTransform='capitalize'>{dateHelper.getFormattedScheduleDate(proposal.endDateTime)}</Typography>
                        </Box>
                    </Box>
                    <Divider orientation="horizontal" flexItem />
                    <Box>
                        <Typography variant="h6" mb={1} fontWeight="bold">Pagamento</Typography>
                        <Box variant="body1" display='flex' flexDirection="row">
                            <Typography fontWeight="bold" mr={0.5}>Valor fixo:</Typography>
                            <Typography>{eventPropsHelper.getFormattedPaymentValue(proposal.paymentValue)}</Typography>
                        </Box>
                        <Box variant="body1" display='flex' flexDirection="row">
                            <Typography fontWeight="bold" mr={0.5}>Taxa de Couvert:</Typography>
                            <Typography>{eventPropsHelper.getFormattedCouvertCharge(proposal.couvertCharge)}</Typography>
                        </Box>
                    </Box>
                    <Divider orientation="horizontal" flexItem />
                    <Button
                        variant="contained"
                        color="success"
                        sx={{ marginTop: 1.5 }}
                        onClick={handleStartNegotiation}
                    >
                        Iniciar Negociação
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        sx={{ marginBottom: 1.5 }}
                        onClick={() => setRejectDialogOpen(true)}
                    >
                        Recusar Proposta
                    </Button>
                    <Divider orientation="horizontal" flexItem />
                    <Typography fontWeight="bold" mr={0.5}>
                        {proposal.establishment.name}
                    </Typography>
                    <Typography>
                        {eventPropsHelper.getFormattedPhoneNumber(proposal.establishment.phoneNumber)}
                    </Typography>
                    <Typography variant='body1'>
                        {eventPropsHelper.getFormattedAddress(proposal.address)}
                    </Typography>
                    <Typography variant='body1'>
                        {eventPropsHelper.getFormattedZipCode(proposal.address.zipCode)}
                    </Typography>
                    <Divider orientation="horizontal" flexItem />
                    <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                        Infraestrutura
                    </Typography>
                    <Box variant="body1" display='flex' flexDirection="row">
                        <Typography fontWeight="bold" mr={0.5}>Capacidade:</Typography>
                        <Typography textTransform='capitalize'>{proposal.establishment.capacity} pessoas</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Chip
                            icon={<PowerIcon color='#F2F2F2' />}
                            label={`110V: ${proposal.establishment.outlets110}`}
                            sx={{ backgroundColor: '#FB2D57', color: '#F2F2F2' }}
                        />
                        <Chip
                            icon={<PowerIcon color='#F2F2F2' />}
                            label={`220V: ${proposal.establishment.outlets220}`}
                            sx={{ backgroundColor: '#FB2D57', color: '#F2F2F2' }}
                        />
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
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
                            {proposal.event.description}
                        </Typography>
                    </Paper>
                </SubtitleContainer>
            </Grid>

            <Dialog
                open={rejectDialogOpen}
                aria-labelledby="reject-dialog-title"
                aria-describedby="reject-dialog-description"
            >
                <DialogTitle id="reject-dialog-title">
                    Rejeitar proposta
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="reject-dialog-description">
                        Tem certeza que deseja rejeitar essa proposta? Uma vez rejeitada, a proposta não pode ser recuperada
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setRejectDialogOpen(false)} autoFocus>
                        Cancelar
                    </Button>
                    <Button color="error" onClick={handleRejectProposal}>Rejeitar</Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={toast.open} autoHideDuration={6000} onClose={handleCloseToast}>
                <Alert severity={toast.severity} sx={{ width: '100%' }}>
                    {toast.message}
                </Alert>
            </Snackbar>
        </Grid>
    );
}
