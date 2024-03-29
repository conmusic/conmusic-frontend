import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Box,
  Typography,
  Select,
  OutlinedInput,
  MenuItem,
  InputLabel,
  FormControl,
  useTheme
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { BarChart } from '@mui/x-charts/BarChart';
import Title from '../../../components/Title';
import CardAdmin from '../../../components/CardAdmin';
import styled from 'styled-components';
import api from '../../../services/api';
import eventPropsHelper from '../../../helpers/eventPropsHelper';
import dateHelper from '../../../helpers/dateHelper';

const CenteredTypography = styled(Typography)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
`;

const chartSetting = {
  xAxis: [
    {
      label: 'Shows Realizados',
    },
  ],
  height: 320,
};

const valueFormatter = (value) => `${value} Shows`;

export default function BiArtist() {
  const theme = useTheme();

  const [period, setPeriod] = useState(7)
  const [kpi, setKpi] = useState({
    receivedProposals: 0,
    negotiations: 0,
    negotiationsByYou: 0,
    confirmed: 0,
    percentageConfirmed: 0.0,
    canceled: 0,
    percentageCanceled: 0.0,
  })
  const [eventsChartData, setEventChartData] = useState([])
  const [valuesChartData, setValuesChartData] = useState([])

  useEffect(() => {
    const getKpi = async () => {
      try {
        const { data } = await api.get(`/managers/kpis?lastDays=${period}`)

        setKpi({
          receivedProposals: data.receivedProposals,
          negotiations: data.negotiations,
          negotiationsByYou: data.negotiationsStartedByYou,
          confirmed: data.confirmed,
          percentageConfirmed: Number(data.percentageConfirmed.toFixed(2)),
          canceled: data.canceled,
          percentageCanceled: Number(data.percentageCanceled.toFixed(2)),
        })
      }
      catch (e) {
        console.error(e)
      }
    }

    const getEventChartData = async () => {
      try {
        const { data, status } = await api.get(`/managers/events-chart?lastDays=${period}`)

        if (status === 200) {
          setEventChartData(data)
        }

        if (status === 204) {
          setEventChartData([])
        }
      }
      catch (e) {
        console.error(e)
      }
    }

    const getValuesChartData = async () => {
      try {
        const { data, status } = await api.get(`/managers/value-chart?lastDays=${period}`)

        if (status === 200) {
          setValuesChartData(data.map(d => ({
            date: dateHelper.getDate(d.date),
            count: d.count
          })))
        }

        if (status === 204) {
          setValuesChartData([])
        }
      }
      catch (e) {
        console.error(e)
      }
    }

    getKpi()
    getEventChartData()
    getValuesChartData()
  }, [period])

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

      <Title>Desempenho</Title>
      <Paper
        sx={{
          padding: 2,
          width: '50%',
          marginTop: 2,
          marginBottom: 2
        }}
      >
        <FormControl sx={{ width: '100%' }}>
          <InputLabel id='chart-period-label'>Período</InputLabel>
          <Select
            id='chart-period'
            labelId='chart-period-label'
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            input={<OutlinedInput id="select-period" label="Período" />}
          >
            <MenuItem value={7}>Últimos 7 dias</MenuItem>
            <MenuItem value={14}>Últimos 14 dias</MenuItem>
            <MenuItem value={21}>Últimos 21 dias</MenuItem>
            <MenuItem value={30}>Últimos 30 dias</MenuItem>
          </Select>
        </FormControl>
      </Paper>
      <Box>
        <Grid container spacing={3} flexWrap={'nowrap'}>
          {/* Recent CardAdmin */}
          <Grid item xs={12} md={4} lg={4}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 200,
                marginBottom: 3,
                width: "auto"
              }}
            >

              <Typography component="p" fontWeight="bold">Propostas Recebidas:</Typography>
              <CardAdmin sx={{ height: '50%' }} valor={kpi.receivedProposals} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 200,
                marginBottom: 3,
                width: "auto"
              }}
            >
              <Typography component="p" fontWeight="bold">Negociações iniciadas</Typography>
              <CardAdmin sx={{ height: '50%' }} valor={kpi.negotiations} />
              <CenteredTypography component="p">Por você: {kpi.negotiationsByYou}</CenteredTypography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 200,
                marginBottom: 3,
                width: "auto"
              }}
            >
              <Typography component="p" fontWeight="bold">Shows Confirmados</Typography>
              <CardAdmin
                sx={{ height: '50%' }}
                valor={eventPropsHelper.getFormattedCouvertCharge(kpi.percentageConfirmed)}
              />
              <CenteredTypography component="p">Total de confirmados: {kpi.confirmed}</CenteredTypography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 200,
                marginBottom: 3,
                width: "auto"

              }}
            >

              <Typography component="p" fontWeight="bold">Shows Cancelados</Typography>
              <CardAdmin
                sx={{ height: '50%' }}
                valor={eventPropsHelper.getFormattedCouvertCharge(kpi.percentageCanceled)}
              />
              <CenteredTypography component="p">Total de cancelados: {kpi.canceled}</CenteredTypography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={3}>
        {
          eventsChartData.length > 0
          &&
          (
            <Grid item xs={12} md={6} lg={6}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 350,
                }}
              >
                <Title>Eventos com mais Propostas Recebidas</Title>
                <BarChart
                  dataset={eventsChartData}
                  yAxis={[{ scaleType: 'band', dataKey: 'eventName' }]}
                  series={[{ dataKey: 'count', label: 'Propostas Recebidas', valueFormatter, color: '#2D75FB' }]}
                  layout="horizontal"
                  {...chartSetting}
                />

              </Paper>
            </Grid>
          )
        }
        {
          valuesChartData.length > 0
          &&
          (
            <Grid item xs={6} md={6} lg={6}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: 350,
                }}
              >
                <Title>Valor total recebido para todos shows em período</Title>

                <ResponsiveContainer width="100%" height={200} >
                  <LineChart
                    data={valuesChartData}
                    margin={{
                      top: 16,
                      right: 16,
                      bottom: 0,
                      left: 24,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      stroke={theme.palette.text.secondary}
                      style={theme.typography.body2}
                    />
                    <YAxis
                      stroke={theme.palette.text.secondary}
                      style={theme.typography.body2}
                    >
                      <Label
                        angle={270}
                        position="left"
                        style={{
                          textAnchor: 'middle',
                          fill: theme.palette.text.primary,
                          ...theme.typography.body1,
                        }}
                      >
                        Rentabilidade
                      </Label>
                    </YAxis>
                    <Tooltip />
                    <Line
                      isAnimationActive={true}
                      type="monotone"
                      dataKey="count"
                      stroke="#2D75FB"
                      strokeWidth={2}
                      dot={{ stroke: "#2D75FB", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 8 }}
                      name="Rentabilidade Mensal"
                    />
                  </LineChart>
                </ResponsiveContainer>

              </Paper>
            </Grid>
          )
        }
      </Grid>
    </Container>
  );
}