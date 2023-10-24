import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import { differenceInYears } from 'date-fns';

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

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    author: '@arwinneil',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
];

export default function Tinder() {
  const [selectedImage, setSelectedImage] = useState(0);

  const image = [
    'https://s2-g1.glbimg.com/u_Sep5KE8nfnGb8wWtWB-vbBeD0=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2022/N/Q/S27GlHSKA6DAAjshAgSA/bar-paradiso.png',
  ]
  const navigate = useNavigate();

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

        if (!artistsCache || artistsCache == "" || artistsCache == null) {
          const { data } = await api.get(`/artists`)

          artistsData = data.map(artist => ({
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

        } else {
          artistsData = JSON.parse(artistsCache)
          console.log("from cache: ", artistsCache)
        }

        console.log(artistsData)

        setArtists(artistsData)
        setCurrentArtist(artistsData.pop())
      } catch (error) {
        console.error(error)
      }
    }

    getArtists()
  }, [setArtists, setCurrentArtist])

  const formattedBirthDateAndAge = useMemo(() => {
    if (currentArtist.birthDate != null) {
      const birthDate = new Date(currentArtist.birthDate)
      const age = differenceInYears(new Date(), birthDate)

      return `${birthDate.toLocaleDateString('pt-BR')} - ${age} anos`
    }

    return ''
  }, [currentArtist.birthDate])

  const nextArtist = useCallback(() => {
    if (artists.length > 0) {
      const selectedArtist = artists.pop()
      setCurrentArtist(selectedArtist)
      localStorage.setItem('@conmusic:explore-artists', JSON.stringify(artists))

      if (artists.length <= 0) {
        getMoreArtists()
      }
    }
  }, [artists])

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

  const makeProposal = useCallback(() => {
    navigate(`/make-proposal/${currentArtist.id}`)
  }, [currentArtist.id, navigate])

  return (
    <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
      <Grid item xs={12} md={4}>
        <Paper sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: 4, gap: 1, my: 2 }}>
          <SmallImage src={image[0] == undefined ? `data:image/jpeg;base64,` : image[0]} alt="Profile" />
          <Typography variant="h5" fontWeight='bold' style={{ color: '#FB2D57', marginTop: 2 }}>
            {currentArtist.name}
          </Typography>
          {
            currentArtist.instagram &&
            (<Typography variant='caption' fontWeight='bold'>@{currentArtist.instagram}</Typography>)
          }
          <Typography variant='body1'>
            {formattedBirthDateAndAge}
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
            onClick={() => makeProposal()}
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
              {itemData.map((item) => (
                <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                  <img
                    {...srcset(item.img, 121, item.rows, item.cols)}
                    alt={item.title}
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
