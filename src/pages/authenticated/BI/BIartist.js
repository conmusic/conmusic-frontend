
import CardBIArtist from "../../../components/CardBIArtist";
import ChartBI from "../../../components/charts/ChartBI";
import {
    Grid,
    Paper,
  } from '@mui/material';
import ChartBIBar from "../../../components/charts/ChartBIBar";

export default function BIartist() {
    return(
        <>
    <CardBIArtist/>
    <Grid item xs={12} md={12} lg={12} display={'flex'} justifyContent={'center'}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: '87vh',
              width: '90%',
              marginTop: 5,
              marginBottom: 0,
              alignItems: 'center'
              

            }}
          >
            <ChartBI sx={{ height: '70%' }}/>
          </Paper>
        </Grid>

    <Grid item xs={12} md={12} lg={12} display={'flex'} justifyContent={'center'}>
          <Paper
            sx={{
              p: 2,
         
              height: '78vh',
              width: '90%',
              marginTop: 5,
              marginBottom: 5,
              alignItems: 'center'
              

            }}
          >
            <ChartBIBar sx={{ height: '70%' }}/>
          </Paper>
        </Grid>
    
    </>
    )
}

