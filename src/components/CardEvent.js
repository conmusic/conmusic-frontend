import React, { useCallback } from 'react';
import {
  Grid,
  Button,
  Typography,
  CardContent,
  Card,
  Chip,
} from '@mui/material';
import { useNavigate } from "react-router";

function CardEvent({ establishment, event, local, showStart, showEnd, id, establishmentId, genero, onUpload }) {  
  const navigate = useNavigate();
  const handleNavigation = useCallback(() => {
    navigate(`/events/${id}`)
  }, [navigate, id])

  return (
    <Grid item xs={12} md={7} sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
      <Card sx={{ display: 'flex', width: 1300, alignItems: 'center', justifyContent: 'space-between' }}>
        <CardContent sx={{ flex: 1, mt: 1, paddingLeft: 7 }}>
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
        <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Typography>
            {showStart}
          </Typography>
          <Typography variant="subtitle1" >
            {showEnd}
          </Typography>
        </CardContent>
        <CardContent sx={{ display: "flex", flex: 0.5 }}>
          <Chip sx={{ backgroundColor: "#FF3E3A", color: '#F2F2F2'}} label={genero} />
        </CardContent>
        <CardContent sx={{ display: "flex" }}>
          <div style={{ display: "flex", flexDirection: 'column' }}>
            <Button
              variant="outlined"
              color="inherit"
              onClick={handleNavigation}
              sx={{
                mt: 1,
                mr: 3,
                alignSelf: "center",
                borderColor: 'black',
                backgroundColor: '#006ab5',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'white',
                  color: 'black',
                },
              }}
            >
              Atualizar
            </Button>
          </div>

        </CardContent>
      </Card>
    </Grid>

  )
}
export default CardEvent;