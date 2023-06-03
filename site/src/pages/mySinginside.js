import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CssBaseline from '@mui/material/CssBaseline';
import myImage from '../assets/images/image.png';
import myOtherImage from '../assets/images/logo.png';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

export default function SignInSide() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    // Lógica de validação e autenticação aqui
    if (email === 'user@example.com' && password === 'password') {
      // Sucesso no login
      setErrorMessage('');
      // Redirecionar ou realizar outras ações
    } else {
      // Falha no login
      setErrorMessage('Credenciais inválidas. Por favor, tente novamente.');
    }
  };

  const navigate = useNavigate();
  function login(email, password) {
    const body = {
      email: email,
      password: password,
    };

    api
      .post('/users/authentication', body)
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    login(data.get('email'), data.get('password'));
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Email inválido. Por favor, insira um email válido.');
    } else {
      setErrorMessage('');
    }
  };

  const validatePassword = () => {
    if (password.length < 6) {
      setErrorMessage('A senha deve ter pelo menos 6 caracteres.');
    } else {
      setErrorMessage('');
    }
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
            <Avatar sx={{ m: 1, bgcolor: 'red' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Faça seu login
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
                onBlur={validateEmail} // Adiciona a função de validação no evento onBlur
                error={errorMessage !== ''}
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
                onBlur={validatePassword} // Adiciona a função de validação no evento onBlur
                error={errorMessage !== ''}
              />
              {errorMessage && (
                <Typography variant="body2" color="error" sx={{ mb: 1 }}>
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
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                }}
                onClick={handleLogin}
              >
                Entrar
              </Button>
              <Button
                fullWidth
                variant="contained"
                href="/cadastro"
                sx={{
                  '&:hover': {
                    backgroundColor: 'black',
                    color: 'white'
                  },
                  mb: 2,
                  backgroundColor: 'white',
                  color: 'black',
                  border: '1px solid black'
                }}
              >
                Cadastrar
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Esqueceu a senha?
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

