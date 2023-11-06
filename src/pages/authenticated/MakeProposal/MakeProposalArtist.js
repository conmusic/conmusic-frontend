import React, { useState, useEffect } from 'react';
import {
  FormControl,
  TextField,
  Button,
  Select,
  MenuItem,
  Grid,
  Typography,
  Paper,
  Box,
  styled
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import dayjs from 'dayjs';
import { useParams } from 'react-router';
import api from '../../../services/api';
import eventPropsHelper from '../../../helpers/eventPropsHelper';

const image = [
  'https://s2-g1.glbimg.com/u_Sep5KE8nfnGb8wWtWB-vbBeD0=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2022/N/Q/S27GlHSKA6DAAjshAgSA/bar-paradiso.png',
]

const SmallImage = styled('img')({
  width: '200px',
  height: '200px',
  borderRadius: '50%',
  alignSelf: 'center'
});

export default function MakeProposalArtist() {
  const { targetId } = useParams();

  const [event, setEvent] = useState({
    establishmentName: "",
    genre: "",
    address: {
      address: "",
      city: "",
      state: "",
      zipCode: "",
    },
    eventName: ""
  })

  const [formData, setFormData] = useState({
    scheduleId: 0,
    paymentValue: 0,
    coverCharge: 0,
  });

  const [calendarValue, setCalendarValue] = useState(dayjs());

  useEffect(() => {
    const getEventInformation = async () => {
      try {
        const { data } = await api.get(`/events/${targetId}`)

        console.log(data);

        setEvent({
          establishmentName: data.establishment.fantasyName,
          genre: data.genre.name,
          address: {
            address: data.establishment.address,
            city: data.establishment.city,
            state: data.establishment.state,
            zipCode: data.establishment.zipCode,
          },
          eventName: data.name
        })
        setFormData(prev => ({
          ...prev,
          paymentValue: data.value,
          coverCharge: data.coverCharge
        }))
      }
      catch (error) {
        console.log(error)
      }
    }

    getEventInformation()
  }, [targetId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDataChange = (date) => {
    setCalendarValue(date)
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
            <Typography variant="h5" component="h1" sx={{ my: 6, fontWeight: 'bold', textAlign: 'center', color: '#FB2D57' }}>
              Enviar proposta para {event.eventName}
            </Typography>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} display='flex' flexDirection='column'>
                  <SmallImage src={image[0]} alt="Profile" />
                  <Typography variant="subtitle1" mb={1} fontWeight="bold">Local</Typography>
                  <Typography variant="body1">{event.establishmentName}</Typography>
                  <Typography variant="body1">{eventPropsHelper.getFormattedAddress(event.address)}</Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle1" mb={1} fontWeight="bold">
                    Calendário
                  </Typography>
                  <FormControl fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <StaticDatePicker
                        displayStaticWrapperAs="desktop"
                        openTo="day"
                        value={calendarValue}
                        onChange={(newValue) => {
                          handleDataChange(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle1" mb={1} fontWeight="bold">
                    Horários do dia {"05/11/20223"}
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      id="scheduleId"
                      name="scheduleId"
                      value={formData.scheduleId}
                      onChange={handleChange}
                      required
                    >
                      <MenuItem value={0}>Selecionar data</MenuItem>
                      <MenuItem value={1}>Horários 1</MenuItem>
                      <MenuItem value={2}>Horários 2</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" mb={1} fontWeight="bold">
                    Valor fixo de pagamento
                  </Typography>
                  <FormControl fullWidth>
                    <TextField
                      id="paymentValue"
                      name="paymentValue"
                      type="number"
                      value={formData.paymentValue}
                      onChange={handleChange}
                      required
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" mb={1} fontWeight="bold">
                    Taxa de couvert (%)
                  </Typography>
                  <FormControl fullWidth>
                    <TextField
                      id="coverCharge"
                      name="coverCharge"
                      type="number"
                      value={formData.coverCharge}
                      onChange={handleChange}
                      required
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Box sx={{ width: 1, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                <Button
                  variant="contained"
                  color="error"
                  sx={{ marginTop: 4 }}
                >
                  Cancelar
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  sx={{ marginTop: 4 }}
                >
                  Enviar
                </Button>
              </Box>
            </form>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
}