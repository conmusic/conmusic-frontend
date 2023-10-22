import React, { useCallback } from 'react';
import { useNavigate } from 'react-router';
import {
    Grid,
    Typography,
    Card,
    CardMedia,
    CardContent,
    Button,
} from '@mui/material';

import myImage from '../assets/images/image.png';

function CardEventProposal({ establishment, event, local, showStart, showEnd, id }){
  const navigate = useNavigate();

  const handleNavigation = useCallback(() => {
    navigate(`/proposals/${id}`)
  }, [navigate, id])

    return(
        <Grid item xs={12} md={7} sx={{display: "flex", justifyContent: "center", mb: 2}}>
          <Card sx={{ 
            display: 'flex', 
            width: 1300, 
            }}>
            <CardMedia
            component="img"
            sx={{ width: 120, 
                height: 120,
                display: { xs: 'none', sm: 'block' },
                alignSelf: "center" ,
                borderRadius: 10,
                ml: 3, }}
            src={myImage}
            />
            <CardContent sx={{ flex: 1, mt: 1 }}>
              <Typography component="h2" variant="h5" fontWeight="bold">
                {event}
              </Typography>
              <Typography variant="subtitle1" >
                {establishment}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {local}
              </Typography>
            </CardContent>
            <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" , justifyContent: "center", mt: 2 }}>
              <Typography>
                {showStart}
              </Typography>
              <Typography variant="subtitle1" >
                {showEnd}
              </Typography>
            </CardContent>
          <CardContent sx={{ display: "flex"}}>
            <Button
              variant="outlined"
              size="medium"
              color="inherit"
              sx={{
                mt: 1,
                mr: 3,
                alignSelf: "center",
                borderColor: 'black',
                backgroundColor: '#fb2b57',
                color: 'white',
                '&:hover': {
                backgroundColor: 'white',
                color: 'black',
                },
              }}
              onClick={handleNavigation}
            >
              Ver Detalhes
            </Button>
        </CardContent>
      </Card>
      </Grid>

    )
}
export default CardEventProposal;