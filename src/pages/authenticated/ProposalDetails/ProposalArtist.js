import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
    Button,
    Typography,
    Paper,
    Grid,
    ImageList,
    ImageListItem,
    Box,
    Chip,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Snackbar,
    Alert as MuiAlert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import eventPropsHelper from '../../../helpers/eventPropsHelper';
import api from '../../../services/api';
import { differenceInYears } from 'date-fns';
import dateHelper from '../../../helpers/dateHelper';

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

export default function ProposalArtist() {
    const { proposalId } = useParams()
    const navigate = useNavigate();
    const [perfilImage, setPerfilImage] = useState('');
    const [images, setImages] = useState([]);

    async function getPerfilImage(artistId) {
        try {
            var token = localStorage.getItem('@conmusic:token');
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };

            const response = await api.get(`/artists/image/perfil/${artistId}`, config);

            if (response.data.url) {
                setPerfilImage(response.data.url);
            } else {
                // Caso o artista não tenha imagem de perfil cadastrada, limpar a imagem anterior
                setPerfilImage('');
            }
        } catch (error) {
            console.error('Erro ao buscar imagem:', error);
        }
    }

    async function getImages(artistId) {
        try {
            var token = localStorage.getItem('@conmusic:token');
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };

            const response = await api.get(`/artists/images/${artistId}`, config);

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
        artist: {
            id: null,
            name: null,
            about: null,
            birthDate: null,
            cpf: null,
            email: null,
            instagram: null,
            phoneNumber: null,
            genres: [],
        },
        establishment: {
            name: null,
            phoneNumber: null,
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

    useEffect(() => {
        async function getProposal() {
            try {
                const { data } = await api.get(`/shows/${proposalId}`)

                console.log(data)

                setProposal({
                    artist: {
                        id: data.artist.id,
                        name: data.artist.name,
                        about: data.artist.about,
                        birthDate: data.artist.birthDate,
                        cpf: data.artist.cpf,
                        email: data.artist.email,
                        instagram: data.artist.instagram,
                        phoneNumber: data.artist.phoneNumber,
                        genres: data.artist.musicalGenres
                    },
                    establishment: {
                        name: data.event.establishment.fantasyName,
                        phoneNumber: data.event.establishment.phoneNumber,
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

                await getPerfilImage(data.artist.id)
                await getImages(data.artist.id)
            } catch (error) {
                console.error(error)
            }
        }

        getProposal()
    }, [proposalId])

    const formattedBirthDateAndAge = useMemo(() => {
        if (proposal.artist.birthDate != null) {
            const birthDate = new Date(proposal.artist.birthDate)
            const age = differenceInYears(new Date(), birthDate)

            return `${birthDate.toLocaleDateString('pt-BR')} - ${age} anos`
        }

        return ''
    }, [proposal.artist.birthDate])

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
                        {proposal.artist.name}
                    </Typography>
                    {
                        proposal.artist.instagram &&
                        (<Typography variant='caption' fontWeight='bold'>@{proposal.artist.instagram}</Typography>)
                    }
                    <Typography variant='body1'>
                        {formattedBirthDateAndAge}
                    </Typography>
                    <Typography variant='body1'>
                        {eventPropsHelper.getFormattedPhoneNumber(proposal.artist.phoneNumber)}
                    </Typography>
                    <Divider orientation="horizontal" flexItem />
                    {
                        proposal.artist.genres &&
                        proposal.artist.genres.length > 0 &&
                        (<>
                            <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                                Gêneros Musicais
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, flexWrap: 'wrap' }}>
                                {
                                    proposal.artist.genres
                                        .map((genre, i) => (<Chip sx={{ backgroundColor: i % 2 === 0 ? "#FF3E3A" : "#CC3245", color: '#F2F2F2' }} label={genre} />))
                                }
                            </Box>
                            <Divider orientation="horizontal" flexItem />
                        </>)
                    }
                    <Button
                        variant="contained"
                        color="success"
                        sx={{ marginTop: 1.5 }}
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
                    <Typography variant="h5" fontWeight='bold' style={{ color: '#FB2D57', marginTop: 2 }}>
                        {proposal.event.name}
                    </Typography>
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
                        <Typography variant="h6" mb={1} fontWeight="bold">Sobre o Artista</Typography>
                        <Typography variant="subtitle1">
                            {proposal.artist.about != null ? proposal.artist.about : "Sem descrição do artista"}
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
