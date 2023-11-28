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

const CarouselContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  marginBottom: "50px",
  marginTop: 30
});

const SmallImage = styled('img')({
  width: '250px',
  height: '250px',
  borderRadius: '50%',
  objectFit: 'cover',
});

const SubtitleContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '600px',
  marginLeft: "100px",
  justifyContent: "center"
})

function srcset(image, size, rows = 1, cols = 1) {
  const originalWidth = size * cols;
  const originalHeight = size * rows;
  const aspectRatio = originalWidth / originalHeight;

  // Definindo nova largura e altura com base na proporção original
  let newWidth = originalWidth;
  let newHeight = originalHeight;

  if (cols > rows) {
    newHeight = Math.round(originalWidth / aspectRatio);
  } else if (cols < rows) {
    newWidth = Math.round(originalHeight * aspectRatio);
  }

  return {
    src: `${image}?w=${newWidth}&h=${newHeight}&fit=crop&auto=format`,
    srcSet: `${image}?w=${newWidth}&h=${newHeight}&fit=crop&auto=format&dpr=2 2x`,
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
  });

  async function getPerfilImage(artistId) {
    try {
      var token = localStorage.getItem('@conmusic:token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
  
      const response = await api.get(`/artists/image/perfil/${artistId}`, config);
  
      if (response.data.url) {
        setPerfilImage(response.data.url);
      } else {
        // Caso o artista não tenha imagem de perfil cadastrada, limpar a imagem anterior
        setPerfilImage('');
      }
    } catch (error) {
      console.error('Erro ao buscar imagem:', error);
    }
  }

  async function getImages(artistId) {
    try {
      var token = localStorage.getItem('@conmusic:token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await api.get(`/artists/images/${artistId}`, config);

      const patternMapping = {
        0: { cols: 2, rows: 2 },
        1: { cols: 1, rows: 1 },
        2: { cols: 1, rows: 1 },
        3: { cols: 2, rows: 1 },
        4: { cols: 2, rows: 1 },
        5: { cols: 2, rows: 2 },
        6: { cols: 1, rows: 1 },
        7: { cols: 1, rows: 1 },
      };

      const updatedImages = response.data.map((image, index) => ({
        ...image,
        ...patternMapping[index],
      }));

      setImages(updatedImages);
    } catch (error) {
      console.error('Erro ao buscar imagens:', error);
    }
  }

  useEffect(() => {
    async function fetchData() {
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
        const nextArtist = artistsData.pop();
        setCurrentArtist(nextArtist);

        // Após configurar o currentArtist, chama os métodos restantes
        if (nextArtist && nextArtist.id) {
          await getPerfilImage(nextArtist.id);
          await getImages(nextArtist.id);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchData(); // Renomeado para fetchData
  }, [setArtists, setCurrentArtist]);

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

  const nextArtist = useCallback(async () => {
    if (artists.length > 0) {
      const selectedArtist = artists.pop();
      setCurrentArtist(selectedArtist);
      localStorage.setItem('@conmusic:explore-artists', JSON.stringify(artists));
  
      // Limpar as imagens antes de obter as do próximo artista
      setImages([]);
      setPerfilImage('');
  
      // Se não houver mais artistas, buscar mais
      if (artists.length <= 0) {
        getMoreArtists();
      }
  
      // Obter as imagens e imagem de perfil do próximo artista
      if (selectedArtist && selectedArtist.id) {
        await getPerfilImage(selectedArtist.id);
        await getImages(selectedArtist.id);
      }
    }
  }, [artists, getMoreArtists]);

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
                    {...srcset(item.url, 121, item.rows, item.cols)}
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
