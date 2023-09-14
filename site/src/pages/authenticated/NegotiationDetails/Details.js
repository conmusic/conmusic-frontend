import React, { useMemo } from "react";
import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";

import showStatusHelper from "../../../helpers/showStatusHelper";
import eventPropsHelper from "../../../helpers/eventPropsHelper";
import dateHelper from "../../../helpers/dateHelper";

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
    showId
}) {
    const formattedAddress = useMemo(() => {
        return address != null ? eventPropsHelper.getFormattedAddress(address) : "Endereço indisponível"
    }, [address])

    const formattedStartDateTime = useMemo(() => {
        return startDateTime != null
            ? dateHelper.getFormattedScheduleDate(startDateTime)
            : "Data e horário indisponível"
    }, [startDateTime])

    const formattedEndDateTime = useMemo(() => {
        return endDateTime != null
            ? dateHelper.getFormattedScheduleDate(endDateTime)
            : "Data e horário indisponível"
    }, [endDateTime])

    const formattedPaymentValue = useMemo(() => {
        let value = paymentValue != null ? Number(paymentValue) : 0;

        return eventPropsHelper.getFormattedPaymentValue(value)
    }, [paymentValue])

    const formattedCouvertCharge = useMemo(() => {
        let value = couvertCharge != null ? String(couvertCharge) : "0";

        return eventPropsHelper.getFormattedCouvertCharge(value)
    }, [couvertCharge])

    return (
        <Stack sx={{ p: 1, pt: 2 }} spacing={1.5} divider={<Divider orientation="horizontal" flexItem />}>
            <Box display="flex" flexDirection="row" justifyContent='space-between' pr={3}>
                <Typography variant="h5" fontWeight='bold' style={{ color: '#FB2D57' }}>
                    {eventName != null ? eventName : "Nome do Evento"}
                </Typography>
                <Typography variant="body1">{status != null ? showStatusHelper.getDisplayName(status) : "Indefinido"}</Typography>
            </Box>            
            <Box>
                <Typography variant="h6" mb={1} fontWeight="bold">Descrição:</Typography>
                <Typography variant="body1">
                    {eventDescription != null ? eventDescription : "Sem descrição do evento"}
                </Typography>
            </Box>
            <Box>
                <Typography variant="h6" mb={1} fontWeight="bold">Local</Typography>
                <Typography variant="body1">{establishmentName}</Typography>
                <Typography variant="body1">{formattedAddress}</Typography>
            </Box>
            <Box>
                <Typography variant="h6" mb={1} fontWeight="bold">Data e Horário:</Typography>
                <Box variant="body1" display='flex' flexDirection="row">
                    <Typography fontWeight="bold" mr={0.5}>Início:</Typography>
                    <Typography textTransform='capitalize'>{formattedStartDateTime}</Typography>
                </Box>
                <Box variant="body1" display='flex' flexDirection="row">
                    <Typography fontWeight="bold" mr={0.5}>Término:</Typography>
                    <Typography textTransform='capitalize'>{formattedEndDateTime}</Typography>
                </Box>
            </Box>                                
            <Box>
                <Typography variant="h6" mb={1} fontWeight="bold">Artista</Typography>
                <Box display='flex' flexDirection="row">
                    <Avatar sx={{ bgcolor: '#FB2D57', marginRight: 2 }}></Avatar>
                    <Box variant="body1" display='flex' flexDirection="column" justifyContent='space-around'>                        
                        <Typography>{artistName}</Typography>
                        {
                            artistInstagram != null
                            && (<Typography variant="caption">{`@${artistInstagram}`}</Typography>)                        
                        }                        
                    </Box>
                </Box>
            </Box>
            <Box>
                <Typography variant="h6" mb={1} fontWeight="bold">Pagamento</Typography>
                <Box variant="body1" display='flex' flexDirection="row">
                    <Typography fontWeight="bold" mr={0.5}>Valor fixo:</Typography>
                    <Typography>{formattedPaymentValue}</Typography>
                </Box>
                <Box variant="body1" display='flex' flexDirection="row">
                    <Typography fontWeight="bold" mr={0.5}>Taxa de Couvert:</Typography>
                    <Typography>{formattedCouvertCharge}</Typography>
                </Box>
            </Box>
            <Box py={2} variant="body1" display='flex' flexDirection="row" justifyContent="space-evenly">
                <Typography>Aceitar termos da negociação</Typography>
                <Typography>Enviar nova proposta</Typography>
                <Typography>Abandonar negociação</Typography>
            </Box>
        </Stack>
    )
}