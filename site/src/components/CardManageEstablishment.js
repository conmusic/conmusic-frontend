import React from 'react';
import {

    Grid,
    Typography,
    Card,
    CardMedia,
    CardContent,
    Button,
} from '@mui/material';
import myImage from '../assets/images/image.png';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const style = {
    position: 'absolute',
    display: 'flex',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 300
};

const styleButton = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
};

function CardManageEstablishment() {
    const [open2, setOpen2] = React.useState(false);

    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);

    const [name, setName] = React.useState('Rock and Pub');
    const [location, setLocation] = React.useState('Rua x');

    return (
        <Grid item xs={12} md={12} lg={12} sx={{ display: "flex", marginTop: 3}}>
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
                        style={{ display: 'flex', backgroundColor: '#FB2D57', 
                        color: 'white', width: 120, height: 40, marginRight: 15 }}>
                        Gerenciar
                    </Button>
                    <Modal
                        open={open2}
                        onClose={handleClose2}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style} spacing={2}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Rock and Pub
                            </Typography>
                            <TextField value={name} id="outlined-controlled" label="Nome"
                                style={{ color: '#FB2D57' }} focused
                                onChange={(event) => {
                                    setName(event.target.value);
                                }}
                            />
                            <TextField value={location} id="outlined-controlled" label="Localização"
                                style={{ color: '#FB2D57' }} focused
                                onChange={(event) => {
                                    setLocation(event.target.value);
                                }}
                            />
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
                </CardContent>
            </Card>
        </Grid>

    )
}
export default CardManageEstablishment;