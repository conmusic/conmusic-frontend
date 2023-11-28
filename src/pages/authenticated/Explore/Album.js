import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Typography,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Box,
  Chip,
  Button,
  Divider
} from '@mui/material';

import api from '../../../services/api';
import dateHelper from '../../../helpers/dateHelper';
import eventPropsHelper from '../../../helpers/eventPropsHelper';
import StarIcon from '@mui/icons-material/Star';

export default function Album() {
  const navigate = useNavigate()

  const [events, setEvents] = useState([])
  const [genres, setGenres] = useState([])
  const [selectedGenres, setSelectedGenres] = useState([])

  const [establishmentImages, setEstablishmentImages] = useState({});

  useEffect(() => {
    const fetchEstablishmentImages = async () => {
      const imageUrls = {};
      for (const event of events) {
        try {
          const imageUrl = await getPerfilImage(event.establishmentId);
          imageUrls[event.establishmentId] = imageUrl;
        } catch (error) {
          console.error(`Erro ao buscar imagem para o estabelecimento ${event.establishmentId}:`, error);
        }
      }
      setEstablishmentImages(imageUrls);
    };

    if (events.length > 0) {
      fetchEstablishmentImages();
    }
  }, [events]);

  async function getPerfilImage(establishmentId) {
    try {
      var token = localStorage.getItem('@conmusic:token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await api.get(`/establishments/image/perfil/${establishmentId}`, config);

      return response.data.url;
    } catch (error) {
      console.error('Erro ao buscar imagem:', error);
    }
  }

  useEffect(() => {
    const getAvailableEvents = async () => {
      try {
        const { data } = await api.get(`/events/available`, {
          params: {
            date: dateHelper.toLocalDateTimeISOString(new Date())
          }
        })
        setEvents(data.map(event => ({
          id: event.id,
          paymentValue: event.value,
          couvertCharge: event.coverCharge,
          description: event.description,
          name: event.name,
          address: {
            address: event.establishment.address,
            city: event.establishment.city,
            state: event.establishment.state,
          },
          establishmentName: event.establishment.fantasyName,
          genre: event.genre.name,
          rating: event.establishment.avaregeRating,
          establishmentId: event.establishment.id
        })))
      } catch (error) {
        console.error(error)
      }
    }
    getAvailableEvents()
  }, [])

  const handleNavigate = useCallback((eventId) => {
    navigate(`/explore/${eventId}`)
  }, [navigate])

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', margin: 0 }}>
        <Container maxWidth="md" style={{ margin: 0, padding: 0, display: 'none', justifyContent: 'center' }}>
            <Paper sx={{ marginTop: 10, paddingY: 4, paddingX: 4, width: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'  }}>
              <FormControl sx={{ width: '100%' }}>
                <InputLabel id='genre-filter-option-label'>Gêneros</InputLabel>
                <Select
                  id='genre-filter-option'
                  labelId='genre-filter-option-label'
                  multiple
                  value={selectedGenres}
                  onChange={(event) => setSelectedGenres(event.target.value)}
                  input={<OutlinedInput id="select-multiple-genre" label="Gênero" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {
                        selected.map((option, i) => (
                          <Chip 
                            key={option.id}
                            sx={{ backgroundColor: i % 2 === 0 ? "#FF3E3A" : "#CC3245", color: '#F2F2F2'}}
                            label={option.genre} 
                          />
                        ))
                      }
                    </Box>
                  )}
                >
                  {
                    genres.map(g => (
                      <MenuItem
                        key={g.id}
                        value={g}
                      >
                        {g.genre}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
              <Button sx={{ marginLeft: 6 }}>
                Filtrar
              </Button>
            </Paper>
        </Container>
      </div>
      <Container sx={{ py: 8 }} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {events.map((event, i) => (
            <Grid item key={event.id} xs={12} sm={6} md={4}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', }}
                onClick={() => handleNavigate(event.id)}
              >
                {establishmentImages[event.establishmentId] && (
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '95.25%',
                    }}
                    image={establishmentImages[event.establishmentId]}
                  />
                )}
                <CardContent sx={{ flexGrow: 1, justifyContent: 'space-between', display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'baseline', // Align items vertically along the baseline
                  }}>
                    <Box>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="h2"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          fontWeight: 'bold',
                        }}
                      >
                        {event.name}
                        {/* <img width="24" height="24" src="https://img.icons8.com/material/24/star--v1.png" alt="star--v1" style={{ marginLeft: "120px" }} />
    4.0 */}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center', // Align items vertically in the center
                        justifyContent: 'space-between', // Align icon and text to start
                      }}
                    >
                      <Typography sx={{ mt: 0.5}}>{event.rating}</Typography>
                      <StarIcon sx={{ color: '#FFD700', textAlign: 'left' }} />
                    </Box>
                  </Box>

                  <Divider orientation="horizontal" flexItem sx={{ my: 1 }} />
                  <Typography>
                    {event.establishmentName}
                  </Typography>
                  <Typography variant='caption'>
                    {eventPropsHelper.getFormattedAddress(event.address)}
                  </Typography>
                  <Divider orientation="horizontal" flexItem sx={{ my: 1 }} />
                  <Box sx={{ display: 'flex', direction: 'row', justifyContent: 'space-between' }}>
                    <Typography>
                      {eventPropsHelper.getFormattedPaymentValue(event.paymentValue)}
                    </Typography>
                    <Typography>
                      {eventPropsHelper.getFormattedCouvertCharge(event.couvertCharge)}
                    </Typography>
                  </Box>
                  <Divider key={`EventDivider#${event.id}`} orientation="horizontal" flexItem sx={{ my: 1 }} />
                  <Chip
                    key={`EventGenreChip#${event.id}`}
                    label={event.genre}
                    sx={{
                      backgroundColor: i % 2 === 0 ? "#FF3E3A" : "#CC3245",
                      color: "#F2F2F2",
                      alignSelf: 'flex-start'
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container >
    </>
  );
}   