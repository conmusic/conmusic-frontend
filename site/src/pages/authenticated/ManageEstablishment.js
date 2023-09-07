import React, { useState, useEffect } from 'react';
import { format, isAfter } from 'date-fns';
import {
    Container,
    Grid,
} from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import api from '../../services/api';

import Title from '../../components/Title';
import CardManageEstablishment from "../../components/CardManageEstablishment"

const style = {
    position: 'absolute',
    display: 'flex',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 610,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 'auto'
};

export default function ManageEstablishment() {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [cardData, setCardData] = useState([]);

    useEffect(() => {
        const fetchCardData = async () => {
            try {
                var token = localStorage.getItem('@conmusic:token');
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };
                const response = await api.get('/shows/confirmed', config);
                var card = response.data
                    .filter(obj => isAfter(new Date(obj.schedule.startDateTime), new Date()))
                    .map(obj => {
                        let showDate = format(new Date(obj.schedule.startDateTime), "dd/MM/yyyy");
                        let showStartDateTime = format(new Date(obj.schedule.startDateTime), "HH:mm");
                        let showEndDateTime = format(new Date(obj.schedule.endDateTime), "HH:mm");

                        return {
                            establishment: obj.event.establishment.establishmentName,
                            event: obj.event.name,
                            date: showDate,
                            time: `${showStartDateTime} - ${showEndDateTime}`,
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
            <Stack spacing={2} direction="row" justifyContent={'space-between'}>
                <Title>Estabelecimentos</Title>
                <Button variant="contained" color="success" onClick={handleOpen}>
                    Criar Estabelecimento
                </Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} spacing={2}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Criar Estabelecimento
                        </Typography>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                            flex-wrap= 'wrap' 
                        >
                            <div>
                            <TextField
                                    label="Nome do Estabelecimento"
                                    id="filled-size-normal"
                                    defaultValue="Normal"
                                    variant="filled"
                                />
                                <TextField
                                    label="CNPJ"
                                    id="filled-size-normal"
                                    defaultValue="Normal"
                                    variant="filled"
                                />
                            </div>
                            <div>
                            <TextField
                                    label="Número de Telefone"
                                    id="filled-size-normal"
                                    defaultValue="Normal"
                                    variant="filled"
                                />
                                
                                <TextField
                                    label="Quantidade de tomadas 220"
                                    id="filled-size-normal"
                                    defaultValue="Normal"
                                    variant="filled"
                                />
                            </div>
                            <div>
                            <TextField
                                    label="Quantidade de tomadas 110"
                                    id="filled-size-normal"
                                    defaultValue="Normal"
                                    variant="filled"
                                />
                                <TextField
                                    label="Capacidade"
                                    id="filled-size-normal"
                                    defaultValue="Normal"
                                    variant="filled"
                                />
                            </div>
                            <div>
                            <TextField
                                    label="Endereço"
                                    id="filled-size-normal"
                                    defaultValue="Normal"
                                    variant="filled"
                                />
                                <TextField
                                    label="Cidade"
                                    id="filled-size-normal"
                                    defaultValue="Normal"
                                    variant="filled"
                                />
                            </div>
                            <div>
                            <TextField
                                    label="Estado"
                                    id="filled-size-normal"
                                    defaultValue="Normal"
                                    variant="filled"
                                />
                                <TextField
                                    label="CEP"
                                    id="filled-size-normal"
                                    defaultValue="Normal"
                                    variant="filled"
                                />
                            </div>
                            <div>
                            <TextField
                                    label="Size"
                                    id="filled-size-normal"
                                    defaultValue="Normal"
                                    variant="filled"
                                />
                            </div>
                        </Box>
                        <Button variant="contained" color="success" style={{ width: 250, height: 40 }}>
                            Criar Estabelecimento
                        </Button>
                    </Box>
                </Modal>
            </Stack>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                    <CardManageEstablishment />

                </Grid>
            </Grid>
        </Container>
    );
}