import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { 
    Box,
    Container, 
    Grid,
    Paper, 
    Tab, 
    Tabs,
} from "@mui/material";

import CustomTabPanel from "../../../components/CustomTabPanel";

import Details from "./Details";
import Chat from "./Chat";
import api from "../../../services/api";
import { useAuth } from "../../../hooks/auth";

export default function NegotiationDetails() {
    const { showId } = useParams();
    const { type } = useAuth()
    const navigate = useNavigate();

    const [currentTab, setCurrentTab] = useState(0);
    const [show, setShow] = useState({})

    useEffect(() => {
        const getShowData = async () => {
            try {
                const { data } = await api.get(`/shows/${showId}`)
                
                console.log(data)
        
                setShow({
                    eventName: data.event.name,
                    status: data.status,
                    eventDescription: data.description,
                    establishmentName: data.event.establishment.fantasyName,
                    address: {
                        address: data.event.establishment.address,
                        city: data.event.establishment.city,
                        state: data.event.establishment.state,
                    },
                    startDateTime: data.schedule.startDateTime,
                    endDateTime: data.schedule.endDateTime,
                    artistName: data.artist.name,
                    artistInstagram: data.artist.instagram,
                    artistAvatarUrl: data.artist.avatarUrl,
                    paymentValue: data.value,
                    couvertCharge: data.coverCharge,
                    managerName: data.managerName
                })
            } catch (error) {
                console.error(error)
                if (error.status === 404) {
                    navigate('negotiations')
                }
            }
        }

        if (api.defaults.headers.authorization !== undefined) {
            getShowData()
        }
    }, [showId, navigate, setShow])

    const handleChange = (event, newValue) => { setCurrentTab(newValue); }
    function a11yProps(index) { return { id: `simple-tab-${index}`, 'aria-controls': `simple-tabpanel-${index}`, }; }

    return (
        <Container sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>               
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={currentTab} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Detalhes" {...a11yProps(0)} />
                                <Tab label="Chat" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={currentTab} index={0}>
                            <Details
                                showId={showId}
                                eventName={show.eventName}
                                status={show.status} 
                                eventDescription={show.eventDescription}
                                establishmentName={show.establishmentName} 
                                address={show.address} 
                                startDateTime={show.startDateTime} 
                                endDateTime={show.endDateTime} 
                                artistName={show.artistName}
                                artistInstagram={show.artistInstagram}
                                artistAvatarUrl={show.artistAvatarUrl}
                                paymentValue={show.paymentValue}
                                couvertCharge={show.couvertCharge}
                            />
                        </CustomTabPanel>
                        <CustomTabPanel value={currentTab} index={1}>
                            <Chat
                                showId={showId}
                                otherUserName={
                                    type === "Manager" 
                                        ? show.artistName
                                        : show.managerName
                                }
                            />
                        </CustomTabPanel>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}