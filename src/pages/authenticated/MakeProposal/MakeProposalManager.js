import React, { useState, useEffect } from 'react';
import { 
  FormControl, 
  TextField, 
  Button, 
  Select, 
  MenuItem, 
  Grid, 
  Typography,
  Paper
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import dayjs from 'dayjs';

export default function MakeProposalArtist() {
  const [formData, setFormData] = useState({
    estabelecimento: '',
    evento: '',
    horarios: '',
    data: null,
    valores: '',
    taxaCouvert: '',
  });

  const [value, setValue] = useState(null);

  useEffect(() => {
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

  const handleDataChange = (date) => {
    setFormData({
      ...formData,
      data: date,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
      <Grid item xs={12} md={10}>
        <Paper sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: 4, gap: 1, my: 2 }}>
          <div style={{ width: '80%', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h5" component="h1" sx={{ my: 6}}>
              Insira as informações para enviar a proposta para o candidato
            </Typography>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" component="h6">
                    Estabelecimento
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
                <Grid item xs={12}>
                  <Typography variant="subtitle1" component="h6">
                    Calendário
                  </Typography>
                  <FormControl fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <StaticDatePicker
                        displayStaticWrapperAs="desktop"
                        openTo="day"
                        value={value}
                        onChange={(newValue) => {
                          handleDataChange(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" component="h6">
                    Horários Cadastrados
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      id="horarios"
                      name="horarios"
                      value={formData.horarios}
                      onChange={handleChange}
                      required
                    >
                      <MenuItem value="horarios1">Horários 1</MenuItem>
                      <MenuItem value="horarios2">Horários 2</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
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
                <Grid item xs={12}>
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
              </Grid>
              <Button type="submit" variant="contained" color="primary" style={{ marginTop: '1rem' }}>
                Enviar
              </Button>
            </form>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
}