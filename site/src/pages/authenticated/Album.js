import React, { useState } from 'react';
import {
  List,
  Typography,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  ListItem
} from '@mui/material';

export default function Album() {
  const [cards, setCards] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', margin: 0 }}>
        <Container maxWidth="sm" style={{ margin: 0, padding: 0 }}>
          <Grid container alignItems="center" justify="space-around" display='flex'>
            {/* Your grid items/components here */}

            <List sx={{ width: '100%', bgcolor: 'none' }} component="nav" aria-label="mailbox folders" style={{ display: 'flex', flexDirection: 'row' }}>
              <ListItem button style={{ marginRight: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img width="90" height="90" src="https://img.icons8.com/ios-glyphs/90/rock-music.png" alt="rock-music" />
                <span style={{ marginTop: '8px' }}>Rock</span>
              </ListItem>

              <ListItem button style={{ marginRight: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img width="90" height="90" src="https://img.icons8.com/ios-glyphs/90/piano.png" alt="piano" />
                <span style={{ marginTop: '8px' }}>Classica</span>
              </ListItem>
              <ListItem button style={{ marginRight: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img width="85" height="85" src="https://img.icons8.com/ios-glyphs/90/micro.png" alt="micro" />
                <span style={{ marginTop: '8px' }}>Pop</span>
              </ListItem>
              <ListItem button style={{ marginRight: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img width="100" height="100" src="https://img.icons8.com/ios-filled/100/jazz.png" alt="jazz" />
                <span style={{ marginTop: '8px' }}>Jazz</span>
              </ListItem>
              <ListItem button style={{ marginRight: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img width="64" height="64" src="https://img.icons8.com/pastel-glyph/64/guitar--v1.png" alt="guitar--v1" />
                <span style={{ marginTop: '8px' }}>Sertanejo</span>
              </ListItem>

              {/* Repita para os outros ícones... */}

            </List>
          </Grid>
        </Container>
      </div>
      <Container sx={{ py: 8 }} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {cards.map((card) => (
            <Grid item key={card} xs={12} sm={6} md={4}>
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
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h2" style={{ display: "flex", alignItems: "center", fontWeight: 'bold' }}>
                    Título
                    <img width="24" height="24" src="https://img.icons8.com/material/24/star--v1.png" alt="star--v1" style={{ marginLeft: "120px" }} />
                    4.0
                  </Typography>
                  <Typography>
                    This is a media card
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}   