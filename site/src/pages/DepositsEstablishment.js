import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function preventDefault(event) {
  event.preventDefault();
}

export default function DepositsEstablishment(props) {
  return (
    <React.Fragment>
        <React.Fragment>
          <Typography component="p">Artista:</Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            {props.artista}
          </Typography>
          <Typography component="p">Evento:</Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            {props.evento}
          </Typography>
          <Typography component="p">Data do Show:</Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            {props.dataDoShow}
          </Typography>
          <Typography component="p">Horário Marcado:</Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            {props.horarioMarcado}
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