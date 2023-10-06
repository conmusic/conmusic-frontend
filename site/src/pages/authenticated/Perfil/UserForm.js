import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import {
    Typography,
    Grid,
    Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const SmallImage = styled('img')({
    width: '150px',
    height: '150px',
    borderRadius: '50%',
});

export default function AddressForm() {
    const [selectedImage, setSelectedImage] = useState(0);
    const image = [
        'https://s2-g1.glbimg.com/u_Sep5KE8nfnGb8wWtWB-vbBeD0=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2022/N/Q/S27GlHSKA6DAAjshAgSA/bar-paradiso.png',
    ]
    return (
        <React.Fragment >
            <Grid maxWidth="lg" sx={{ mt: 4, mb: 4, marginLeft: 9, width: "85%" }}>
                <Typography variant="h4" gutterBottom>
                    Meu Perfil
                </Typography>
                <SmallImage src={image[selectedImage]} alt="Profile" />
                <Typography variant="h6" gutterBottom>
                    Dados do Usuário
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="firstName"
                            name="firstName"
                            label="First name"
                            fullWidth
                            autoComplete="given-name"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="lastName"
                            name="lastName"
                            label="Last name"
                            fullWidth
                            autoComplete="family-name"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="address1"
                            name="address1"
                            label="Address line 1"
                            fullWidth
                            autoComplete="shipping address-line1"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="address2"
                            name="address2"
                            label="Address line 2"
                            fullWidth
                            autoComplete="shipping address-line2"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="city"
                            name="city"
                            label="City"
                            fullWidth
                            autoComplete="shipping address-level2"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="state"
                            name="state"
                            label="State/Province/Region"
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="zip"
                            name="zip"
                            label="Zip / Postal code"
                            fullWidth
                            autoComplete="shipping postal-code"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="country"
                            name="country"
                            label="Country"
                            fullWidth
                            autoComplete="shipping country"
                            variant="outlined"
                        />
                    </Grid>

                </Grid>
                <Grid sx={{display: "flex"}}>
                    <Button
                        variant="contained"
                        size="medium"
                        sx={{
                            marginTop: 'auto',
                            borderColor: 'black',
                            backgroundColor: 'green',
                            color: 'white',
                            marginTop: 2
                        }}
                    >
                        Salvar
                    </Button>
                    <Button
                        variant="contained"
                        size="medium"
                        sx={{
                            marginTop: 'auto',
                            borderColor: 'black',
                            backgroundColor: 'red',
                            color: 'white',
                            marginTop: 2,
                            marginLeft: 3
                        }}
                    >
                        Cancelar
                    </Button>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}