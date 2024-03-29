import React, { useState } from 'react';
import {
    Grid,
    Typography,
    Card,
    CardMedia,
    CardContent,
    Button,
    Modal,
    Box,
    TextField
} from '@mui/material';

import myImage from '../assets/images/image.png';

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
    p: 4,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 'auto'
};

const styleButton = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
};

function CardManageEstablishment() {
    const [open2, setOpen2] = useState(false);

    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);

    const [name, setName] = useState('Rock and Pub');
    const [location, setLocation] = useState('Rua x');

    return (
        <Grid item xs={12} md={12} lg={12} sx={{ display: "flex", marginTop: 3 }}>
            <Card sx={{
                display: 'flex',
                width: 1300,
            }}>
                <CardMedia
                    component="img"
                    sx={{
                        width: 120,
                        height: 120,
                        display: { xs: 'none', sm: 'block' },
                        alignSelf: "center",
                        borderRadius: 10,
                        ml: 3,
                    }}
                    src={myImage}
                />
                <CardContent sx={{ flex: 1, mt: 1, marginLeft: "25%" }}>
                    <Typography component="h2" variant="h5">
                        <p>Casa de show A</p>
                    </Typography>
                    <Typography variant="subtitle1" >
                        <p>Noite do Jazz</p>
                    </Typography>
                    <Typography variant="subtitle1" paragraph>
                        <p>São Paulo - SP</p>
                    </Typography>
                </CardContent>
                <CardContent item xs={12} md={4} lg={4} style={{ display: 'flex', alignItems: 'center' }}>
                    <Button onClick={handleOpen2} variant="contained"
                        style={{
                            display: 'flex', backgroundColor: '#FB2D57',
                            color: 'white', width: 120, height: 40, marginRight: 15
                        }}>
                        Gerenciar
                    </Button>
                </CardContent>
            </Card>
            <Modal
                open={open2}
                onClose={handleClose2}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Rock and Pub
                    </Typography>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                        flex-wrap='wrap'
                    >
                        <div style={{ marginLeft: '-7px' }}>
                            <TextField
                                label="Nome do Estabelecimento"
                                id="filled-size-normal"
                                defaultValue="Normal"
                                variant="filled"
                            />
                            <TextField
                                label="Nome Popular"
                                id="filled-size-normal"
                                defaultValue="Normal"
                                variant="filled"
                            />
                        </div>
                        <div style={{ marginLeft: '-7px' }}>
                            <TextField
                                label="Número de Telefone"
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
                        <div style={{ marginLeft: '-7px' }}>
                            <TextField
                                label="Quantidade de tomadas 110"
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
                        <div style={{ marginLeft: '-7px' }}>
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
                        <div style={{ marginLeft: '-7px' }}>
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
                        <div style={{ marginLeft: '-7px' }}>
                            <TextField
                                label="Capacidade"
                                id="filled-size-normal"
                                defaultValue="Normal"
                                variant="filled"
                            />
                        </div>
                    </Box>
                    <div sx={styleButton}
                        style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <Button variant="contained" color="success" style={{ width: '30%' }}>
                            Atualizar
                        </Button>
                        <Button variant="contained" color="error" style={{ width: '30%' }}>
                            Deletar
                        </Button>
                    </div>
                </Box>
            </Modal>
        </Grid>

    )
}
export default CardManageEstablishment;