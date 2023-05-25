import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ExploreIcon from '@mui/icons-material/Explore';
import WorkIcon from '@mui/icons-material/Work';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import MicExternalOnIcon from '@mui/icons-material/MicExternalOn';
import PersonPinIcon from '@mui/icons-material/PersonPin';



export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Visão Geral" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ExploreIcon />
      </ListItemIcon>
      <ListItemText primary="Explorar" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <WorkIcon />
      </ListItemIcon>
      <ListItemText primary="Negociações" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <CalendarMonthIcon />
      </ListItemIcon>
      <ListItemText primary="Agenda" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <MicExternalOnIcon />
      </ListItemIcon>
      <ListItemText primary="Eventos" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <WorkspacePremiumIcon />
      </ListItemIcon>
      <ListItemText primary="Oportunidades" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <MapsHomeWorkIcon />
      </ListItemIcon>
      <ListItemText primary="Estabelecimentos" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PersonPinIcon />
      </ListItemIcon>
      <ListItemText primary="Perfil" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <MeetingRoomIcon />
      </ListItemIcon>
      <ListItemText primary="Sair" />
    </ListItemButton>
  </React.Fragment>
);

