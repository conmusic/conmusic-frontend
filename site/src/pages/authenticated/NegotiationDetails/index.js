import React, { useState } from "react";
import { useParams } from "react-router";
import { 
    Box, 
    Breadcrumbs, 
    Container, 
    Grid, 
    Link,
    Paper, 
    Tab, 
    Tabs, 
    Typography
} from "@mui/material";

import CustomTabPanel from "../../../components/CustomTabPanel";

import Details from "./Details";
import Chat from "./Chat";

export default function NegotiationDetails() {
    const { showId } = useParams();

    const [currentTab, setCurrentTab] = useState(0);

    const handleChange = (event, newValue) => {
        setCurrentTab(newValue);
    }

    function a11yProps(index) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>               
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Breadcrumbs>
                            <Link underline="hover" color={"inherit"} href="/negotiations">
                                Negociações
                            </Link>
                            <Typography>
                                {showId}
                            </Typography>
                        </Breadcrumbs>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={currentTab} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Detalhes" {...a11yProps(0)} />
                                <Tab label="Chat" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={currentTab} index={0}>
                            <Details />
                        </CustomTabPanel>
                        <CustomTabPanel value={currentTab} index={1}>
                            <Typography>Chat</Typography>
                            {/* <Chat/> */}
                        </CustomTabPanel>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}