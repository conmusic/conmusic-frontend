import React, { useState, useEffect } from 'react';
import {
    Container,
    Grid,
    Button,
    Stack,
    Typography,
    Modal,
    Box,
    TextField,
    Card,
    CardMedia,
    CardContent
} from '@mui/material';

import api from '../../services/api';

import Title from '../../components/Title';
import { useAuth } from '../../hooks/auth';
import eventPropsHelper from '../../helpers/eventPropsHelper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = ['Informações gerais', 'Infraestrutura', 'Localização'];

const style = {
    position: 'absolute',
    display: 'flex',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    paddingX: 4,
    paddingY: 2,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 'auto',
    alignItems: 'center',
    gap: 2,
    overflowY: "scroll",
    maxHeight: "100%"
};

export default function ManageEstablishment() {
    const { userId } = useAuth();
    const [establishments, setEstablishments] = useState([])
    const [openGerenciarModal, setOpenGerenciarModal] = useState(false);
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [newEstablishment, setNewEstablishment] = useState({
        cnpj: '',
        fantasyName: '',
        establishmentName: '',
        phoneNumber: '',
        amount110Outlets: 0,
        amount220Outlets: 0,
        capacity: 0,
        address: '',
        city: '',
        state: '',
        zipCode: '',
        managerId: userId
    });

    useEffect(() => {
        const getEstablishments = async () => {
            try {
                const { data } = await api.get(`/establishments/manager/${userId}`)

                setEstablishments(data.map(establishment => ({
                    id: establishment.id,
                    address: {
                        address: establishment.address,
                        zipCode: establishment.zipCode,
                        city: establishment.city,
                        state: establishment.state
                    },
                    fantasyName: establishment.fantasyName,
                    establishmentName: establishment.establishmentName,
                    phoneNumber: establishment.phoneNumber,
                    cnpj: establishment.cnpj
                })))
            } catch (error) {
                console.error('Erro ao buscar os dados dos cards:', error);
            }
        };

        if (userId !== 0) {
            getEstablishments();
        }
    }, [userId]);

    const handleCreateEstablishmentChange = (event) => {
        setNewEstablishment(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleCreateEstablishment = async () => {
        try {
            const token = localStorage.getItem('@conmusic:token');
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            console.log("newEstablishment:", newEstablishment)
            const response = await api.post('/establishments', newEstablishment, config);

            if (response.status === 201) {
                setOpenCreateModal(false);

            } else {
                console.error('Erro ao criar o estabelecimento:', response);
            }

        } catch (error) {
            console.error('Erro ao criar o estabelecimento:', error);
            console.error('Mensagem de erro do servidor:', error.response.data);
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Stack spacing={2} direction="row" justifyContent={'space-between'}>
                <Title>Estabelecimentos</Title>
                <Button variant="contained" color="success" onClick={() => setOpenCreateModal(true)}>
                    Criar Estabelecimento
                </Button>

            </Stack>
            <Grid container spacing={0.5} sx={{ mt: 3 }}>
                {
                    establishments.map(establishment => (
                        <Grid
                            key={`Grid#${establishment.id}`}
                            item
                            xs={12}
                            md={12}
                            lg={12}
                            sx={{ display: "flex" }}
                        >
                            <Card key={`Card#${establishment.id}`} sx={{ display: 'flex', width: 1300, gap: 10 }}>
                                <CardMedia
                                    key={`CardImage#${establishment.id}`}
                                    component="img"
                                    sx={{
                                        width: 120,
                                        height: 120,
                                        display: { xs: 'none', sm: 'block' },
                                        alignSelf: "center",
                                        borderRadius: 10,
                                        ml: 3,
                                    }}
                                    src="https://source.unsplash.com/random?wallpapers"
                                />
                                <CardContent key={`EstablishmentData#${establishment.id}`} sx={{ mt: 1, flex: 1 }}>
                                    <Typography key={`EstablishmentName#${establishment.id}`} component="h2" variant="h5">
                                        {establishment.fantasyName}
                                    </Typography>
                                    <Typography key={`FantasyName#${establishment.id}`} variant="subtitle1" >
                                        {establishment.establishmentName}
                                    </Typography>
                                    <Typography key={`Cnpj#${establishment.id}`} variant="subtitle1" >
                                        {eventPropsHelper.getFormattedCnpj(establishment.cnpj)}
                                    </Typography>
                                    <Typography key={`Address#${establishment.id}`} variant="subtitle1">
                                        {eventPropsHelper.getFormattedAddress(establishment.address)}
                                    </Typography>
                                    <Typography key={`ZipCode#${establishment.id}`} variant="subtitle1">
                                        {eventPropsHelper.getFormattedZipCode(establishment.address.zipCode)}
                                    </Typography>
                                </CardContent>
                                <CardContent key={`Manage#${establishment.id}`} xs={12} md={4} lg={4} style={{ display: 'flex', alignItems: 'center' }}>
                                    <Button
                                        key={`ManageButton#${establishment.id}`}
                                        variant="contained"
                                        style={{
                                            display: 'flex',
                                            backgroundColor: '#FB2D57',
                                            color: 'white',
                                            width: 120,
                                            height: 40,
                                            marginRight: 15
                                        }}
                                        onClick={() => setOpenGerenciarModal(true)}
                                    >
                                        Gerenciar
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                }
            </Grid>
            <div>
      <Modal
        open={openGerenciarModal}
        onClose={() => setOpenGerenciarModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} spacing={2}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Gerenciar Estabelecimento
          </Typography>
          <Box
            component="form"
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            noValidate
            autoComplete="off"
          >
            <div style={{ display: 'flex', gap: 20 }}>
              <TextField
                label="Razão Social"
                id="filled-size-normal"
                variant="filled"
                name="establishmentName"
              />
              <TextField
                label="Nome Fantasia"
                id="filled-size-normal"
                variant="filled"
                name="fantasyName"
              />
            </div>
            <div style={{ display: 'flex', gap: 20 }}>
              <TextField
                label="Número de Telefone"
                id="filled-size-normal"
                variant="filled"
                name="phoneNumber"
              />

              <TextField
                label="CNPJ"
                id="filled-size-normal"
                variant="filled"
                name="cnpj"
              />
            </div>
            <div style={{ display: 'flex', gap: 20 }}>
              <TextField
                label="Quantidade de tomadas 110"
                id="filled-size-normal"
                variant="filled"
                name="amount110Outlets"
              />
              <TextField
                label="Quantidade de tomadas 220"
                id="filled-size-normal"
                variant="filled"
                name="amount220Outlets"
              />
            </div>
            <div style={{ display: 'flex', gap: 20 }}>
              <TextField
                label="Endereço"
                id="filled-size-normal"
                variant="filled"
                name="address"
              />
              <TextField
                label="Cidade"
                id="filled-size-normal"
                variant="filled"
                name="city"
              />
            </div>
            <div style={{ display: 'flex', gap: 20 }}>
              <TextField
                label="Estado"
                id="filled-size-normal"
                variant="filled"
                name="state"
              />
              <TextField
                label="CEP"
                id="filled-size-normal"
                variant="filled"
                name="zipCode"
              />
            </div>
            <div style={{ display: 'flex', gap: 20 }}>
              <TextField
                label="Capacidade"
                id="filled-size-normal"
                variant="filled"
                name="capacity"
              />
            </div>
          </Box>
          <Button variant="contained" color="success" style={{ width: 250, height: 40 }}>
            Criar Estabelecimento
          </Button>
        </Box>
      </Modal>
    </div>
            <Modal
                open={openCreateModal}
                onClose={() => setOpenCreateModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} spacing={2}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Criar Estabelecimento
                    </Typography>

                    <Box sx={{ width: '100%' }}>
                        <Stepper activeStep={activeStep}>
                            {steps.map((label, index) => {
                                const stepProps = {};
                                const labelProps = {};
                                if (isStepSkipped(index)) {
                                    stepProps.completed = false;
                                }
                                return (
                                    <Step key={label} {...stepProps}>
                                        <StepLabel {...labelProps}>{label}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>

                    </Box>
                    <Box
                        component="form"
                        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                        noValidate
                        autoComplete="off"
                    >
                        {activeStep === 0 && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                <TextField
                                    label="Nome do Estabelecimneto"
                                    id="filled-size-normal"
                                    variant="filled"
                                    name="establishmentName"
                                    value={newEstablishment.establishmentName}
                                    onChange={handleCreateEstablishmentChange}
                                    inputProps={{
                                        maxLength: 45,
                                        minLength: 3,
                                    }}
                                />
                                <TextField
                                    label="Nome Fantasia"
                                    id="filled-size-normal"
                                    variant="filled"
                                    name="fantasyName"
                                    value={newEstablishment.fantasyName}
                                    onChange={handleCreateEstablishmentChange}
                                    inputProps={{
                                        maxLength: 45,
                                        minLength: 3,
                                    }}
                                />
                                <TextField
                                    label="Número de Telefone"
                                    id="filled-size-normal"
                                    variant="filled"
                                    name="phoneNumber"
                                    value={newEstablishment.phoneNumber}
                                    onChange={(event) => {
                                        const { value } = event.target;
                                        const numericValue = value.replace(/\D/g, '');


                                        handleCreateEstablishmentChange(event)
                                        setNewEstablishment({
                                            ...newEstablishment,
                                            phoneNumber: numericValue,
                                        });
                                    }}
                                    inputProps={{
                                        maxLength: 11,
                                        pattern: "\\d*",
                                    }}
                                />

                                <TextField
                                    label="CNPJ"
                                    id="filled-size-normal"
                                    variant="filled"
                                    name="cnpj"
                                    value={newEstablishment.cnpj}
                                    onChange={(event) => {
                                        const { value } = event.target;
                                        const numericValue = value.replace(/\D/g, '');

                                        handleCreateEstablishmentChange(event)
                                        setNewEstablishment({
                                            ...newEstablishment,
                                            cnpj: numericValue,
                                        });
                                    }}
                                    inputProps={{
                                        maxLength: 14,
                                    }}
                                />
                            </div>
                        )}

                        {activeStep === 1 && (
                            <div style={{ display: 'flex', gap: 20, flexDirection: 'column' }}>
                                <TextField
                                    label="Quantidade de tomadas 110"
                                    id="filled-size-normal"
                                    variant="filled"
                                    name="amount110Outlets"
                                    value={newEstablishment.amount110Outlets}
                                    onChange={(event) => {
                                        const { value } = event.target;
                                        const numericValue = value.replace(/\D/g, '');

                                        handleCreateEstablishmentChange(event)
                                        setNewEstablishment({
                                            ...newEstablishment,
                                            amount110Outlets: numericValue,
                                        });
                                    }}
                                    inputProps={{
                                        pattern: '[0-9]*',
                                        min: 0,
                                        maxLength: 2,
                                    }}
                                />
                                <TextField
                                    label="Quantidade de tomadas 220"
                                    id="filled-size-normal"
                                    variant="filled"
                                    name="amount220Outlets"
                                    value={newEstablishment.amount220Outlets}
                                    onChange={(event) => {
                                        const { value } = event.target;
                                        const numericValue = value.replace(/\D/g, '');

                                        handleCreateEstablishmentChange(event)
                                        setNewEstablishment({
                                            ...newEstablishment,
                                            amount220Outlets: numericValue,
                                        });
                                    }}
                                    inputProps={{
                                        min: 0,
                                        maxLength: 2,
                                        pattern: '[0-9]*',
                                    }}
                                />
                                <TextField
                                    label="Capacidade"
                                    id="filled-size-normal"
                                    variant="filled"
                                    name="capacity"
                                    value={newEstablishment.capacity}
                                    onChange={(event) => {
                                        const { value } = event.target;
                                        const numericValue = value.replace(/\D/g, '');

                                        handleCreateEstablishmentChange(event)
                                        setNewEstablishment({
                                            ...newEstablishment,
                                            capacity: numericValue,
                                        });
                                    }}
                                    inputProps={{
                                        pattern: '[0-9]*',
                                    }}
                                />
                            </div>
                        )}

                        {activeStep === 2 && (
                            <div style={{ display: 'flex', gap: 20, flexDirection: 'column' }}>
                                <TextField
                                    label="Endereço"
                                    id="filled-size-normal"
                                    variant="filled"
                                    name="address"
                                    value={newEstablishment.address}
                                    onChange={handleCreateEstablishmentChange}
                                    inputProps={{
                                        maxLength: 45,
                                        minLength: 5,
                                    }}
                                />
                                <TextField
                                    label="Cidade"
                                    id="filled-size-normal"
                                    variant="filled"
                                    name="city"
                                    value={newEstablishment.city}
                                    onChange={(event) => {
                                        const { value } = event.target;
                                        const alphabeticValue = value.replace(/[^A-Za-z]/g, '');
                                        if (alphabeticValue !== '') {
                                            setNewEstablishment({
                                                ...newEstablishment,
                                                city: alphabeticValue,
                                            });
                                            handleCreateEstablishmentChange(event);
                                        }
                                    }}
                                    inputProps={{
                                        maxLength: 45,
                                        minLength: 2,
                                        pattern: '[A-Za-z]*'
                                    }}
                                />
                                <TextField
                                    label="Estado"
                                    id="filled-size-normal"
                                    variant="filled"
                                    name="state"
                                    value={newEstablishment.state}
                                    onChange={(event) => {
                                        const { value } = event.target;

                                        const alphabeticValue = value.replace(/[^A-Za-z]/g, '');
                                        if (alphabeticValue !== '') {
                                            setNewEstablishment({
                                                ...newEstablishment,
                                                state: alphabeticValue,
                                            });
                                            handleCreateEstablishmentChange(event);
                                        }
                                    }}
                                    inputProps={{
                                        maxLength: 2,
                                        minLength: 2,
                                        pattern: '[A-Za-z]*'
                                    }}
                                />
                                <TextField
                                    label="CEP"
                                    id="filled-size-normal"
                                    variant="filled"
                                    name="zipCode"
                                    value={newEstablishment.zipCode}
                                    onChange={(event) => {
                                        const { value } = event.target;
                                        const numericValue = value.replace(/\D/g, '');

                                        handleCreateEstablishmentChange(event)
                                        setNewEstablishment({
                                            ...newEstablishment,
                                            zipCode: numericValue,
                                        });
                                    }}
                                    inputProps={{
                                        maxLength: 8,
                                        minLength: 8,
                                        pattern: '[0-9]*',
                                    }}
                                />
                            </div>
                        )}


                    </Box>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography sx={{ mt: 2, mb: 1 }}>
                                Todos os passos foram concluídos!
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Box sx={{ flex: '1 1 auto' }} />
                            </Box>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Typography sx={{ mt: 1, mb: 1 }}>Etapa {activeStep + 1}</Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Button
                                    color="inherit"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{ mr: 1 }}
                                >
                                    Voltar
                                </Button>
                                <Box sx={{ flex: '1 1 auto' }} />

                                <Button onClick={handleNext}>
                                    {activeStep === steps.length - 1
                                        ? 'Finalizar Etapas'
                                        : 'Próximo'}
                                </Button>
                            </Box>
                        </React.Fragment>
                    )}

                    {activeStep === steps.length && (
                        <Button
                            variant="contained"
                            color="success"
                            style={{ width: 250, height: 40 }}
                            onClick={() => {
                                handleCreateEstablishment();
                                setOpenCreateModal(false); // Adiciona esta linha para fechar o modal
                                handleReset()
                            }}
                        >
                            Criar Estabelecimento
                        </Button>
                    )}
                </Box>
            </Modal>
        </Container>
    );
}