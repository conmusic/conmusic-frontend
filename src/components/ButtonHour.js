import React, { useCallback, useState } from 'react';
import {
    Button,
    Container,
    Grid,
    Modal,
    TextField,
    Typography,
    Stack,
    Box,
    Snackbar,
    Alert,
} from '@mui/material';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import api from '../services/api';
import { auto } from '@popperjs/core';
import moment from 'moment';



const style = {
    position: 'absolute',
    display: 'flex',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
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
    display: 'flex',
};


function ButtonHour(eventId) {
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [startDateTime, setStartDateTime] = React.useState(dayjs());
    const [endDateTime, setEndDateTime] = React.useState(dayjs());
    const [openToast, setOpenToast] = React.useState(false);
    const handleCloseToast = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenToast(false);
    };
    const handleOpenModal = () => {
        setOpenCreateModal(true);
    };
    const handleClose = () => setOpenCreateModal(false);

    const handleClick = async () => {
        const data = {
            startDateTime: startDateTime.toDate(),
            endDateTime: endDateTime.toDate(),
        };
        try {
            await api.post(`/schedules/${eventId.eventId}`, data);
        } catch (error) {
            console.error(error);
        }
        console.log(data);
        setOpenToast(true);
    };

    return (
        <>
            <Stack width={'100%'} ml direction="row" justifyContent={'flex-end'}>
                <Button variant="contained" color="success" onClick={handleOpenModal}>
                    Criar Agendamento
                </Button>
            </Stack>
            <Modal
                open={openCreateModal}
                onClose={() => setOpenCreateModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} spacing={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6">Formulário de Agendamento</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    label="Data e horário de Início"
                                    value={startDateTime}
                                    onChange={(newValue) => setStartDateTime(newValue)}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} md={6} display={'flex'} justifyContent={'flex-end'}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    label="Data e horário de Fim"
                                    value={endDateTime}
                                    onChange={(newValue) => setEndDateTime(newValue)}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                    <Grid sx={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
                        <Button variant="contained" color="success" style={{ width: auto, height: auto }} onClick={handleClick}>
                            Criar
                        </Button>
                        <Button variant="contained" color="error" style={{ width: "auto", height: "auto" }}
                            onClick={handleClose}>
                            Cancelar
                        </Button>
                    </Grid>
                </Box>
            </Modal>
            <Snackbar open={openToast} autoHideDuration={6000} onClose={handleCloseToast}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Agendamento feito!
                </Alert>
            </Snackbar>
        </>
    );
}

export default ButtonHour;