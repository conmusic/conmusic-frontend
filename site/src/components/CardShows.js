import React from 'react';
import {
  Typography,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Box,
  Button,
  Divider
} from '@mui/material';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function CardShows({ mode, name, eventName, showDate, showTime, ...rest }) {
  return (
    <Container sx={{ py: 2 }} maxWidth="md">
      {/* End hero unit */}
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Card
            sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', }}
          >
            <CardMedia
              component="div"
              sx={{
                // 16:9
                pt: '95.25%',
              }}
              image="https://source.unsplash.com/random?wallpapers"
            />
            <CardContent sx={{ flexGrow: 1, justifyContent: 'space-between', display: 'flex', flexDirection: 'column' }}>
              <Typography gutterBottom variant="h6" component="h2" style={{ display: "flex", alignItems: "center", fontWeight: 'bold' }}>
                {name}
              </Typography>
              <Divider orientation="horizontal" flexItem sx={{ my: 1 }} />
              <Typography variant='caption' sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
                {eventName}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginBottom: 1 }}>
                <Typography sx={{ display: 'flex', marginBottom: 1, flexDirection: 'row', justifyContent: "flex-start", 
              alignItems: "center"}}>
                  <CalendarMonthIcon sx={{ color: '#FB2D57'}} />
                  {showDate}
                </Typography>
                <Typography sx={{ display: 'flex', marginBottom: 1, flexDirection: 'row', justifyContent: "flex-start", 
              alignItems: "center"}}>
                  <AccessTimeIcon sx={{ color: '#FB2D57'}} />
                  {showTime}
                </Typography>
              </Box>
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
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}