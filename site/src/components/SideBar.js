import React, { useState } from "react";
import { 
    Drawer, 
    styled, 
    Toolbar, 
    IconButton, 
    Divider, 
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from "@mui/material";
import { 
    ChevronLeft,
    Dashboard,
    Explore,
    Work,
    CalendarMonth,
    MicExternalOn,
    WorkspacePremium,
    MapsHomeWork,
    PersonPin,
    MeetingRoom
} from '@mui/icons-material'

const CustomDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
  
        width: 240,
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

export default function SideBar() {
    const [open, setOpen] = useState(true);

    const toggleDrawer = () => { setOpen(!open); };

    return (
        <CustomDrawer variant="permanent" open={open}>
            <Toolbar />
            <List component="nav" >
                <ListItemButton>
                    <ListItemIcon>
                        <Dashboard />
                    </ListItemIcon>
                <ListItemText primary="Visão Geral" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <Explore />
                    </ListItemIcon>
                    <ListItemText primary="Explorar" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <Work />
                    </ListItemIcon>
                    <ListItemText primary="Negociações" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <CalendarMonth />
                    </ListItemIcon>
                    <ListItemText primary="Agenda" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <MicExternalOn />
                    </ListItemIcon>
                    <ListItemText primary="Eventos" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <WorkspacePremium />
                    </ListItemIcon>
                    <ListItemText primary="Oportunidades" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <MapsHomeWork />
                    </ListItemIcon>
                    <ListItemText primary="Estabelecimentos" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <PersonPin />
                    </ListItemIcon>
                    <ListItemText primary="Perfil" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <MeetingRoom />
                    </ListItemIcon>
                    <ListItemText primary="Sair" />
                </ListItemButton>
                <Divider sx={{ my: 1, }} />
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    }}
                >
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeft />
                    </IconButton>
                </Toolbar>
            </List>
        </CustomDrawer>
    )
}