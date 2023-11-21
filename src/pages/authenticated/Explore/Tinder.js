import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { styled } from '@mui/material/styles';
import {
  Button,
  Typography,
  Paper,
  Grid,
  ImageList,
  ImageListItem,
  Box,
  Chip,
  Divider
} from '@mui/material';
import eventPropsHelper from '../../../helpers/eventPropsHelper';
import api from '../../../services/api';
import dateHelper from '../../../helpers/dateHelper';
import { async } from 'q';

const CarouselContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  marginBottom: "50px",
  marginTop: 30
});

const SmallImage = styled('img')({
  width: '150px',
  height: '150px',
  borderRadius: '50%',
});

const SubtitleContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '600px',
  marginLeft: "100px",
  justifyContent: "center"
})

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function Tinder() {
  const navigate = useNavigate();

  const [perfilImage, setPerfilImage] = useState('');
  const [images, setImages] = useState([]);
  const [artists, setArtists] = useState([]);
  const [currentArtist, setCurrentArtist] = useState({
    id: null,
    name: null,
    about: null,
    birthDate: null,
    cpf: null,
    email: null,
    instagram: null,
    phoneNumber: null,
    genres: [],
  })

  useEffect(() => {
    async function getArtists() {
      try {
        const artistsCache = localStorage.getItem('@conmusic:explore-artists');
        let artistsData;
  
        if (!artistsCache || artistsCache === "" || artistsCache == null) {
          const { data } = await api.get(`/artists`);
  
          artistsData = data.map((artist) => ({
            id: artist.id,
            name: artist.name,
            about: artist.about,
            birthDate: artist.birthDate,
            cpf: artist.cpf,
            email: artist.email,
            instagram: artist.instagram,
            phoneNumber: artist.phoneNumber,
            genres: artist.musicalGenres,
          })).reverse();
  
          localStorage.setItem('@conmusic:explore-artists', JSON.stringify(artistsData));
  
          console.log("from api: ", data);
        } else {
          artistsData = JSON.parse(artistsCache);
          console.log("from cache: ", artistsCache);
        }
  
        console.log(artistsData);
  
        setArtists(artistsData);
        setCurrentArtist(artistsData.pop());
  
        // Após configurar o currentArtist, chama os métodos restantes
        if (currentArtist && currentArtist.id) {
          await getPerfilImage();
          await getImages();
        }
      } catch (error) {
        console.error(error);
      }
    }
  
    async function getPerfilImage() {
      try {
        var token = localStorage.getItem('@conmusic:token');
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
  
        const response = await api.get(`/artists/image/perfil/${currentArtist.id}`, config);
  
        // console.log(response.data.url);
  
        setPerfilImage(response.data.url);
      } catch (error) {
        console.error('Erro ao buscar imagem:', error);
      }
    }
  
    async function getImages() {
      try {
        var token = localStorage.getItem('@conmusic:token');
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
  
        const response = await api.get(`/artists/images/${currentArtist.id}`, config);
  
        setImages(response.data);
      } catch (error) {
        console.error('Erro ao buscar imagens:', error);
      }
    }
  
    getArtists();
  }, [setArtists, setCurrentArtist, currentArtist]);

  const getMoreArtists = useCallback(async () => {
    try {
      const { data } = await api.get(`/artists`)

      const artistsData = data.map(artist => ({
        id: artist.id,
        name: artist.name,
        about: artist.about,
        birthDate: artist.birthDate,
        cpf: artist.cpf,
        email: artist.email,
        instagram: artist.instagram,
        phoneNumber: artist.phoneNumber,
        genres: artist.musicalGenres,
      })).reverse();
      
      localStorage.setItem('@conmusic:explore-artists', JSON.stringify(artistsData))

      console.log("from api: ", data)

      setArtists(artistsData)
    } catch (error) {
      console.error(error)
    }
  }, [])

  const nextArtist = useCallback(() => {
    if (artists.length > 0) {
      const selectedArtist = artists.pop()
      setCurrentArtist(selectedArtist)
      localStorage.setItem('@conmusic:explore-artists', JSON.stringify(artists))

      if (artists.length <= 0) {
        getMoreArtists()
      }
    }
  }, [artists, getMoreArtists])

  const makeProposal = useCallback(() => {
    navigate(`/make-proposal/${currentArtist.id}`)
  }, [currentArtist.id, navigate])

  return (
    <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
      <Grid item xs={12} md={4}>
        <Paper sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: 4, gap: 1, my: 2 }}>
          <SmallImage src={perfilImage} alt="Profile" />
          <Typography variant="h5" fontWeight='bold' style={{ color: '#FB2D57', marginTop: 2 }}>
            {currentArtist.name}
          </Typography>
          {
            currentArtist.instagram &&
            (<Typography variant='caption' fontWeight='bold'>@{currentArtist.instagram}</Typography>)
          }
          <Typography variant='body1'>
            {dateHelper.getFormattedAge(currentArtist.birthDate)}
          </Typography>
          <Typography variant='body1'>
            {eventPropsHelper.getFormattedPhoneNumber(currentArtist.phoneNumber)}
          </Typography>
          <Divider orientation="horizontal" flexItem />
          {
            currentArtist.genres &&
            currentArtist.genres.length > 0 &&
            (<>
              <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                Gêneros Musicais
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, flexWrap: 'wrap' }}>
                {
                  currentArtist.genres
                    .map((genre, i) => (<Chip sx={{ backgroundColor: i % 2 === 0 ? "#FF3E3A" : "#CC3245", color: '#F2F2F2' }} label={genre} />))
                }
              </Box>
              <Divider orientation="horizontal" flexItem />
            </>)
          }
          <Button
            variant="contained"
            color="success"
            sx={{ marginTop: 1.5 }}
            onClick={makeProposal}
          >
            Enviar proposta
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{ marginBottom: 1.5 }}
            onClick={() => nextArtist()}
          >
            Próximo artista
          </Button>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <SubtitleContainer>
          <CarouselContainer>
            <ImageList
              sx={{ width: '100%', height: 370 }}
              variant="quilted"
              cols={4}
              rowHeight={121}
            >
              {images.map((item, index) => (
                <ImageListItem key={item.url} cols={item.cols || 1} rows={item.rows || 1}>
                  <img
                    {...srcset(item.url, 121)}
                    alt={index}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </CarouselContainer>
          <Paper style={{ width: '100%', padding: '20px' }}>
            <Typography variant="h6" mb={1} fontWeight="bold">Sobre o Artista</Typography>
            <Typography variant="subtitle1">
              {currentArtist.about != null ? currentArtist.about : "Sem descrição do artista"}
            </Typography>
          </Paper>
        </SubtitleContainer>
      </Grid>
    </Grid>
  );
}
