import React, { useCallback, useState } from "react";
import { 
    Avatar, 
    Box, 
    Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle, 
    Divider, 
    Modal, 
    Skeleton, 
    Stack, 
    TextField, 
    Typography 
} from "@mui/material";

import eventPropsHelper from "../../../helpers/eventPropsHelper";
import dateHelper from "../../../helpers/dateHelper";
import api from "../../../services/api";
import StatusChip from "../../../components/StatusChip";
import { useNavigate } from "react-router";

const modalBoxStyle = {
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

export default function Details({ 
    eventName, 
    status, 
    eventDescription,
    establishmentName, 
    address, 
    startDateTime, 
    endDateTime, 
    artistName,
    artistInstagram,
    artistAvatarUrl,
    paymentValue,
    couvertCharge,
    artistDescription,
    showId,
    setShow,
    openToast
}) {
    const navigate = useNavigate()

    const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false)
    const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
    const [updateModalOpen, setUpdateModalOpen] = useState(false)
    const [updateNegotiationBody, setUpdateNegotiationBody] = useState({
        paymentValue: {
            value: eventPropsHelper.getFormattedPaymentValue(paymentValue || 0),
            error: false
        },
        couvertCharge: {
            value: String((couvertCharge || 0.00).toFixed(2)).replace(".", ","),
            error: false,
        }
    })

    const handlePaymentValueChange = useCallback((event) => {
        console.log(event)
        const value = Number(event.target.value.replace(/\D/gm, ""))

        const formatted = eventPropsHelper.getFormattedPaymentValue(value / 100);

        setUpdateNegotiationBody(prev => ({
            ...prev,
            paymentValue: {
                value: formatted,
                error: value < 20000
            }
        }))
    }, [])

    const handleCouvertChargeChange = useCallback((event) => {
        const value = Number(event.target.value.replace(/\D/gm, ""))

        const formatted = String((value / 100).toFixed(2)).replace(".", ",")

        setUpdateNegotiationBody(prev => ({
            ...prev,
            couvertCharge: {
                value: formatted,
                error: value < 0 || value > 10000
            }
        }))
    }, [])

    const handleWithdrawNegotiation = useCallback(async () => {
        setWithdrawDialogOpen(false)

        try {
            const response = await api.delete(`/shows/negotiations/${showId}`)

            if (response.status === 204) {
                openToast({
                    open: true,
                    message: "Negociação abandonada com sucesso",
                    severity: "success"
                })

                setTimeout(() => {
                    navigate('/negotiations')
                }, 6000)
            } else {
                openToast({
                    open: true,
                    message: "Erro ao abandonar negociação",
                    severity: "error"
                })
            }
        }
        catch (error) {
            console.log(error)
        }
    }, [showId, openToast, navigate])

    const handleAcceptNegotiation = useCallback(async () => {
        try {
            const { data } = await api.patch(`/shows/negotiations/${showId}`)

            openToast({
                open: true,
                message: data.status === "CONFIRMED"
                    ? "Seu show está confirmado! Aproveite, boa apresentação!" 
                    : "Você aceitou os termos da negociação!",
                severity: "success"
            })
            setShow(data)
        }
        catch (error) {
            console.log(error)
        }
    }, [showId, setShow, openToast])

    const handleUpdateNegotiation = useCallback(async () => {
        if (updateNegotiationBody.paymentValue.error || updateNegotiationBody.couvertCharge.error) {
            return;
        }

        const body = {
            value: Number(updateNegotiationBody.paymentValue.value.replace(/\D/gm, "")) / 100,
            coverCharge: Number(updateNegotiationBody.couvertCharge.value.replace(/\D/gm, "")) / 100
        }

        try {
            const { data } = await api.put(`/shows/${showId}`, body)

            openToast({
                open: true,
                message: "Sua proposta para a negociação foi enviada com sucesso!",
                severity: "success"
            })
            setShow(data)
            setUpdateModalOpen(false)
        }
        catch (error) {
            console.log(error)
        }
    }, [showId, updateNegotiationBody, setShow, openToast])

    const handleCancelNegotiation = useCallback(async () => {
        setCancelDialogOpen(false)

        try {
            const response = await api.delete(`/shows/confirmed/${showId}`)

            if (response.status === 204) {
                openToast({
                    open: true,
                    message: "Show cancelado com sucesso",
                    severity: "success"
                })

                setTimeout(() => {
                    navigate('/negotiations')
                }, 6000)
            } else {
                openToast({
                    open: true,
                    message: "Erro ao cancelar negociação",
                    severity: "error"
                })
            }
        }
        catch (error) {
            console.log(error)
        }
    }, [showId, openToast, navigate])

    return (
        <Stack sx={{ p: 1, pt: 2 }} spacing={1.5} divider={<Divider orientation="horizontal" flexItem />}>
            <Box display="flex" flexDirection="row" justifyContent='space-between' pr={3}>
                {
                    eventName ? (
                        <Typography variant="h5" fontWeight='bold' style={{ color: '#FB2D57' }}>
                            {eventName}
                        </Typography>
                    ) : (
                        <Skeleton />
                    )
                }      
                {
                    eventName ? (
                        <StatusChip label={status} />
                    ) : (
                        <Skeleton width={100} />
                    )
                }
            </Box>
            <Box>
                <Typography variant="h6" mb={1} fontWeight="bold">Descrição:</Typography>
                <Typography variant="body1">
                    {eventDescription != null ? eventDescription : "Sem descrição do evento"}
                </Typography>
            </Box>
            <Box>
                <Typography variant="h6" mb={1} fontWeight="bold">Local</Typography>
                {
                    establishmentName ? (
                        <Typography variant="body1">
                            {establishmentName}
                        </Typography>
                    ) : (
                        <Skeleton/>
                    )
                }
                {
                    address ? (
                        <Typography variant="body1">
                            {eventPropsHelper.getFormattedAddress(address)}
                        </Typography>
                    ) : (
                        <Skeleton/>
                    )
                }
            </Box>
            <Box>
                <Typography variant="h6" mb={1} fontWeight="bold">Artista</Typography>
                <Box display='flex' flexDirection="row">
                    <Avatar sx={{ bgcolor: '#FB2D57', marginRight: 2 }}></Avatar>
                    {
                        artistName || artistInstagram ? (
                            <Box variant="body1" display='flex' flexDirection="column" justifyContent='space-around'>                        
                                <Typography>{artistName}</Typography>
                                {artistInstagram && (<Typography variant="caption">{`@${artistInstagram}`}</Typography>)} 
                            </Box>
                        ) : (
                            <Skeleton variant="rectangular" width="100%" height={200} />
                        )
                    }
                </Box>
                <Typography variant="body1" my={1.5} fontWeight="bold">Descrição:</Typography>
                <Typography variant="body1">
                    {artistDescription != null ? artistDescription : "Sem descrição do artista"}
                </Typography>
            </Box>
            <Box>
                <Typography variant="h6" mb={1} fontWeight="bold">Data e Horário:</Typography>
                <Box variant="body1" display='flex' flexDirection="row">
                    <Typography fontWeight="bold" mr={0.5}>Início:</Typography>
                    {
                        startDateTime ? (
                            <Typography textTransform='capitalize'>
                                {dateHelper.getFormattedScheduleDate(startDateTime)}
                            </Typography>
                        ) : (
                            <Skeleton/>
                        )
                    }
                </Box>
                <Box variant="body1" display='flex' flexDirection="row">
                    <Typography fontWeight="bold" mr={0.5}>Término:</Typography>
                    {
                        endDateTime ? (
                            <Typography textTransform='capitalize'>
                                {dateHelper.getFormattedScheduleDate(endDateTime)}
                            </Typography>
                        ) : (
                            <Skeleton/>
                        )
                    }
                </Box>
            </Box>                                
            <Box>
                <Typography variant="h6" mb={1} fontWeight="bold">Pagamento</Typography>
                <Box variant="body1" display='flex' flexDirection="row">
                    <Typography fontWeight="bold" mr={0.5}>Valor fixo:</Typography>
                    {
                        paymentValue ? (
                            <Typography>
                                {eventPropsHelper.getFormattedPaymentValue(paymentValue)}
                            </Typography>
                        ) : (
                            <Skeleton/>
                        )
                    }
                </Box>
                <Box variant="body1" display='flex' flexDirection="row">
                    <Typography fontWeight="bold" mr={0.5}>Taxa de Couvert:</Typography>
                    {
                        couvertCharge ? (
                            <Typography>
                                {eventPropsHelper.getFormattedCouvertCharge(couvertCharge)}
                            </Typography>
                        ) : (
                            <Skeleton/>
                        )
                    }
                </Box>
            </Box>
            <Box py={2} variant="body1" display='flex' flexDirection="row" flexWrap='wrap' justifyContent="space-evenly">
                {
                    status !== "CONFIRMED" && status !== "CONCLUDED" ? (<>
                        <Button 
                            variant="contained" 
                            color="success" 
                            sx={{ marginY: 1.5 }}
                            onClick={handleAcceptNegotiation}
                        >
                            Aceitar termos da negociação
                        </Button>
                        <Button variant="contained" sx={{ marginY: 1.5 }} onClick={() => setUpdateModalOpen(true)}>
                            Enviar nova proposta
                        </Button>
                        <Button 
                            variant="contained" 
                            color="error" 
                            sx={{ marginY: 1.5 }}
                            onClick={() => setWithdrawDialogOpen(true)}
                        >
                            Abandonar negociação
                        </Button>

                        <Dialog
                            open={withdrawDialogOpen}
                            aria-labelledby="withdraw-dialog-title"
                            aria-describedby="withdraw-dialog-description"
                        >
                            <DialogTitle id="withdraw-dialog-title">
                                Abandonar negociação
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="withdraw-dialog-description">
                                    Tem certeza que deseja abandonar essa negociação? Uma vez abandonada, a negociação não pode ser retomada
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setWithdrawDialogOpen(false)} autoFocus>
                                    Cancelar
                                </Button>
                                <Button color="error" onClick={handleWithdrawNegotiation}>Abandonar</Button>
                            </DialogActions>
                        </Dialog>

                        <Modal
                            open={updateModalOpen}
                            onClose={() => setUpdateModalOpen(false)}
                            aria-labelledby="update-modal-title"
                            aria-describedby="update-modal-description"
                        >
                            <Box sx={modalBoxStyle}>
                                <Stack spacing={3}>
                                    <Typography variant="h6" mb={1} fontWeight="bold">Enviar nova proposta</Typography>
                                    <TextField
                                        label="Valor fixo"
                                        name="value"
                                        error={updateNegotiationBody.paymentValue.error}
                                        value={updateNegotiationBody.paymentValue.value}
                                        helperText="Deve ser no minímo R$ 200,00"
                                        onChange={handlePaymentValueChange}
                                    />
                                    <TextField
                                        label="Taxa de Couvert (%)"
                                        name="coverCharge"
                                        error={updateNegotiationBody.couvertCharge.error}
                                        value={updateNegotiationBody.couvertCharge.value}
                                        helperText="Deve ser entre 0% e 100%"
                                        onChange={handleCouvertChargeChange}
                                    />
                                    <Box display='flex' flexDirection="row" flexWrap='wrap' justifyContent="space-evenly">
                                        <Button 
                                            variant="contained" 
                                            color="success" 
                                            sx={{ marginY: 1.5 }}
                                            onClick={handleUpdateNegotiation}
                                        >
                                            Enviar
                                        </Button>
                                        <Button 
                                            variant="contained" 
                                            color="error" 
                                            sx={{ marginY: 1.5 }}
                                            onClick={() => setUpdateModalOpen(false)}
                                        >
                                            Cancelar
                                        </Button>
                                    </Box>
                                </Stack>
                            </Box>
                        </Modal>
                    </>) : (<>
                        <Button 
                            variant="contained" 
                            color="error" 
                            sx={{ marginY: 1.5 }}
                            onClick={() => setCancelDialogOpen(true)}
                        >
                            Cancelar show
                        </Button>

                        <Dialog
                            open={cancelDialogOpen}
                            aria-labelledby="cancel-dialog-title"
                            aria-describedby="cancel-dialog-description"
                        >
                            <DialogTitle id="cancel-dialog-title">
                                Cancelar show
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="cancel-dialog-description">
                                    Tem certeza que deseja cancelar esse show? Uma vez cancelado, o show não pode ser recuperado
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setCancelDialogOpen(false)} autoFocus>
                                    Fechar
                                </Button>
                                <Button color="error" onClick={handleCancelNegotiation}>Cancelar show</Button>
                            </DialogActions>
                        </Dialog>
                    </>)
                }
            </Box>
        </Stack>
    )
}