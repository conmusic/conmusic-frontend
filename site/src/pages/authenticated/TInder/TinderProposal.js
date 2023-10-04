import React, { useState, useEffect  } from 'react';
import { FormControl, TextField, Button, Select, MenuItem, InputLabel, Grid, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import dayjs from 'dayjs';

function Formulario() {
  const [formData, setFormData] = useState({
    nome: '',
    evento: '',
    data: '',
    horaInicio: '',
    horaFim: '',
    valores: '',
    taxaCouvert: '',
  });
  
  const [value, setValue] = useState(null); // Inicialmente, não definimos uma data

  useEffect(() => {
    // Defina a data atual quando o componente for montado
    const dataAtual = dayjs();
    setValue(dataAtual);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Faça algo com os dados do formulário, como enviá-los para o servidor.
    console.log(formData);
  };

  return (
    <div style={{ width: '80%', margin: '0 auto', display: 'flex' }}>
      <form onSubmit={handleSubmit} style={{ flexDirection: 'row'}}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
              <Typography variant="subtitle1" component="h6">
                  Estabeleciemento
              </Typography>
            <FormControl fullWidth>
              <Select
                id="estabelecimento"
                name="estabelecimento"
                value={formData.estabelecimento}
                onChange={handleChange}
                required
              >
              <MenuItem value="estabelecimento1">Estabelecimento 1</MenuItem>
              <MenuItem value="estabelecimento2">Estabelecimento 2</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
              <Typography variant="subtitle1" component="h6">
                  Evento
              </Typography>
            <FormControl fullWidth>
              <Select
                id="evento"
                name="evento"
                value={formData.evento}
                onChange={handleChange}
                required
              >
                <MenuItem value="evento1">Evento 1</MenuItem>
                <MenuItem value="evento2">Evento 2</MenuItem>
              </Select>
            </FormControl>
          </Grid>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticDatePicker
            displayStaticWrapperAs="desktop"
            openTo="day"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Grid>
      <Grid alignItems={'end'}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle1" component="h6">
              Hora de Início
            </Typography>
            <FormControl fullWidth>
              <TextField
                id="horaInicio"
                name="horaInicio"
                type="time"
                value={formData.horaInicio}
                onChange={handleChange}
                required
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} alignSelf={'end'}>
            <Typography variant="subtitle1" component="h6">
              Hora de Término
            </Typography>
            <FormControl fullWidth>
              <TextField
                id="horaFim"
                name="horaFim"
                type="time"
                value={formData.horaFim}
                onChange={handleChange}
                required
              />
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
          <Grid item xs={6}>
              <Typography variant="subtitle1" component="h6">
                  Valores
              </Typography>
            <FormControl fullWidth>
              <TextField
                id="valores"
                name="valores"
                type="number"
                value={formData.valores}
                onChange={handleChange}
                required
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
              <Typography variant="subtitle1" component="h6">
                  Taxa de Couvert
              </Typography>
            <FormControl fullWidth>
              <TextField
                id="taxaCouvert"
                name="taxaCouvert"
                type="number"
                value={formData.taxaCouvert}
                onChange={handleChange}
                required
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Enviar
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default Formulario;
