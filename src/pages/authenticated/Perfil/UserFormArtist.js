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

export default function UserFormArtist(onUpload) {
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

    const handleUpdate = async () => {
        try {
            var token = localStorage.getItem('@conmusic:token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            const response = await api.put(`/artists/${userId}`, userData, config);

            if (response.status === 200) {
                console.log('Dados atualizados com sucesso!');
                // Se necessário, adicione um feedback para o usuário de que os dados foram atualizados

            } else {
                console.log('Falha ao atualizar os dados:', response.data);
            }
        } catch (error) {
            console.error('Erro ao atualizar os dados do usuário:', error);
        }
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
                        address: firstUser.address || '',
                        city: firstUser.city || '',
                        state: firstUser.state || '',
                        zipCode: firstUser.zipCode || '',
                        musicalGenres: firstUser.musicalGenres || '',
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
                <Paper sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: 4, gap: 1, my: 2 }}>

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
                                value={userData.address}
                                onChange={(e) => setUserData({ ...userData, address: e.target.value })}
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
                                value={userData.city}
                                onChange={(e) => setUserData({ ...userData, city: e.target.value })}
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
                                value={userData.zipCode}
                                onChange={(e) => setUserData({ ...userData, zipCode: e.target.value })}
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
                                value={userData.state}
                                onChange={(e) => setUserData({ ...userData, state: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
    <Autocomplete
        fullWidth
        id="combo-box-demo"
        options={topEstilosMusicais}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => <TextField {...params} label="Gênero Musical" />}
        value={
            userData.musicalGenres
                ? topEstilosMusicais.find((option) => option.label === userData.musicalGenres)
                : null
        }
        onChange={(e, newValue) => {
            if (newValue) {
                setUserData({ ...userData, musicalGenres: newValue.label });
            } else {
                setUserData({ ...userData, musicalGenres: '' });
            }
        }}
    />
</Grid>


                        <Grid item xs={12} sm={6} sx={{ display: "flex", flexDirection: "column" }}>
                            <TextField
                                id="outlined-multiline-static"
                                label="Escreva um pouco sobre você"
                                multiline
                                rows={4}
                                fullWidth
                                autoComplete="shipping country"
                                variant="outlined"
                                value={userData.about}
                                onChange={(e) => setUserData({ ...userData, about: e.target.value })}
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
                    <Grid item xs={12} sm={6}>
                        <div style={{ width: "100%", display: "flex", justifyContent: "end" }}>
                            <Button
                                variant="contained"
                                size="medium"
                                onClick={handleUpdate}
                                sx={{
                                    borderColor: 'black',
                                    backgroundColor: 'green',
                                    color: 'white',
                                    marginTop: 2,

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
                                    marginLeft: 3,
                                    marginTop: 2,

                                }}
                            >
                                Cancelar
                            </Button>
                        </div>
                    </Grid>
                </Paper>
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