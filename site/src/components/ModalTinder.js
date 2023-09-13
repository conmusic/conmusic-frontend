import { ClassNames } from "@emotion/react";
import {

    Grid,
    Typography,
    Card,
    CardMedia,
    CardContent,
    Button,
    container,
    Box,
    TextField,
    FormControl,
    InputLabel,
    FilledInput,
    InputAdornment,
    MenuItem,
  } from '@mui/material';
  import myImage from '../assets/images/image.png';
  import { blue } from '@mui/material/colors';

  const style = (theme) => ({
    width: 1000,
    height: 500,
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
        </Box>
        </Box>
        </Grid>

    )
}
export default ModalTinder;