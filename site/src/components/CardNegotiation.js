import { ClassNames } from "@emotion/react";
import {

    Grid,
    Typography,
    Card,
    CardMedia,
    CardContent,
    Button,
  } from '@mui/material';
  import myImage from '../assets/images/image.png';


function CardNegotiation(){
    return(
        <Grid item xs={12} md={7} sx={{display: "flex", justifyContent: "center", mb: 4}}>
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
              <Typography component="h2" variant="h5">
                <p>Casa de show A</p> 
              </Typography>
              <Typography variant="subtitle1" >
              <p>Noite do Jazz</p> 
              </Typography>
              <Typography variant="subtitle1" paragraph>
              <p>São Paulo - SP</p> 
              </Typography>
            </CardContent>
            <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" , justifyContent: "center", mt: 2 }}>
              <Typography>
                <p>01/05/2023</p> 
              </Typography>
              <Typography variant="subtitle1" >
              <p>01/05/2023</p> 
              </Typography>
            </CardContent>
          <CardContent sx={{ display: "flex"}}>
            <Button
              variant="outlined"
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
              }}>
            Ver Detalhes
            </Button>
        </CardContent>
      </Card>
      </Grid>

    )
}
export default CardNegotiation;