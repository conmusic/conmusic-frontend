import React, { useEffect } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Title from './Title';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems } from './listItems';
import DepositsEstablishment from './DepositsEstablishment';
import OrdersEstablishment from './OrdersEstablishment';
import logo from '../assets/images/logoConMusic-removebg-preview.png';
import api from '../services/api';
import { format, isAfter } from 'date-fns';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,

    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
    boxShadow: 'none',
    borderBottom: '1px solid #ccc',
}));

const theme = createTheme({
    components: {
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    color: '#fb2b57', // Defina a cor desejada para os ícones
                },
            },
        },
    },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',

            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',

            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const defaultTheme = createTheme();

export default function DashboardEstablishment() {
    const [open, setOpen] = React.useState(true);
    const [cardData, setCardData] = React.useState([]);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    useEffect(() => {
        const fetchCardData = async () => {
            try {
                var token = localStorage.getItem('@conmusic:token');
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };
                const response = await api.get('/shows/confirmed', config);
                var card = response.data
                    .filter(obj => isAfter(new Date(obj.schedule.startDateTime), new Date()))
                    .map(obj => {
                        let showDate = format(new Date(obj.schedule.startDateTime), "dd/MM/yyyy");
                        let showStartDateTime = format(new Date(obj.schedule.startDateTime), "HH:mm");
                        let showEndDateTime = format(new Date(obj.schedule.endDateTime), "HH:mm");

                        return {
                            artist: obj.artist.name,
                            event: obj.artist.name,
                            date: showDate,
                            time: `${showStartDateTime} - ${showEndDateTime}`,
                        }
                    })
                setCardData(card);
            } catch (error) {
                console.error('Erro ao buscar os dados dos cards:', error);
            }
        };

        fetchCardData();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex', }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            backgroundColor: "white",
                            pr: '24px',
                        }}
                    >
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1, }}
                        >
                            <a href="/#" className="nav__logo">
                                <img src={logo} alt="" className="nav__logo-img" />
                            </a>
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        {mainListItems}
                        <Divider sx={{ my: 1, }} />
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Title>Shows Confirmados</Title>
                        <Grid container spacing={3}>
                            {/* Recent Deposits */}
                            <Grid item xs={12} md={4} lg={3}>
                                {cardData.length > 0 && (
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: 310,
                                        }}
                                    >
                                        <DepositsEstablishment
                                            artista={cardData[0].artist}
                                            evento={cardData[0].event}
                                            dataDoShow={cardData[0].date}
                                            horarioMarcado={cardData[0].time}
                                        />
                                    </Paper>
                                )}
                            </Grid>
                            <Grid item xs={12} md={4} lg={3}>
                                {/* Conteúdo da Card */}
                                {cardData.length > 1 && (
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: 310,
                                        }}
                                    >
                                        <DepositsEstablishment
                                            artista={cardData[1].artist}
                                            evento={cardData[1].event}
                                            dataDoShow={cardData[1].date}
                                            horarioMarcado={cardData[1].time}
                                        />
                                    </Paper>
                                )}
                            </Grid>
                            <Grid item xs={12} md={4} lg={3}>
                                {/* Conteúdo da Card */}
                                {cardData.length > 2 && (
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: 310,
                                        }}
                                    >
                                        <DepositsEstablishment
                                            artista={cardData[2].artist}
                                            evento={cardData[2].event}
                                            dataDoShow={cardData[2].date}
                                            horarioMarcado={cardData[2].time}
                                        />
                                    </Paper>
                                )}
                            </Grid>
                            <Grid item xs={12} md={4} lg={3}>
                                {/* Conteúdo da Card */}
                                {cardData.length > 3 && (
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: 310,
                                        }}
                                    >
                                        <DepositsEstablishment
                                            artist={cardData[3].artist}
                                            evento={cardData[3].event}
                                            dataDoShow={cardData[3].date}
                                            horarioMarcado={cardData[3].time}
                                        />
                                    </Paper>
                                )}

                            </Grid>
                            {/* Recent Orders */}
                            <Grid item xs={12}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                    <OrdersEstablishment />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}   