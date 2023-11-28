import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import notFoundImage from "../assets/images/404 Error.svg";

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
          <Typography variant="h3" mt={3}><b>Página não encontrada</b></Typography>
          <img src={notFoundImage} alt="404" />
          <Typography variant="h5"  sx={{mb: 3}}>Volte para a <b><a href="/">home</a></b> apertando este link!</Typography>
        </Box>
      </Paper>
  );
};

export default NotFoundPage;
