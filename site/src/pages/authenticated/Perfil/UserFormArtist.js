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

    const handleUpload = async () => {

        if (!selectedFile) {
            try {
                const formData = new FormData();
                // formData.append('image', selectedFile);
                formData.append('name', cardData.length > 0 ? cardData[0].name : '');
                formData.append('email', cardData.length > 0 ? cardData[0].email : '');
                formData.append('phone', cardData.length > 0 ? cardData[0].phoneNumber : '');
                // Adicione outros campos do formulário aqui

                // Obtenha o token de autenticação
                const token = localStorage.getItem('@conmusic:token');

                // Configure os cabeçalhos com o token
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                // Chame a função de upload (substitua pela sua lógica real)
                const response = await api.post(`/artists/${userId}`, formData, config);

                // Lide com a resposta, se necessário
                console.log('Resposta do upload:', response);

                // Limpe o estado após o envio
                setSelectedFile(null);

                // Exiba uma mensagem de sucesso ou faça outras ações necessárias
                alert('Upload bem-sucedido!');
            } catch (error) {
                // Lide com erros durante o upload
                console.error('Erro durante o upload:', error);
                alert('Erro durante o upload. Consulte o console para obter detalhes.');
            }
        }
    };
    const [selectedImage] = useState(0);
    const image = [
        'https://s2-g1.glbimg.com/u_Sep5KE8nfnGb8wWtWB-vbBeD0=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2022/N/Q/S27GlHSKA6DAAjshAgSA/bar-paradiso.png',
    ]

    // Define um efeito colateral que é executado quando o valor de `userId` muda
    useEffect(() => {
        // Função assíncrona para obter dados de artistas do servidor
        const getArtistsData = async () => {
            try {
                var token = localStorage.getItem('@conmusic:token');
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };

                // Registra o valor atual de `userId` no console
                console.log("userId:", userId);



                // Faz uma requisição GET ao servidor para obter dados do artista
                const response = await api.get(`/artists/${userId}`, config);

                // Registra os dados recebidos do servidor no console
                console.log("data:", response);

                // Verifica se a resposta do servidor é uma matriz
                const card = Array.isArray(response.data)
                    // Se for uma matriz, mapeia os dados do artista
                    ? response.data.map(obj => ({
                        id: obj.id,
                        name: obj.name,
                        email: obj.email,
                        cpf: obj.cpf,
                        phoneNumber: obj.phoneNumber,
                        birthDate: obj.birthDate,
                        about: obj.about,
                        instagram: obj.instagram,
                    }))
                    // Se não for uma matriz, assume que é um objeto e coloca-o em uma matriz
                    : [response.data];
                console.log("mapped card data:", card);


                // Configura o estado `cardData` com os dados obtidos do servidor
                setCardData(card);
            } catch (error) {
                // Trata erros durante a solicitação ao servidor
                console.error('Erro ao buscar os dados dos cards:', error);
                console.error('Mensagem de erro do servidor:', error.response ? error.response.data : error.message);
            }
        };

        // Verifica se `userId` não é zero antes de chamar a função para buscar dados
        if (userId !== 0) {
            getArtistsData();
        }
    }, [userId]); // Dependência do efeito, ou seja, o efeito será reexecutado se `userId` mudar



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
                            defaultValue={cardData.length > 0 ? cardData[0].name : ''}
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
                            defaultValue={cardData.length > 0 ? cardData[0].email : ''}
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
                            defaultValue={cardData.length > 0 ? cardData[0].phoneNumber : ''}
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
                            defaultValue={cardData.length > 0 ? cardData[0].cpf : ''}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            name="dataNasci"
                            label="Data de nascimento"
                            type="text"
                            id="date"
                            autoComplete="off"
                            inputProps={{
                                maxLength: 10,
                                pattern: "{2}/{2}/{4}",
                            }}
                            defaultValue={cardData.length > 0 ? cardData[0].birthDate : ''}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="state"
                            name="state"
                            label="Instagram"
                            fullWidth
                            variant="outlined"
                            defaultValue={cardData.length > 0 ? cardData[0].instagram : ''}
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