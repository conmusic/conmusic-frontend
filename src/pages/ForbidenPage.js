import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import ForbidenImage from "../assets/images/403 Error.svg";

const NotFoundPage = () => {
  return (
      <Paper
        sx={{
          maxWidth: 650,
          margin: "auto",
          mt: 8,
          display:"flex", 
          justifyContent:"center"
        }}
      >
        <Box maxWidth={550} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
          <Typography variant="h3" mt={3}><b>Proibido de entrar</b></Typography>
          <img src={ForbidenImage} alt="404" width={500} />
          <Typography variant="h6"  sx={{mb: 3}}>Peça acesso para um administrador para acessar está guia. Volte para a <b><a href="/">home</a></b> apertando este link!</Typography>
        </Box>
      </Paper>
  );
};

export default NotFoundPage;
