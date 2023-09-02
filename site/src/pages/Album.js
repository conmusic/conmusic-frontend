import React, { useState, useEffect } from 'react';
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
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems } from './listItems';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import logo from '../assets/images/logoConMusic-removebg-preview.png';
import api from '../services/api';
import { format, isAfter } from 'date-fns';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';


const style = {
  width: '100%',
  bgcolor: 'none',
};

const drawerWidth = 240;
const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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

export default function Dashboard() {
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
              establishment: obj.event.establishment.establishmentName,
              event: obj.event.name,
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
            width: '100vh',
            overflow: 'auto',

          }}
        >
          <Toolbar />

<div style={{ display: 'flex', justifyContent: 'center', margin: 0 }}>
  <Container maxWidth="sm" style={{ margin: 0, padding: 0 }}>
  <Grid container alignItems="center" justify="space-around" display= 'flex'>
  {/* Your grid items/components here */}

      <List sx={style} component="nav" aria-label="mailbox folders" style={{ display: 'flex', flexDirection: 'row' }}>
        <ListItem button style={{ marginRight: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img width="90" height="90" src="https://img.icons8.com/ios-glyphs/90/rock-music.png" alt="rock-music"/>
          <span style={{ marginTop: '8px' }}>Rock</span>
        </ListItem>

        <ListItem button style={{ marginRight: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img width="90" height="90" src="https://img.icons8.com/ios-glyphs/90/piano.png" alt="piano"/>
          <span style={{ marginTop: '8px' }}>Classica</span>
        </ListItem>
        <ListItem button style={{ marginRight: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img width="85" height="85" src="https://img.icons8.com/ios-glyphs/90/micro.png" alt="micro"/>
          <span style={{ marginTop: '8px' }}>Pop</span>
        </ListItem>
        <ListItem button style={{ marginRight: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img width="100" height="100" src="https://img.icons8.com/ios-filled/100/jazz.png" alt="jazz"/>
          <span style={{ marginTop: '8px' }}>Jazz</span>
        </ListItem>
        <ListItem button style={{ marginRight: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img width="64" height="64" src="https://img.icons8.com/pastel-glyph/64/guitar--v1.png" alt="guitar--v1"/>
          <span style={{ marginTop: '8px' }}>Sertanejo</span>
        </ListItem>
    
        {/* Repita para os outros ícones... */}
        
      </List>
    </Grid>
  </Container>
</div>
          <Container sx={{ py: 8 }} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {cards.map((card) => (
                <Grid item key={card} xs={12} sm={6} md={4}>
                  <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', }}
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        // 16:9
                        pt: '95.25%',
                      }}
                      image="https://source.unsplash.com/random?wallpapers"
                    />
         <CardContent sx={{ flexGrow: 1 }}>
  <Typography gutterBottom variant="h6" component="h2" style={{ display: "flex", alignItems: "center" , fontWeight: 'bold'}}>
    Título
    <img width="24" height="24" src="https://img.icons8.com/material/24/star--v1.png" alt="star--v1" style={{ marginLeft: "120px" }}/>
    4.0
  </Typography>
  <Typography>
    This is a media card
  </Typography>
</CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>


      </Box>
    </ThemeProvider>
  );
}   