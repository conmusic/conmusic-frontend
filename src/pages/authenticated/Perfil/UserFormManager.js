import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import {
    Typography,
    Grid,
    Button,
    Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useAuth } from '../../../hooks/auth';
import api from "../../../services/api";

const SmallImage = styled('img')({
    width: '150px',
    height: '150px',
    borderRadius: '50%',
});

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function UserFormManager(onUpload) {

    const { userId } = useAuth();

    const [cardData, setCardData] = useState([]);

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        cpf: '',
        birthDate: '',
        instagram: '',
        address: '',
        state: '',
        city: '',
        zipCode: '',
        about: '',
        musicalGenres: '',
        // ... outros campos que você busca no banco
    });

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [openToast, setOpenToast] = React.useState(false);

    const handleClick = () => {
        setOpenToast(true);
        handleClose()
    };

    const [selectedFile, setSelectedFile] = useState(null);

    const handleCloseToast = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenToast(false);
    };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleUpload = () => {
        if (selectedFile) {
            onUpload(selectedFile);
            setSelectedFile(null);
        }
    };
    const [selectedImage] = useState(0);
    const image = [
        'https://s2-g1.glbimg.com/u_Sep5KE8nfnGb8wWtWB-vbBeD0=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2022/N/Q/S27GlHSKA6DAAjshAgSA/bar-paradiso.png',
    ]



    useEffect(() => {

        const getManagerData = async () => {
            try {
                var token = localStorage.getItem('@conmusic:token');
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };

                console.log("userId:", userId);

                console.log('Chamando a API para buscar dados do usuário...');
                const response = await api.get(`/managers/${userId}`, config);
                console.log(response)

                if (response.data) {
                    console.log('Dados recebidos:', response.data);

                    const userDataArray = Array.isArray(response.data) ? response.data : [response.data];
                    const firstUser = userDataArray[0];

                    setUserData({
                        name: firstUser.name || '',
                        email: firstUser.email || '',
                        phoneNumber: firstUser.phoneNumber || '',
                        cpf: firstUser.cpf || '',
                        birthDate: firstUser.birthDate || '',
                        instagram: firstUser.instagram || '',
                        about: firstUser.about || '',
                        address: firstUser.address || '',
                        city: firstUser.city || '',
                        state: firstUser.state || '',
                        zipCode: firstUser.zipCode || '',
                    });
                } else {
                    console.log('Resposta vazia ou sem dados:', response.data);
                }
            } catch (error) {
                console.error('Erro ao buscar os dados do usuário:', error);
            }
        };

        if (userId !== 0) {
            getManagerData();
        }
    }, [userId]);


    return (
        <React.Fragment >
            <Grid maxWidth="lg" sx={{ mt: 4, mb: 4, marginLeft: 9, width: "85%" }}>
                <Typography variant="h4" gutterBottom>
                    Meu Perfil
                </Typography>
                <SmallImage src={image[selectedImage]} alt="Profile" />
                <Typography variant="h6" gutterBottom>
                    Dados do Usuário
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="firstName"
                            name="firstName"
                            label="Nome do Estabelecimento"
                            fullWidth
                            autoComplete="given-name"
                            variant="outlined"
                            value={userData.name}
                            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="email"
                            name="email"
                            label="Email"
                            fullWidth
                            autoComplete="family-name"
                            variant="outlined"
                            value={userData.email}
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="state"
                            name="state"
                            label="Telefone"
                            fullWidth
                            variant="outlined"
                            inputProps={{
                                maxLength: 15,
                                pattern: "{2} {5}-{4}",
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="state"
                            name="state"
                            label="CNPJ"
                            fullWidth
                            variant="outlined"
                            inputProps={{
                                maxLength: 14,
                                pattern: "{3}{3}{3}-{2}",
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            name="dataNasci"
                            label="Razão Social"
                            type="text"
                            id="date"
                            autoComplete="off"
                            inputProps={{
                                maxLength: 10,
                                pattern: "{2}/{2}/{4}",
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="state"
                            name="state"
                            label="Instagram"
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="address1"
                            name="address1"
                            label="Endereço"
                            fullWidth
                            autoComplete="shipping address-line1"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="city"
                            name="city"
                            label="Cidade"
                            fullWidth
                            autoComplete="shipping address-level2"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="state"
                            name="state"
                            label="Estado"
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="zip"
                            name="zip"
                            label="CEP"
                            fullWidth
                            autoComplete="shipping postal-code"
                            variant="outlined"

                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="country"
                            name="country"
                            label="UF"
                            fullWidth
                            autoComplete="shipping country"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="outlined-multiline-static"
                            label="Escreva um pouco sobre seu estabelecimento"
                            multiline
                            rows={4}
                            fullWidth
                            autoComplete="shipping country"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <input
                            type="file"
                            accept="image/*"
                            id="upload-button"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                        <label htmlFor="upload-button">
                            <Button
                                variant="outlined"
                                color="primary"
                                component="span"
                                startIcon={<CloudUploadIcon />}
                                fullWidth
                                style={{ padding: '13px', fontSize: '1.0rem' }}
                                onClick={handleClick}
                            >

                                Upload de Imagem
                            </Button>
                            {selectedFile && (
                                <Snackbar open={openToast} autoHideDuration={6000} onClose={handleCloseToast}>
                                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                        Imagem selecionada, agora basta enviar!
                                    </Alert>
                                </Snackbar>
                            )}
                        </label>
                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="medium"
                                disabled={!selectedFile}
                                onClick={handleUpload}
                                fullWidth
                                sx={{
                                    marginTop: 'auto',
                                    borderColor: 'black',
                                    backgroundColor: 'red',
                                    color: 'white',
                                    marginTop: 2,
                                    height: 53
                                }}

                            >
                                Enviar Imagem
                            </Button>
                        </div>
                    </Grid>
                </Grid>
                <Grid sx={{ display: "flex" }}>
                    <Button
                        variant="contained"
                        size="medium"
                        sx={{
                            borderColor: 'black',
                            backgroundColor: 'green',
                            color: 'white',
                            marginTop: 2
                        }}
                    >
                        Salvar
                    </Button>
                    <Button
                        variant="contained"
                        size="medium"
                        sx={{
                            marginTop: 'auto',
                            borderColor: 'black',
                            backgroundColor: 'red',
                            color: 'white',
                            marginLeft: 3
                        }}
                    >
                        Cancelar
                    </Button>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
