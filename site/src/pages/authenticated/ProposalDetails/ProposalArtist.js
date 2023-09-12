import React, { useState } from 'react';
import { useParams } from 'react-router';
import {
    Button,
    Typography,
    Paper,
    Grid,
    ImageList,
    ImageListItem,
    Box,
    Chip,
    Divider,
    Stack
} from '@mui/material';
import { styled } from '@mui/material/styles';
import eventPropsHelper from '../../../helpers/eventPropsHelper';

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

export default function ProposalArtist() {
    const { proposalId } = useParams()

    const [selectedImage, setSelectedImage] = useState(0);

    const image = [
        'https://s2-g1.glbimg.com/u_Sep5KE8nfnGb8wWtWB-vbBeD0=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2022/N/Q/S27GlHSKA6DAAjshAgSA/bar-paradiso.png',
    ]

    return (
        <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
            <Grid item xs={12} md={4}>
                <Paper sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: 4, gap: 1, my: 2 }}>
                    <SmallImage src={image[selectedImage]} alt="Profile" />
                    <Typography variant="h5" fontWeight='bold' style={{ color: '#FB2D57', marginTop: 2 }}>
                        Leonardo Silva
                    </Typography>
                    <Typography variant='caption' fontWeight='bold'>
                        @leo.silva
                    </Typography>
                    <Typography variant='body1'>
                        18/08/2003 - 20 anos
                    </Typography>
                    <Divider orientation="horizontal" flexItem />
                    <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                        Gêneros Musicais
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, flexWrap: 'wrap' }}>
                        <Chip label="Rock" />
                        <Chip label="Rock" />
                        <Chip label="Rock" />
                        <Chip label="Rock" />
                        <Chip label="Rock" />
                        <Chip label="Rock" />
                        <Chip label="Rock" />
                        <Chip label="Rock" />
                    </Box>
                    <Divider orientation="horizontal" flexItem />
                    <Button variant="contained" color="success" sx={{ marginTop: 1.5 }}>
                        Iniciar Negociação
                    </Button>
                    <Button variant="contained" color="error" sx={{ marginBottom: 1.5 }}>
                        Recusar Proposta
                    </Button>
                    <Divider orientation="horizontal" flexItem />
                    <Typography variant="h5" fontWeight='bold' style={{ color: '#FB2D57', marginTop: 2 }}>
                        Evento
                    </Typography>                    
                    <Box>
                        <Typography variant="h6" mb={1} fontWeight="bold">Pagamento</Typography>
                        <Box variant="body1" display='flex' flexDirection="row">
                            <Typography fontWeight="bold" mr={0.5}>Valor fixo:</Typography>
                            <Typography>{eventPropsHelper.getFormattedPaymentValue(1850)}</Typography>
                        </Box>
                        <Box variant="body1" display='flex' flexDirection="row">
                            <Typography fontWeight="bold" mr={0.5}>Taxa de Couvert:</Typography>
                            <Typography>{eventPropsHelper.getFormattedCouvertCharge(20)}</Typography>
                        </Box>
                    </Box>
                    <Divider orientation="horizontal" flexItem />
                    <Box>
                        <Typography variant="h6" mb={1} fontWeight="bold">Data e Horário:</Typography>
                        <Box variant="body1" display='flex' flexDirection="row">
                            <Typography fontWeight="bold" mr={0.5}>Início:</Typography>
                            <Typography textTransform='capitalize'>AAA</Typography>
                        </Box>
                        <Box variant="body1" display='flex' flexDirection="row">
                            <Typography fontWeight="bold" mr={0.5}>Término:</Typography>
                            <Typography textTransform='capitalize'>BBB</Typography>
                        </Box>
                    </Box>
                    <Divider orientation="horizontal" flexItem />
                    <Typography variant='body1'>
                        Endereço
                    </Typography>
                    <Typography variant='body1'>
                        {eventPropsHelper.getFormattedZipCode("01414001")}
                    </Typography>
                    <Typography>
                        {eventPropsHelper.getFormattedPhoneNumber(11996489985)}
                    </Typography>
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
                            Descrição
                        </Typography>
                    </Paper>
                </SubtitleContainer>
            </Grid>
        </Grid>
    );
}
