import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import api from '../services/api';

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

  const [cardData, setCardData] = useState(null);

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        var token = localStorage.getItem('@conmusic:token');
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        const response = await api.get('/shows/confirmed/conmusic', config);
        setCardData(response.data);
      } catch (error) {
        console.error('Erro ao buscar os dados dos cards:', error);
      }
    };

    fetchCardData();
  }, []);

  return (
    <React.Fragment>
      {cardData ? (
        <React.Fragment>
          <Typography component="p">Estabelecimento:</Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            {cardData.status}
          </Typography>
          <Typography component="p">Evento:</Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            {cardData.valor}
          </Typography>
          <Typography component="p">Data do Show:</Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            {cardData.taxa_cover}
          </Typography>
          <Typography component="p">Horário Marcado:</Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            {cardData.fk_agenda}
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
      ) : (
        <Typography color="text.secondary">Carregando dados...</Typography>
      )}
    </React.Fragment>
  );
}