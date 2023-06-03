import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import myImage from '../assets/images/image.png';
import myOtherImage from '../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

export default function Cadastro() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email && password) {
      if (!validateEmail(email)) {
        setErrorMessage('Email inválido. Por favor, insira um email válido.');
        return;
      }

      const data = new FormData(event.currentTarget);

      const dados = {
        email: data.get('email'),
        password: data.get('password'),
      };

      navigate('/register-two-step', { state: dados });
    } else {
      setErrorMessage('Por favor, preencha todos os campos.');
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
            position: 'relative',
          }}
        >
          <img
            src={myOtherImage}
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
            <Typography sx={{ color: '#d3d3d3 ' }} component="h1" variant="h5">
              Etapa 1 de 2
            </Typography>
            <Typography component="h1" variant="h5">
              Crie sua conta
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errorMessage.includes('Email')}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errorMessage.includes('Senha')}
              />
              {errorMessage && (
                <Typography variant="body2" color="error">
                  {errorMessage}
                </Typography>
              )}
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
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                }}
              >
                Continuar
              </Button>
              <Grid container>
                <Grid item xs>
                  Já tem uma conta?
                  <Link href="/" variant="body2">
                    Faça login
                  </Link>
                </Grid>
              </Grid>
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
