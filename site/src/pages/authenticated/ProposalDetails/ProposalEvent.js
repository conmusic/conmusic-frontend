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
});

const SubtitleContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '600px',
    marginLeft: "100px",
    justifyContent: "center"
})

function srcset(image, size, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${size * rows
            }&fit=crop&auto=format&dpr=2 2x`,
    };
}

const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
        rows: 2,
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats',
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        title: 'Honey',
        author: '@arwinneil',
        rows: 2,
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        title: 'Basketball',
    },
    {
        img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
        title: 'Fern',
    },
];

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ProposalEvent() {
    const { proposalId } = useParams();
    const navigate = useNavigate();

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
            } catch (error) {
                console.error(error)
            }
        }

        getProposal()
    }, [proposalId])

    const image = [
        'https://s2-g1.glbimg.com/u_Sep5KE8nfnGb8wWtWB-vbBeD0=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2022/N/Q/S27GlHSKA6DAAjshAgSA/bar-paradiso.png',
    ]

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
                    <SmallImage src={image[0]} alt="Profile" />
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
                            {itemData.map((item) => (
                                <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                                    <img
                                        {...srcset(item.img, 121, item.rows, item.cols)}
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
