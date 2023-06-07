import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
  Radio,
  RadioGroup
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import myImage from '../assets/images/image.png';
import myOtherImage from '../assets/images/logo.png';
import { useNavigate, useLocation } from 'react-router';
import api from '../services/api';

const theme = createTheme();

export default function CadastroDois() {
  const [typeUser, setTypeUser] = useState('');
  const [cpfError, setCpfError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [dateError, setDateError] = useState(false);

  const handleRadioChange = (event) => {
    setTypeUser(event.target.value);
  };

  function register(body) {
    const baseURL = typeUser === 'artists' ? '/artists' : '/managers';

    api.post(baseURL, body)
      .then((response) => {
        console.log("Registrado com sucesso!" + response.data);
        navigateToLogin();
      }).catch((error) => {
        console.log(error);
      });
  }

  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate('/login');
  };

  const location = useLocation();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    var partes = data.get('dataNasci').split('/');
    var date = partes[2] + '-' + partes[1] + '-' + partes[0];
    var cpf = data.get('CPF').replace(/\D/g, "");
    var phoneNumber = data.get('PhoneNumber').replace(/\D/g, "");

    const body = {
      name: data.get('nome'),
      email: location.state.email,
      password: location.state.password,
      cpf: cpf,
      phoneNumber: phoneNumber,
      birthDate: date
    }

    register(body);
  };

  const validateCPF = (event) => {
    const cpf = event.target.value.replace(/\D/g, "");
    const isValidCPF = /^[0-9]{11}$/.test(cpf);

    setCpfError(!isValidCPF);
  };

  const validatePhoneNumber = (event) => {
    const phoneNumber = event.target.value.replace(/\D/g, "");
    const isValidPhoneNumber = /^[0-9]{10,11}$/.test(phoneNumber);

    setPhoneError(!isValidPhoneNumber);
  };

  const validateDate = (event) => {
    const date = event.target.value;
    const isValidDate = /^\d{2}\/\d{2}\/\d{4}$/.test(date);

    setDateError(!isValidDate);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={5}
          md={6.4}
          sx={{
            backgroundImage: `url(${myImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative', // Adiciona a propriedade de posição
          }}        >
          <img
            src={myOtherImage} // Substitua "myOtherImage" pelo caminho da sua outra imagem
            alt="Outra imagem"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </Grid>
        <Grid item xs={12} sm={8} md={5.6} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 10,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{ color: '#d3d3d3 ' }}
              component="h1" variant="h5">
              Etapa 2 de 2
            </Typography>
            <Typography component="h1" variant="h5">
              Crie sua conta
            </Typography>
            <Typography component="h1" variant="h5" style={{ marginRight: 'auto', marginTop: '5px' }}>
              Profissão
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={handleRadioChange}
              >
                <FormControlLabel value="artists" control={<Radio color='error' />} label="Artista" />
                <FormControlLabel value="house" control={<Radio color='error' />} label="Gerente de casa de show" />
              </RadioGroup>
              <TextField
                margin="normal"
                required
                fullWidth
                id="nome"
                label="Nome"
                name="nome"
                autoComplete="nome"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="CPF"
                label="CPF"
                type="text"
                id="CPF"
                autoComplete="off"
                inputProps={{
                  maxLength: 14,
                  pattern: "\d{3}\.\d{3}\.\d{3}-\d{2}",
                }}
                onChange={(event) => {
                  const { value } = event.target;
                  event.target.value = value
                    .replace(/\D/g, "")
                    .replace(/(\d{3})(\d)/, "$1.$2")
                    .replace(/(\d{3})(\d)/, "$1.$2")
                    .replace(/(\d{3})(\d{2})$/, "$1-$2");
                }}
                onBlur={validateCPF}
                error={cpfError}
                helperText={cpfError ? "CPF inválido" : ""}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="PhoneNumber"
                label="Número de telefone"
                type="PhoneNumber"
                id="PhoneNumber"
                autoComplete="off"
                inputProps={{
                  maxLength: 15,
                  pattern: "\d{2} \d{5}-\d{4}",
                }}
                onChange={(event) => {
                  const { value } = event.target;
                  event.target.value = value
                    .replace(/\D/g, "")
                    .replace(/(\d{2})(\d)/, "($1) $2")
                    .replace(/(\d{5})(\d)/, "$1-$2");
                }}
                onBlur={validatePhoneNumber}
                error={phoneError}
                helperText={phoneError ? "Número de telefone inválido" : ""}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="dataNasci"
                label="Data de nascimento"
                type="text"
                id="date"
                autoComplete="off"
                inputProps={{
                  maxLength: 10,
                  pattern: "\d{2}/\d{2}/\d{4}",
                }}
                onChange={(event) => {
                  const { value } = event.target;
                  event.target.value = value
                    .replace(/\D/g, "")
                    .replace(/(\d{2})(\d)/, "$1/$2")
                    .replace(/(\d{2})(\d)/, "$1/$2");
                }}
                onBlur={validateDate}
                error={dateError}
                helperText={dateError ? "Data de nascimento inválida" : ""}
              />
              <FormControlLabel
                required
                control={<Checkbox value="termos" color="primary" />}
                label="Aceito os termos de segurança"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={() => { navigate('/dashboard') }}
                sx={{
                  '&:hover': {
                    backgroundColor: 'black',
                  },
                  mt: 3,
                  mb: 2,
                  backgroundColor: 'red',
                  border: '1px solid black',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                }}
              >
                Cadastrar
              </Button>
              <Typography variant="body2" color="text.secondary" align="center">
                {'© '}
                {new Date().getFullYear()}
                {'.'}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}


