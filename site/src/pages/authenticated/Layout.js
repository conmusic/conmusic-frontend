import React from 'react';
import { Box, Toolbar } from '@mui/material';

export default function Layout({ children, ...props }) {
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
                {children}
            </Box>
        </Box>
    );
}