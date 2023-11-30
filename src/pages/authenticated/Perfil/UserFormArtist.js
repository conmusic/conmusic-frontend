import React, { useState, useEffect } from 'react';
import {
    Typography,
    Grid,
    Button,
    Paper,
    styled,
    TextField,
    Alert as MuiAlert,
    Snackbar,
    FormControl,
    InputLabel,
    Select,
    OutlinedInput,
    Box,
    Chip,
    MenuItem
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
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
        musicalGenres: [],
    });

    const [genres, setGenres] = useState([])

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleOpenSnackbar = () => setOpenSnackbar(true);
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const [openToast, setOpenToast] = useState(false);

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

                const response = await api.get(`/artists/${userId}`, config);

                if (response.data) {
                    console.log('Dados recebidos:', response.data);

                    setUserData({
                        name: response.data.name || '',
                        email: response.data.email || '',
                        phoneNumber: response.data.phoneNumber || '',
                        cpf: response.data.cpf || '',
                        birthDate: response.data.birthDate || '',
                        instagram: response.data.instagram || '',
                        about: response.data.about || '',
                        address: response.data.address || '',
                        city: response.data.city || '',
                        state: response.data.state || '',
                        zipCode: response.data.zipCode || '',
                        musicalGenres: response.data.musicalGenres || [],
                    });
                } else {
                    console.log('Resposta vazia ou sem dados:', response.data);
                }
            } catch (error) {
                console.error('Erro ao buscar os dados do usuário:', error);
            }
        };

        const getGenres = async () => {
            try {
                const { data } = await api.get('/genres')

                setGenres(data)
            }
            catch (e) {
                console.error(e)
            }
        }

        getArtistsData();
        getGenres();
    }, [userId]);

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
                            <FormControl sx={{ width: '100%' }}>
                                <InputLabel id='genre-filter-option-label'>Gêneros</InputLabel>
                                <Select
                                    id='genre-filter-option'
                                    labelId='genre-filter-option-label'
                                    multiple
                                    value={userData.musicalGenres}
                                    onChange={(e) => setUserData({ ...userData, musicalGenres: e.target.value})}
                                    input={<OutlinedInput id="select-multiple-genre" label="Gênero" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {
                                                selected.map((option, i) => (
                                                    <Chip
                                                        key={`SelectedGenre#${i}`}
                                                        sx={{ backgroundColor: i % 2 === 0 ? "#FF3E3A" : "#CC3245", color: '#F2F2F2' }}
                                                        label={option}
                                                    />
                                                ))
                                            }
                                        </Box>
                                    )}
                                >
                                    {
                                        genres.map((g, i) => (
                                            <MenuItem
                                                key={`GenreMenuItem#${i}`}
                                                value={g.name}
                                            >
                                                {g.name}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
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
                                color="primary"
                                size="medium"
                                onClick={() => {
                                    handleUpdate();
                                    handleOpenSnackbar();
                                }}
                                sx={{
                                    borderColor: 'black',
                                    backgroundColor: 'green',
                                    color: 'white',
                                    marginTop: 2,
                                }}
                            >
                                Salvar
                            </Button>
                            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                                    Dados salvos com sucesso!
                                </Alert>
                            </Snackbar>

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
