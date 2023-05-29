import React, { useState } from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import Button from '@mui/material/Button';

function preventDefault(event) {
  event.preventDefault();
}


export default function Deposits(props) {
  const {
    estabelecimento,
    evento,
    dataDoShow,
    horarioMarcado,
  } = props;

  return (
    <React.Fragment>
      <Title>Shows Confirmados</Title>
      <Typography component="p">
        Estabelecimento:
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {estabelecimento}
      </Typography>
      <Typography component="p">
        Evento:
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {evento}
      </Typography>
      <Typography component="p">
        Data do Show:
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {dataDoShow}
      </Typography>
      <Typography component="p">
        Horário Marcado:
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {horarioMarcado}
      </Typography>
      <Button
        variant="outlined"
        size="small"
        color="inherit"
        sx={{
          marginTop: 'auto',
          borderColor: 'black',
        }}
      >
        Ir para conversa
      </Button>
    </React.Fragment>
  );
}

