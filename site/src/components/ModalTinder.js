import { ClassNames } from "@emotion/react";
import {

    Grid,
    Typography,
    Button,
    Box,
    TextField,
  } from '@mui/material';
  import myImage from '../assets/images/image.png';
  import { blue } from '@mui/material/colors';
  import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
  import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
  import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
  import * as React from 'react';
  import dayjs, { Dayjs } from 'dayjs';
  import { DateCalendar, TimeField } from "@mui/x-date-pickers";

  const style = (theme) => ({
    width: 1000,
    height: 600,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '12px',
    padding: '16px 32px 24px 32px',
    backgroundColor: theme.palette.mode === 'dark' ? '#0A1929' : 'white',
    boxShadow: `0px 2px 24px ${theme.palette.mode === 'dark' ? '#000' : '#383838'}`,
  });
  const display = {
    display: 'flex',
    justifyContent: 'center',
}

function ModalTinder(){
    const [value, setValue] = React.useState(dayjs('2022-04-17T15:30'));

    return(
        <Grid>
        <Box sx={style}      
            component="form"
        >
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ alignSelf: "center"}}>
            Proposta
        </Typography>          
        <Box
            component="form"
            noValidate
            autoComplete="off"
            flex-wrap= 'wrap' 
        >
            <div>
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ alignSelf: "center"}}>
                    Nome do Estabelecimento
                </Typography>  
                <TextField
                    select
                    SelectProps={{
                        native: true,
                    }}
                    sx={{ 
                        width: 930, 
                    }}
                    variant="outlined"
                >
                </TextField>
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ alignSelf: "center"}}>
                    Evento
                </Typography>  
                <TextField
                    select
                    SelectProps={{
                        native: true,
                    }}
                    sx={{ 
                        width: 930, 
                    }}
                    variant="outlined"
                >
                </TextField>
            </div> 
            <Box sx={{display: "flex", flexDirection: 'row', justifyContent: 'flex-start', width: 1, mt: 3}}>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DateCalendar sx={{display: "flex", alignItems: 'flex-start', width: 1}}/>
                </LocalizationProvider>
                <Box>
                    <Typography>
                        Horário
                    </Typography>
                    <TextField
                        select
                        SelectProps={{
                            native: true,
                        }}
                        sx={{ 
                            width: 600, 
                        }}
                        variant="outlined"
                    >
                    </TextField>
                </Box>   
            </Box>
        </Box>
        </Box>
        </Grid>

    )
}
export default ModalTinder;