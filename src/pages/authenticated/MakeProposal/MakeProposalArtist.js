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
  Alert
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
  alignSelf: 'center'
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

export default function MakeProposalArtist() {
  const { userId } = useAuth();
  const { targetId } = useParams();
  const navigate = useNavigate()

  const [event, setEvent] = useState({
    establishmentName: "",
    genre: "",
    address: {
      address: "",
      city: "",
      state: "",
      zipCode: "",
    },
    eventName: "",
    schedules: []
  })

  const [formData, setFormData] = useState({
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
          eventName: data.name,
          schedules: data.schedules
        })
        setFormData(prev => ({
          ...prev,
          paymentValue: {
            value: eventPropsHelper.getFormattedPaymentValue(data.value),
            error: false
          },
          couvertCharge: {
            value: String((data.coverCharge || 0.00).toFixed(2)).replace(".", ","),
            error: false
          }
        }))
      }
      catch (error) {
        console.log(error)
      }
    }

    getEventInformation()
  }, [targetId]);

  const highlightedDays = useMemo(() => {
    if (calendarMonth == null || calendarYear == null
      || event.schedules == null || event.schedules.length === 0) {
      return []
    }

    const schedulesFromMonthYear = event.schedules
      .filter(s => dayjs(s.startDateTime).year() === calendarYear
        && dayjs(s.startDateTime).month() === calendarMonth)

    const uniqueDates = [...new Set(schedulesFromMonthYear.map(s => dayjs(s.startDateTime).date()))]

    return uniqueDates.map(date => ({
      date,
      numberOfSchedules: schedulesFromMonthYear
        .filter(s => dayjs(s.startDateTime).date() === date).length
    }))
  }, [calendarMonth, calendarYear, event]);

  const schedulesFromDate = useMemo(() => {
    if (calendarValue == null || event.schedules == null || event.schedules.length == 0) {
      return []
    }

    return event.schedules
      .filter(s => dayjs(s.startDateTime).format("DD/MM/YYYY") == calendarValue.format("DD/MM/YYYY"))
      .map(s => ({
        text: `${dateHelper.getFormattedScheduleDate(s.startDateTime)} até ${dateHelper.getFormattedScheduleDate(s.endDateTime)}`,
        value: s.id
      }))
  }, [calendarValue, event.schedules])

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
    navigate(`/explore/${targetId}`)
  }, [navigate, targetId])

  const handleSendProposal = useCallback(async () => {
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
      eventId: targetId,
      artistId: userId
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
  }, [formData, targetId, userId])

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

                <Grid item xs={12}>
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
                <Grid item xs={12}>
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
                <Grid item xs={12}>
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