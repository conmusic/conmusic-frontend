import React, { useState, useEffect } from 'react';
import {
    Container,
    Grid,
    Paper,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    OutlinedInput,
    useTheme,
    Typography
} from '@mui/material';
import {
    CartesianGrid,
    Label,
    Line,
    LineChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
} from 'recharts';
import { BarChart } from '@mui/x-charts/BarChart';

import api from '../../../services/api';

import Title from '../../../components/Title';
import CardAdmin from '../../../components/CardAdmin';
import dateHelper from '../../../helpers/dateHelper';
import styled from 'styled-components';

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

export default function DashboardAdmin() {
    const theme = useTheme();

    const [period, setPeriod] = useState(7)
    const [kpi, setKpi] = useState({
        proposals: {
            total: 0,
            byArtist: 0,
            byManager: 0 
        },
        negotiations: {
            total: 0,
            byArtist: 0,
            byManager: 0 
        },
        confirmed: {
            total: 0,
            byArtist: 0,
            byManager: 0 
        },
        concluded: {
            total: 0,
            byArtist: 0,
            byManager: 0 
        },
        canceled: {
            total: 0,
            byArtist: 0,
            byManager: 0 
        },
    })
    const [genreChartData, setGenreChartData] = useState([])
    const [eventsChartData, setEventChartData] = useState([])
    const [valuesChartData, setValuesChartData] = useState([])

    useEffect(() => {
        const getKpi = async () => {
            try {
                const { data } = await api.get(`/admins/kpis?lastDays=${period}`)

                let formattedData = {}

                for (const element of data) {
                    formattedData[element.category] = {
                        total: element.total,
                        byArtist: element.byArtist,
                        byManager: element.byManager,
                    }
                }

                setKpi(formattedData)
            }
            catch (e) {
                console.error(e)
            }
        }

        const getGenreChartData = async () => {
            try {
                const { data, status } = await api.get(`/admins/genres-chart?lastDays=${period}`)

                if (status === 200) {
                    setGenreChartData(data)
                }

                if (status === 204) {
                    setGenreChartData([])
                }
            }
            catch (e) {
                console.error(e)
            }
        }

        const getEventChartData = async () => {
            try {
                const { data, status } = await api.get(`/admins/events-chart?lastDays=${period}`)

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
                const { data, status } = await api.get(`/admins/value-chart?lastDays=${period}`)

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
        getGenreChartData()
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
                            <CardAdmin sx={{ height: '50%' }} valor={kpi.proposals.total} />
                            <CenteredTypography component="p">Por artistas: {kpi.proposals.byArtist}</CenteredTypography>
                            <CenteredTypography component="p">Por gerentes: {kpi.proposals.byManager}</CenteredTypography>
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
                            <CardAdmin sx={{ height: '50%' }} valor={kpi.negotiations.total} />
                            <CenteredTypography component="p">Por artistas: {kpi.negotiations.byArtist}</CenteredTypography>
                            <CenteredTypography component="p">Por gerentes: {kpi.negotiations.byManager}</CenteredTypography>
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
                            <CardAdmin sx={{ height: '50%' }} valor={kpi.confirmed.total} />
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
                            <CardAdmin sx={{ height: '50%' }} valor={kpi.canceled.total} />
                            <CenteredTypography component="p">Por artistas: {kpi.canceled.byArtist}</CenteredTypography>
                            <CenteredTypography component="p">Por gerentes: {kpi.canceled.byManager}</CenteredTypography>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
            <Grid container spacing={3}>
                {
                    genreChartData.length > 0
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
                                <Title>Gêneros Musicais que mais Tiveram Shows</Title>
                                <BarChart
                                    dataset={genreChartData}
                                    yAxis={[{ scaleType: 'band', dataKey: 'genre' }]}
                                    series={[{ dataKey: 'count', valueFormatter, color: "#FF3E3A" }]}
                                    layout="horizontal"
                                    {...chartSetting}
                                />

                            </Paper>
                        </Grid>
                    )
                }
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
                        <Grid item 
                            xs={genreChartData.length > 0 && eventsChartData.length > 0 ? 12 : 6}
                            md={genreChartData.length > 0 && eventsChartData.length > 0 ? 12 : 6} 
                            lg={genreChartData.length > 0 && eventsChartData.length > 0 ? 12 : 6}
                        >
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