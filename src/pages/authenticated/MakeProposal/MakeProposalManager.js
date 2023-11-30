import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
  styled,
  Badge,
  Snackbar,
  Alert,
  Chip
} from '@mui/material';
import {
  LocalizationProvider,
  PickersDay,
  DateCalendar
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { useNavigate, useParams } from 'react-router';
import api from '../../../services/api';
import eventPropsHelper from '../../../helpers/eventPropsHelper';
import dateHelper from '../../../helpers/dateHelper';

import { useAuth } from '../../../hooks/auth'

const image = [
  'https://s2-g1.glbimg.com/u_Sep5KE8nfnGb8wWtWB-vbBeD0=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2022/N/Q/S27GlHSKA6DAAjshAgSA/bar-paradiso.png',
]

const SmallImage = styled('img')({
  width: '200px',
  height: '200px',
  borderRadius: '50%',
  alignSelf: 'center',
  objectFit: 'cover'
});

function HighlightedDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const index = highlightedDays.map(d => d.date).indexOf(props.day.date());

  const isSelected = !props.outsideCurrentMonth && index >= 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      color='primary'
      badgeContent={isSelected ? highlightedDays[index].numberOfSchedules : undefined}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}

export default function MakeProposalManager() {
  const { userId } = useAuth();
  const { targetId } = useParams();
  const navigate = useNavigate();

  const [artist, setArtist] = useState({
    name: "",
    about: "",
    birthDate: "",
    email: "",
    instagram: "",
    phoneNumber: "",
    genres: [],
  })

  const [establishments, setEstablishments] = useState([])
  const [currentEstablishmentEvents, setCurrentEstablishmentEvents] = useState([])
  const [currentSchedules, setCurrentSchedules] = useState([])

  const [formData, setFormData] = useState({
    establishmentId: {
      value: 0,
      error: false
    },
    eventId: {
      value: 0,
      error: false
    },
    scheduleId: {
      value: 0,
      error: false
    },
    paymentValue: {
      value: eventPropsHelper.getFormattedPaymentValue(0),
      error: false
    },
    couvertCharge: {
      value: "0,00",
      error: false
    },
  });

  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "info"
})

  const [calendarValue, setCalendarValue] = useState(dayjs());
  const [calendarMonth, setCalendarMonth] = useState(dayjs().month());
  const [calendarYear, setCalendarYear] = useState(dayjs().year());

  const [perfilImage, setPerfilImage] = useState('');

  useEffect(() => {
    const getEstablishments = async () => {
      try {
        const { data } = await api.get(`/establishments/manager/${userId}`)

        console.log(data);

        setEstablishments(data.map(e => ({ text: e.establishmentName, value: e.id, events: e.events })))
      }
      catch (error) {
        console.log(error)
      }
    }
    getEstablishments()
  }, [userId])

  async function getPerfilImage(artistId) {
    try {
      var token = localStorage.getItem('@conmusic:token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await api.get(`/artists/image/perfil/${artistId}`, config);

      setPerfilImage(response.data.url);

    } catch (error) {
      console.error('Erro ao buscar imagem:', error);
    }
  }

  useEffect(() => {
    const getArtistInformation = async () => {
      try {
        const { data } = await api.get(`/artists/${targetId}`)

        setArtist({
          name: data.name,
          genres: data.musicalGenres,
          instagram: data.instagram,
          email: data.email,
          birthDate: data.birthDate,
          phoneNumber: data.phoneNumber
        })

        getPerfilImage(targetId)
      }
      catch (error) {
        console.log(error)
      }
    }
    getArtistInformation()
  }, [targetId]);

  const highlightedDays = useMemo(() => {
    if (calendarMonth == null || calendarYear == null || currentSchedules.length === 0) {
      return []
    }

    const schedulesFromMonthYear = currentSchedules
      .filter(s => dayjs(s.startDateTime).year() === calendarYear
        && dayjs(s.startDateTime).month() === calendarMonth)

    const uniqueDates = [...new Set(schedulesFromMonthYear.map(s => dayjs(s.startDateTime).date()))]

    return uniqueDates.map(date => ({
      date,
      numberOfSchedules: schedulesFromMonthYear
        .filter(s => dayjs(s.startDateTime).date() === date).length
    }))
  }, [calendarMonth, calendarYear, currentSchedules]);

  const schedulesFromDate = useMemo(() => {
    if (calendarValue == null || currentSchedules.length === 0) {
      return []
    }

    return currentSchedules
      .filter(s => dayjs(s.startDateTime).format("DD/MM/YYYY") === calendarValue.format("DD/MM/YYYY"))
      .map(s => ({
        text: `${dateHelper.getFormattedScheduleDate(s.startDateTime)} até ${dateHelper.getFormattedScheduleDate(s.endDateTime)}`,
        value: s.id
      }))
  }, [calendarValue, currentSchedules])

  const handleEstablishmentChange = useCallback((event) => {
    setFormData(prev => ({
      establishmentId: {
        value: event.target.value,
        error: false
      },
      eventId: {
        value: 0,
        error: false
      },
      scheduleId: {
        value: 0,
        error: false
      },
      paymentValue: {
        value: eventPropsHelper.getFormattedPaymentValue(0),
        error: false
      },
      couvertCharge: {
        value: "0,00",
        error: false
      },
    }))

    setCurrentSchedules([])

    if (event.target.value !== 0) {
      const index = establishments.map(e => e.value).indexOf(event.target.value)

      setCurrentEstablishmentEvents(establishments[index].events)
    }
  }, [establishments])

  const handleEventChange = useCallback(async (event) => {
    setFormData(prev => ({
      ...prev,
      eventId: {
        value: event.target.value,
        error: false
      },
      scheduleId: {
        value: 0,
        error: false
      },
      paymentValue: {
        value: eventPropsHelper.getFormattedPaymentValue(0),
        error: false
      },
      couvertCharge: {
        value: "0,00",
        error: false
      },
    }))

    if (event.target.value !== 0) {
      const index = currentEstablishmentEvents.map(e => e.id).indexOf(event.target.value)
      const currentEvent = currentEstablishmentEvents[index]

      setFormData(prev => ({
        ...prev,
        paymentValue: {
          value: eventPropsHelper.getFormattedPaymentValue(currentEvent.value),
          error: false
        },
        couvertCharge: {
          value: eventPropsHelper.getFormattedCouvertCharge(currentEvent.coverCharge),
          error: false
        },
      }))

      try {
        const { data } = await api.get(`/schedules/event/${event.target.value}`)

        console.log(data)

        setCurrentSchedules(data.map(s => ({
          id: s.id,
          startDateTime: s.startDateTime,
          endDateTime: s.endDateTime,
          confirmed: s.confirmed
        })))
      }
      catch (error) {
        console.error(error)
      }
    }
  }, [currentEstablishmentEvents])

  const handleScheduleChange = useCallback((event) => {
    setFormData(prev => ({
      ...prev,
      scheduleId: {
        value: event.target.value,
        error: false
      }
    }))
  }, [])

  const handlePaymentValueChange = useCallback((event) => {
    const value = Number(event.target.value.replace(/\D/gm, ""))

    const formatted = eventPropsHelper.getFormattedPaymentValue(value / 100);

    setFormData(prev => ({
      ...prev,
      paymentValue: {
        value: formatted,
        error: value < 20000
      }
    }))
  }, [])

  const handleCouvertChargeChange = useCallback((event) => {
    const value = Number(event.target.value.replace(/\D/gm, ""))

    const formatted = String((value / 100).toFixed(2)).replace(".", ",")

    setFormData(prev => ({
      ...prev,
      couvertCharge: {
        value: formatted,
        error: value < 0 || value > 10000
      }
    }))
  }, [])

  const handleGoBack = useCallback(() => {
    navigate(`/explore`)
  }, [navigate])

  const handleSendProposal = useCallback(async () => {
    if (formData.establishmentId.value <= 0) {
      setFormData(prev => ({
        ...prev,
        establishmentId: {
          value: formData.establishmentId.value,
          error: true
        }
      }))
      setToast({
        open: true,
        severity: "error",
        message: "Estabelecimento escolhido é inválido"
      })
      return;
    }
    
    if (formData.eventId.value <= 0) {
      setFormData(prev => ({
        ...prev,
        eventId: {
          value: formData.eventId.value,
          error: true
        }
      }))
      setToast({
        open: true,
        severity: "error",
        message: "Evento escolhido é inválido"
      })
      return;
    }
    
    if (formData.scheduleId.value <= 0) {
      setFormData(prev => ({
        ...prev,
        scheduleId: {
          value: formData.scheduleId.value,
          error: true
        }
      }))
      setToast({
        open: true,
        severity: "error",
        message: "Horário escolhido é inválido"
      })
      return;
    }

    if (formData.paymentValue.error) {
      setFormData(prev => ({
        ...prev,
        paymentValue: {
          value: formData.paymentValue.value,
          error: true
        }
      }))
      setToast({
        open: true,
        severity: "error",
        message: "Deve ser no minímo R$ 200,00"
      })
      return;
    }

    if (formData.couvertCharge.error) {
      setFormData(prev => ({
        ...prev,
        couvertCharge: {
          value: formData.couvertCharge.value,
          error: true
        }
      }))
      setToast({
        open: true,
        severity: "error",
        message: "Deve ser entre 0% e 100%"
      })
      return;
    }

    const body = {
      value: Number(formData.paymentValue.value.replace(/\D/gm, "")) / 100,
      coverCharge: Number(formData.couvertCharge.value.replace(/\D/gm, "")) / 100,
      scheduleId: formData.scheduleId.value,
      eventId: formData.eventId.value,
      artistId: targetId
    }
    
    try {
      const { data } = await api.post(`/shows`, body)

      console.log(data)

      setToast({
        open: true,
        message: "Sua proposta foi enviada com sucesso!",
        severity: "success"
      })
      setTimeout(() => {
        navigate(`/explore`)
      }, 6000)
    }
    catch (e) {
      console.error(e)
    }
  }, [formData, targetId, navigate])

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleCloseToast = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setToast({
        open: false,
        message: "",
        severity: "info"
    });
  };

  return (
    <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
      <Grid item xs={12} md={10}>
        <Paper sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: 4, gap: 1, my: 2 }}>
          <div style={{ width: '80%', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h5" component="h1" sx={{ my: 6, fontWeight: 'bold', textAlign: 'center', color: '#FB2D57' }}>
              Enviar proposta para {artist.name}
            </Typography>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} display='flex' flexDirection='column'>
                  <SmallImage src={perfilImage} alt="Profile" />
                  <Typography variant="subtitle1" mb={1} fontWeight="bold">Informações</Typography>
                  {
                    artist.instagram &&
                    (<Typography variant='body1'>@{artist.instagram}</Typography>)
                  }
                  <Typography variant='body1'>{artist.email}</Typography>
                  <Typography variant='body1'>{eventPropsHelper.getFormattedPhoneNumber(artist.phoneNumber)}</Typography>
                  {
                    artist.genres &&
                    artist.genres.length > 0 &&
                    (<>
                      <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                        Gêneros Musicais
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, flexWrap: 'wrap' }}>
                        {
                          artist.genres
                            .map((genre, i) => (<Chip sx={{ backgroundColor: i % 2 === 0 ? "#FF3E3A" : "#CC3245", color: '#F2F2F2' }} label={genre} />))
                        }
                      </Box>
                    </>)
                  }
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle1" mb={1} fontWeight="bold">
                    Estabelecimentos
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      id="establishmentId"
                      name="establishmentId"
                      value={formData.establishmentId.value}
                      onChange={handleEstablishmentChange}
                      error={formData.establishmentId.error}
                      required
                    >
                      <MenuItem value={0}>Selecionar estabelecimento</MenuItem>
                      {
                        establishments.map(e => (<MenuItem key={e.value} value={e.value}>{e.text}</MenuItem>))
                      }
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} display={formData.establishmentId.value === 0 ? "none" : "initial"}>
                  <Typography variant="subtitle1" mb={1} fontWeight="bold">
                    Eventos
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      id="eventId"
                      name="eventId"
                      value={formData.eventId.value}
                      onChange={handleEventChange}
                      error={formData.eventId.error}
                      required
                    >
                      <MenuItem value={0}>Selecionar evento</MenuItem>
                      {
                        currentEstablishmentEvents.map(e => (<MenuItem key={e.id} value={e.id}>{e.name}</MenuItem>))
                      }
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} display={formData.eventId.value === 0 ? "none" : "initial"}>
                  <Typography variant="subtitle1" mb={1} fontWeight="bold">
                    Calendário
                  </Typography>
                  <FormControl fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                      <DateCalendar
                        value={calendarValue}
                        slots={{ day: HighlightedDay }}
                        slotProps={{ day: { highlightedDays } }}
                        onChange={(newValue) => {
                          setCalendarValue(newValue)
                          setFormData(prev => ({ ...prev, scheduleId: { value: 0, error: false } }))
                        }}
                        onMonthChange={(newValue) => { setCalendarMonth(newValue.month()) }}
                        onYearChange={(newValue) => { setCalendarYear(newValue.year()) }}
                        views={['year', 'month', 'day']}
                        disablePast
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>

                <Grid item xs={12} display={formData.eventId.value === 0 ? "none" : "initial"}>
                  <Typography variant="subtitle1" mb={1} fontWeight="bold">
                    Horários do dia {calendarValue.format("DD/MM/YYYY")}
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      id="scheduleId"
                      name="scheduleId"
                      value={formData.scheduleId.value}
                      onChange={handleScheduleChange}
                      error={formData.scheduleId.error}
                      required
                    >
                      <MenuItem value={0}>Selecionar data</MenuItem>
                      {
                        schedulesFromDate.map(s => (<MenuItem key={s.value} value={s.value}>{s.text}</MenuItem>))
                      }
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} display={formData.eventId.value === 0 ? "none" : "initial"}>
                  <Typography variant="subtitle1" mb={1} fontWeight="bold">
                    Valor fixo de pagamento
                  </Typography>
                  <FormControl fullWidth>
                    <TextField
                      id="paymentValue"
                      name="paymentValue"
                      value={formData.paymentValue.value}
                      onChange={handlePaymentValueChange}
                      error={formData.paymentValue.error}
                      required
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} display={formData.eventId.value === 0 ? "none" : "initial"}>
                  <Typography variant="subtitle1" mb={1} fontWeight="bold">
                    Taxa de couvert (%)
                  </Typography>
                  <FormControl fullWidth>
                    <TextField
                      id="couvertCharge"
                      name="couvertCharge"
                      value={formData.couvertCharge.value}
                      onChange={handleCouvertChargeChange}
                      error={formData.couvertCharge.error}
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
                  onClick={handleGoBack}
                >
                  Voltar
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  sx={{ marginTop: 4 }}
                  onClick={handleSendProposal}
                >
                  Enviar
                </Button>
              </Box>
            </form>
          </div>
        </Paper>
        <Snackbar open={toast.open} autoHideDuration={6000} onClose={handleCloseToast}>
          <Alert severity={toast.severity} sx={{ width: '100%' }}>
              {toast.message}
          </Alert>
        </Snackbar>
      </Grid>
    </Grid>
  );
}