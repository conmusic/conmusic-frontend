import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

export default function CardAdmin({valor}) {
    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: 300,
                boxShadow: 0,
                background: 'transparent'
            }}
        >
            <Typography variant="h3" color="#15005A">
                {valor}
            </Typography>
        </Paper>
    );
}
