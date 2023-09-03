import React from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { AuthProvider } from "./auth";

const AppProvider = ({children}) => {
    const theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
            <AuthProvider>
                {children}
            </AuthProvider>
        </ThemeProvider>
    );
};

export default AppProvider;