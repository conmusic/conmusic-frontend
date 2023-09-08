import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function CardShows({ mode, name, eventName, showDate, showTime, ...rest }) {
  return (
    <React.Fragment>
        <React.Fragment>
          <Typography component="p">{ mode === 'Artist' ? "Estabelecimento" : "Artista" }</Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            {name}
          </Typography>
          <Typography component="p">Evento:</Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            {eventName}
          </Typography>
          <Typography component="p">Data do Show:</Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            {showDate}
          </Typography>
          <Typography component="p">Horário Marcado:</Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            {showTime}
          </Typography>
          <Button
            variant="outlined"
            size="small"
            color="inherit"
            sx={{
              marginTop: 'auto',
              borderColor: 'black',
              backgroundColor: '#fb2b57',
              color: 'white',
              '&:hover': {
                backgroundColor: 'white',
                color: 'black',
              },
            }}
          >
            Ir para conversa
          </Button>
        </React.Fragment>
    </React.Fragment>
  );
}