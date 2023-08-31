import React, { useCallback } from "react";
import { useNavigate } from "react-router";
import { ListItemButton, ListItemIcon, ListItemText, Tooltip } from "@mui/material";

export default function SideBarOption({ 
    setCurrentMenu, 
    currentMenu, 
    isVisible, 
    destination, 
    icon: Icon, 
    text, 
    ...rest 
}) {
    const navigate = useNavigate();

    const navigateTo = useCallback(() => {
        setCurrentMenu(text)
        navigate(destination)
    }, [navigate, destination, text, setCurrentMenu])

    return isVisible ? (
        <Tooltip title={text} placement="right">
            <ListItemButton 
                sx={{
                    backgroundColor: currentMenu === text ? '#FB2D57' : '#FFFFFF'
                }}
                onClick={navigateTo}
            >
                <ListItemIcon
                    sx={{
                        color: currentMenu === text ? '#FFFFFF' : '#FB2D57'
                    }}
                >
                    <Icon />
                </ListItemIcon>
                <ListItemText 
                    sx={currentMenu === text
                        ? { color: '#FFFFFF'}
                        : {}}
                    primary={text} 
                />
            </ListItemButton>
        </Tooltip>
    ) : <></>;
}