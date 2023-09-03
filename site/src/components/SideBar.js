import React, { useCallback, useState } from "react";
import { 
    Drawer, 
    styled, 
    Toolbar, 
    IconButton, 
    Divider, 
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Tooltip
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

import SideBarOption from "./SideBarOption";

import { useAuth } from '../hooks/auth';
import { useNavigate } from "react-router";

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
    const { logout } = useAuth();
    const navigate = useNavigate();

    const [currentMenu, setCurrentMenu] = useState("Visão Geral");
    const [open, setOpen] = useState(true);

    const toggleDrawer = () => { setOpen(!open); };

    const endSession = useCallback(() => {
        logout()
        navigate('/')
    }, [navigate, logout])

    return (
        <CustomDrawer variant="permanent" open={open}>
            <Toolbar />
            <List component="nav" >
                <SideBarOption 
                    isVisible={true} 
                    text={"Visão Geral"} 
                    currentMenu={currentMenu} 
                    setCurrentMenu={setCurrentMenu} 
                    icon={Dashboard} 
                    destination={"/dashboard"} 
                />
                <SideBarOption 
                    isVisible={true} 
                    text={"Explorar"} 
                    currentMenu={currentMenu} 
                    setCurrentMenu={setCurrentMenu} 
                    icon={Explore} 
                    destination={"/explore"} 
                />
                <SideBarOption 
                    isVisible={true} 
                    text={"Negociações"} 
                    currentMenu={currentMenu} 
                    setCurrentMenu={setCurrentMenu} 
                    icon={Work} 
                    destination={"/negotiations"} 
                />
                <SideBarOption 
                    isVisible={true} 
                    text={"Agenda"} 
                    currentMenu={currentMenu} 
                    setCurrentMenu={setCurrentMenu} 
                    icon={CalendarMonth} 
                    destination={"/calendar"} 
                />
                <SideBarOption 
                    isVisible={true} 
                    text={"Eventos"} 
                    currentMenu={currentMenu} 
                    setCurrentMenu={setCurrentMenu} 
                    icon={MicExternalOn} 
                    destination={"/events"} 
                />
                <SideBarOption 
                    isVisible={true} 
                    text={"Oportunidades"} 
                    currentMenu={currentMenu} 
                    setCurrentMenu={setCurrentMenu} 
                    icon={WorkspacePremium} 
                    destination={"/opportunities"} 
                />
                <SideBarOption 
                    isVisible={true} 
                    text={"Estabelecimentos"} 
                    currentMenu={currentMenu} 
                    setCurrentMenu={setCurrentMenu} 
                    icon={MapsHomeWork} 
                    destination={"/establishments"} 
                />
                <SideBarOption 
                    isVisible={true} 
                    text={"Perfil"} 
                    currentMenu={currentMenu} 
                    setCurrentMenu={setCurrentMenu} 
                    icon={PersonPin} 
                    destination={"/profile"} 
                />
                <Tooltip title="Sair" placement="right">
                    <ListItemButton onClick={endSession}>
                        <ListItemIcon sx={{ color: '#FB2D57'}}>
                            <MeetingRoom />
                        </ListItemIcon>
                        <ListItemText primary="Sair" />
                    </ListItemButton>
                </Tooltip>
                <Divider sx={{ my: 1, }} />
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: open ? 'flex-end' : 'flex-start',
                        px: [1],
                    }}
                >
                    <IconButton sx={{ color: '#FB2D57'}} onClick={toggleDrawer}>
                        <ChevronLeft />
                    </IconButton>
                </Toolbar>
            </List>
        </CustomDrawer>
    )
}