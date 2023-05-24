import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CssBaseline from '@mui/material/CssBaseline';
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import myImage from '../assets/images/image.png';
import myOtherImage from '../assets/images/logo.png'
import { useNavigate } from 'react-router-dom';


const theme = createTheme();

export default function CadastroDois() {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),

    });
    navigate('/');
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
          }}
        >
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


            <Box  component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1}}>
            <Grid container spacing={33}>
    <Grid item>
      <FormControlLabel
        control={<Checkbox value="artita" color="primary" />}
        label="Artista"
      />
    </Grid>
    <Grid item>
      <FormControlLabel
        control={<Checkbox value="casa" color="primary" />}
        label="Gerente de casa de show"
      />
    </Grid>
  </Grid>

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
                type="CPF"
                id="CPF"
                autoComplete="current-cpf"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="dataNasci"
                label="Data de nascimento"
                // type="date"
                id="date"
                autoComplete="bday"
              />
              <FormControlLabel
                control={<Checkbox value="termos" color="primary" />}
                label="Aceito os termos de segurança"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
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
                Continuar
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
