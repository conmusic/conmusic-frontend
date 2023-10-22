import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAuth } from '../hooks/auth';

import myImage from '../assets/images/image.png';
import myOtherImage from '../assets/images/logo.png';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    if (formData.get('email') === '' || formData.get('password') === '') {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    try {
      await login({ email: formData.get('email'), password: formData.get('password') })

      navigate('/dashboard');
    } catch (error) {
      if (error.response.status === 403) {
        setErrorMessage("Email e/ou Senha inválida!")
      } else {
        setErrorMessage("Erro desconhecido")
      }
    }
  }, [login, navigate]);

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>      
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
            />
            {(errorMessage && errorMessage !== '') && (
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
            >
              Entrar
            </Button>
            <Button
              fullWidth
              variant="contained"
              onClick={() => { navigate('/register') }}
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
  );
}

