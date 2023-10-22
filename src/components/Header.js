import React from "react";
import { AppBar, styled, Toolbar, Typography } from "@mui/material";

import logo from '../assets/images/logoConMusic-removebg-preview.png';

const CustomAppBar = styled(AppBar, { shouldForwardProp: (prop) => prop !== 'open', })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: 'none',
    borderBottom: '1px solid #ccc',
}));

export default function Header() {
    return (
        <CustomAppBar position="absolute">
            <Toolbar
                sx={{
                    backgroundColor: "white",
                    pr: '24px',
                }}
            >
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1, }}
                >
                    <a href="/#" className="nav__logo">
                        <img src={logo} alt="" className="nav__logo-img" />
                    </a>
                </Typography>
            </Toolbar>
        </CustomAppBar>
    )
};