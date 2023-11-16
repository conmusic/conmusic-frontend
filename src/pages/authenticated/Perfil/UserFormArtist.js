import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import {
    Typography,
    Grid,
    Button,
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

export default function UserFormArtist(onUpload) {
    const { userId } = useAuth();

    const [cardData, setCardData] = useState([]);

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        cpf: '',
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

        const getArtistsData = async () => {
            try {
                var token = localStorage.getItem('@conmusic:token');
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };

                console.log("userId:", userId);

                console.log('Chamando a API para buscar dados do usuário...');
                const response = await api.get(`/artists/${userId}`, config);
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
                        // ... outros campos do usuário
                    });
                } else {
                    console.log('Resposta vazia ou sem dados:', response.data);
                }
            } catch (error) {
                console.error('Erro ao buscar os dados do usuário:', error);
            }
        };

        if (userId !== 0) {
            getArtistsData();
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
                            label="Nome"
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
                            value={userData.phoneNumber}
                            onChange={(e) => setUserData({ ...userData, phoneNumber: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="state"
                            name="state"
                            label="CPF"
                            fullWidth
                            variant="outlined"
                            inputProps={{
                                maxLength: 14,
                                pattern: "{3}{3}{3}-{2}",
                            }}
                            value={userData.cpf}
                            onChange={(e) => setUserData({ ...userData, cpf: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="date"
                            fullWidth
                            name="dataNasci"
                            variant="outlined"
                            label="Data de nascimento"
                            value={userData.birthDate}
                            onChange={(e) => setUserData({ ...userData, birthDate: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="state"
                            name="state"
                            label="Instagram"
                            fullWidth
                            variant="outlined"
                            value={userData.instagram}
                            onChange={(e) => setUserData({ ...userData, instagram: e.target.value })}
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
                            label="Escreva um pouco sobre você"
                            multiline
                            rows={4}
                            fullWidth
                            autoComplete="shipping country"
                            variant="outlined"
                            value={userData.about}
                            onChange={(e) => setUserData({ ...userData, instagram: e.target.value })}
                        />
                        <Button
                            variant="contained"
                            size="medium"
                            sx={{
                                borderColor: 'black',
                                backgroundColor: 'green',
                                color: 'white',
                                marginTop: 2
                            }}
                            onClick={handleUpload}
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
                                marginLeft: 3,
                                marginTop: 2
                            }}
                        >
                            Cancelar
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Autocomplete
                            fullWidth
                            id="combo-box-demo"
                            options={topEstilosMusicais}
                            renderInput={(params) => <TextField {...params} label="Gênero Musical" />}
                        />
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
                                style={{ padding: '13px', fontSize: '1.0rem', marginTop: 13 }}
                                onClick={handleClick}
                            >

                                Upload de Imagem
                            </Button>
                            {selectedFile && (
                                <Snackbar open={openToast} autoHideDuration={6000} onClose={handleCloseToast}>
                                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                        Avaliação enviada!
                                    </Alert>
                                </Snackbar>
                            )}
                        </label>
                        <Grid sx={{ display: "flex" }}>
                            <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="medium"
                                    disabled={!selectedFile}
                                    onClick={handleUpload}
                                    sx={{
                                        marginTop: 'auto',
                                        borderColor: 'black',
                                        backgroundColor: 'red',
                                        color: 'white',
                                        marginTop: 2

                                    }}

                                >
                                    Enviar Imagem
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

        </React.Fragment>
    );
}
const topEstilosMusicais = [
    { label: 'Rock' },
    { label: 'Pop' },
    { label: 'Hip Hop' },
    { label: 'Jazz' },
    { label: 'Blues' },
    { label: 'Country' },
    { label: 'Eletrônica' },
    { label: 'Clássica' },
    { label: 'R&B' },
    { label: 'Reggae' },
    { label: 'Funk' },
    { label: 'Soul' },
    { label: 'Metal' },
    { label: 'Punk' },
    { label: 'Folk' },
    { label: 'Indie' },
    { label: 'Alternativo' },
    { label: 'Rap' },
    { label: 'EDM (Electronic Dance Music)' },
    { label: 'Latina' },
    { label: 'Sertanejo' },
    { label: 'Samba' },
    { label: 'Forró' },
    { label: 'Gospel' },
    { label: 'MPB (Música Popular Brasileira)' },
    { label: 'Axé' },
    { label: 'Bossa Nova' },
    { label: 'Pagode' },
    { label: 'Gótico' },
    { label: 'Raggamuffin' },
    { label: 'K-Pop' },
    { label: 'Disco' },
    { label: 'Ranchera' },
    { label: 'Fado' },
    { label: 'Flamenco' },
    { label: 'J-Pop' },
    { label: 'Hard Rock' },
    { label: 'Death Metal' },
    { label: 'Ska' },
    { label: 'Celtic' },
    { label: 'Piano Bar' },
    { label: 'Musical' },
    { label: 'New Wave' },
    { label: 'Grunge' },
    { label: 'Rapcore' },
    { label: 'Trap' },
    { label: 'Rap Metal' },
    { label: 'Indie Pop' },
    { label: 'Hardcore Punk' },
    { label: 'Soul Jazz' },
    { label: 'Country Rock' },
    { label: 'Smooth Jazz' },
    { label: 'Rockabilly' },
    { label: 'R&B Contemporâneo' },
    { label: 'Soul Clássico' },
    { label: 'Hip Hop Alternativo' },
    { label: 'Reggaeton' },
    { label: 'Trance' },
    { label: 'Dubstep' },
    { label: 'Salsa' },
    { label: 'Merengue' },
    { label: 'Punk Rock' },
    { label: 'Pop Punk' },
    { label: 'Hardstyle' },
    { label: 'Bluegrass' },
    { label: 'Jazz Fusion' },
    { label: 'Cumbia' },
    { label: 'Chiptune' },
    { label: 'House' },
    { label: 'Techno' },
    { label: 'Gospel Contemporâneo' },
    { label: 'R&B Alternativo' },
    { label: 'Metalcore' },
    { label: 'Rap Latino' },
    { label: 'Pop Rock Brasileiro' },
    { label: 'Reggae Brasileiro' },
    { label: 'Funk Carioca' },
    { label: 'Frevo' },
    { label: 'Brega' },
    { label: 'Pop Latino' },
    { label: 'Rock Progressivo' },
    { label: 'Heavy Metal' },
    { label: 'Indie Rock' },
    { label: 'Rap Nacional' },
    { label: 'Música Clássica Indiana' },
    { label: 'Sertanejo Universitário' },
    { label: 'Samba-Reggae' },
    { label: 'Música Eletrônica Brasileira' },
    { label: 'Maracatu' },
    { label: 'Samba Enredo' },
    { label: 'Baião' },
    { label: 'Manguebeat' },
    { label: 'Metal Alternativo' },
    { label: 'Pós-Punk' },
    { label: 'Gospel Brasileiro' },
    { label: 'Música Tradicional Chinesa' },
    { label: 'Música Tradicional Japonesa' },
    { label: 'Música Tradicional Africana' },
    { label: 'Música Tradicional Irlandesa' },
    { label: 'Música Tradicional Escocesa' },
    { label: 'Música Tradicional Árabe' },
];