import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const cardsData = [
  {
    title: 'Propostas recebidas',
  },
  {
    title: 'Shows confirmados',
  },
  {
    title: 'Shows cancelados',
  },
  {
    title: 'Negociações vantajosas',
  },
];

export default function CardBIArtist() {
  return (
    <Grid container spacing={2} sx={{ justifyContent: 'space-evenly', marginTop: 2}}>
      {cardsData.map((card, index) => (
        <Grid item xs={2} md={2} key={index} >
          <Card sx={{ minWidth: 100 ,height: 245, width: '14em', display: 'flex'}}>
            <CardContent >
              <Typography variant="h5" component="div" sx={{height: 80}}>
                {card.title}
              </Typography>

              <Typography variant="body2">
                {card.definition}
                <br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
         
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

