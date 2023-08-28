import React from "react";
import { Box, Toolbar } from "@mui/material";

import SideBar from "../components/SideBar";
import Header from "../components/Header";

export default function Layout({ component: Component, ...rest }) {
    return (
        <Box sx={{ display: 'flex', }}>
            <Header />
            <SideBar />      
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
                <Component />
            </Box>
        </Box>
    );
}