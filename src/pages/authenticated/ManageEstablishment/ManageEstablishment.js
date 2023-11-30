import React, { useState, useEffect, useCallback } from 'react';
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
    CardContent,
    Stepper,
    Step,
    StepLabel
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import api from '../../../services/api';
import Title from '../../../components/Title';
import { useAuth } from '../../../hooks/auth';
import eventPropsHelper from '../../../helpers/eventPropsHelper';

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

export default function ManageEstablishment(onUpload) {
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
        managerId: 0
    });
    const [selectedEstablishment, setSelectedEstablishment] = useState(null);
    const [openToast, setOpenToast] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const handleUpload = async () => {
        try {
            if (selectedFile) {
                const formData = new FormData();
                formData.append('file', selectedFile);

                const response = await api.post(`/establishments/upload/${newEstablishment.id}`, formData);
                console.log("response:", response)
                if (response.status === 200) {
                    setOpenToast(true);
                } else {
                    console.error('Erro no upload da imagem:', response);
                }

                setSelectedFile(null);
            }
        } catch (error) {
            console.error('Erro no upload da imagem:', error);
            console.error('Mensagem de erro do servidor:', error.response.data);
        }
    };


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };
    useEffect(() => {
        const getEstablishments = async () => {
            try {
                const { data } = await api.get(`/establishments/manager/${userId}`)
                console.log("userId:", userId);
                console.log('Chamando a API para buscar dados do usuário...');
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
                    cnpj: establishment.cnpj,
                    capacity: establishment.capacity,
                    amount110Outlets: establishment.amount110Outlets,
                    amount220Outlets: establishment.amount220Outlets,
                    managerId: userId
                })))
                console.log(data)
                if (data) {
                    console.log('Dados recebidos:', data);
                    const userDataArray = Array.isArray(data) ? data : [data];
                    const firstUser = userDataArray[0];
                    setNewEstablishment({
                        id: firstUser.id,
                        address: {
                            address: firstUser.address,
                            zipCode: firstUser.zipCode,
                            city: firstUser.city,
                            state: firstUser.state
                        },
                        fantasyName: firstUser.fantasyName,
                        establishmentName: firstUser.establishmentName,
                        phoneNumber: firstUser.phoneNumber,
                        cnpj: firstUser.cnpj,
                        capacity: firstUser.capacity,
                        amount110Outlets: firstUser.amount110Outlets,
                        amount220Outlets: firstUser.amount220Outlets,
                        managerId: userId
                    });
                } else {
                    console.log('Resposta vazia ou sem dados:', data.data);
                }
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
    const handleClick = () => {
        setOpenToast(true);
        handleClose()
    };
    const handleCreateEstablishment = async () => {
        try {
            const token = localStorage.getItem('@conmusic:token');
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            console.log("newEstablishment:", newEstablishment);
            console.log("config:", config);
            const response = await api.post('/establishments', newEstablishment, config);
            if (response.status === 201) {
                setOpenCreateModal(false);
                setEstablishments(prev => [...prev, response.data])
            } else {
                console.error('Erro ao criar o estabelecimento:', response);
            }
        } catch (error) {
            console.error('Erro ao criar o estabelecimento:', error);
            console.error('Mensagem de erro do servidor:', error.response.data);
        }
    };

    const handleInactivateEstablishment = async (id) => {
        try {
            const token = localStorage.getItem('@conmusic:token');
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            console.log("id:", id)
            const response = await api.delete(`/establishments/inctivate/${id}`, config);
            console.log("response:", response)
            if (response.status === 200) {
                console.log(`Estabelecimento ${id} inativado com sucesso.`);
            } else {
                console.error('Erro ao inativar o estabelecimento:', response);
            }
        } catch (error) {
            console.error('Erro ao inativar o estabelecimento:', error);
            console.error('Mensagem de erro do servidor:', error.response.data);
        }
    };

    const getEstablishments = useCallback(async () => {
        try {
            const { data } = await api.get(`/establishments/manager/${userId}`)
            console.log("userId:", userId);
            console.log('Chamando a API para buscar dados do usuário...');
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
                cnpj: establishment.cnpj,
                capacity: establishment.capacity,
                amount110Outlets: establishment.amount110Outlets,
                amount220Outlets: establishment.amount220Outlets,
                managerId: userId
            })))
            console.log(data)
            if (data) {
                console.log('Dados recebidos:', data);
                const userDataArray = Array.isArray(data) ? data : [data];
                const firstUser = userDataArray[0];
                setNewEstablishment({
                    id: firstUser.id,
                    address: {
                        address: firstUser.address,
                        zipCode: firstUser.zipCode,
                        city: firstUser.city,
                        state: firstUser.state
                    },
                    fantasyName: firstUser.fantasyName,
                    establishmentName: firstUser.establishmentName,
                    phoneNumber: firstUser.phoneNumber,
                    cnpj: firstUser.cnpj,
                    capacity: firstUser.capacity,
                    amount110Outlets: firstUser.amount110Outlets,
                    amount220Outlets: firstUser.amount220Outlets,
                    managerId: userId
                });
            } else {
                console.log('Resposta vazia ou sem dados:', data.data);
            }
        } catch (error) {
            console.error('Erro ao buscar os dados dos cards:', error);
        }
    }, [userId])

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Stack spacing={2} direction="row" justifyContent={'space-between'}>
                <Title>Estabelecimentos</Title>
                <Button variant="contained" color="success" onClick={() => setOpenCreateModal(true)}>
                    Criar Estabelecimento
                </Button>
            </Stack>
            <Grid container spacing={2} sx={{ mt: 3,  mb: 4}}>
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
                                        onClick={() => {
                                            setSelectedEstablishment(establishment);
                                            setOpenGerenciarModal(true);
                                        }}
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
                                    value={selectedEstablishment ? selectedEstablishment.establishmentName : ''}
                                    onChange={(e) => setSelectedEstablishment(prev => ({ ...prev, establishmentName: e.target.value }))}
                                />
                                <TextField
                                    label="Nome Fantasia"
                                    id="filled-size-normal"
                                    variant="filled"
                                    name="fantasyName"
                                    value={selectedEstablishment ? selectedEstablishment.fantasyName : ''}
                                    onChange={(e) => setSelectedEstablishment(prev => ({ ...prev, fantasyName: e.target.value }))}
                                />
                            </div>
                            <div style={{ display: 'flex', gap: 20 }}>
                                <TextField
                                    label="Número de Telefone"
                                    id="filled-size-normal"
                                    variant="filled"
                                    name="phoneNumber"
                                    value={selectedEstablishment ? selectedEstablishment.phoneNumber : ''}
                                    onChange={(e) => setSelectedEstablishment(prev => ({ ...prev, phoneNumber: e.target.value }))}
                                />
                                <TextField
                                    label="CNPJ"
                                    id="filled-size-normal"
                                    variant="filled"
                                    name="cnpj"
                                    value={selectedEstablishment ? selectedEstablishment.cnpj : ''}
                                    onChange={(e) => setSelectedEstablishment(prev => ({ ...prev, cnpj: e.target.value }))}
                                />
                            </div>
                            <div style={{ display: 'flex', gap: 20 }}>
                                <TextField
                                    label="Quantidade de tomadas 110"
                                    id="filled-size-normal"
                                    variant="filled"
                                    name="amount110Outlets"
                                    value={selectedEstablishment ? selectedEstablishment.amount110Outlets : ''}
                                    onChange={(e) => setSelectedEstablishment(prev => ({ ...prev, amount110Outlets: e.target.value }))}
                                />
                                <TextField
                                    label="Quantidade de tomadas 220"
                                    id="filled-size-normal"
                                    variant="filled"
                                    name="amount220Outlets"
                                    value={selectedEstablishment ? selectedEstablishment.amount220Outlets : ''}
                                    onChange={(e) => setSelectedEstablishment(prev => ({ ...prev, amount220Outlets: e.target.value }))}
                                />
                            </div>
                            <div style={{ display: 'flex', gap: 20 }}>
                                <TextField
                                    label="Endereço"
                                    id="filled-size-normal"
                                    variant="filled"
                                    name="address"
                                    value={selectedEstablishment ? selectedEstablishment.address.address : ''}
                                    onChange={(e) => setSelectedEstablishment(prev => ({ ...prev, address: e.target.value }))}
                                />
                                <TextField
                                    label="Cidade"
                                    id="filled-size-normal"
                                    variant="filled"
                                    name="city"
                                    value={selectedEstablishment ? selectedEstablishment.address.city : ''}
                                    onChange={(e) => setSelectedEstablishment(prev => ({ ...prev, city: e.target.value }))}
                                />
                            </div>
                            <div style={{ display: 'flex', gap: 20 }}>
                                <TextField
                                    label="Estado"
                                    id="filled-size-normal"
                                    variant="filled"
                                    name="state"
                                    value={selectedEstablishment ? selectedEstablishment.address.state : ''}
                                    onChange={(e) => setSelectedEstablishment(prev => ({ ...prev, city: e.target.value }))}
                                />
                                <TextField
                                    label="CEP"
                                    id="filled-size-normal"
                                    variant="filled"
                                    name="zipCode"
                                    value={selectedEstablishment ? selectedEstablishment.address.zipCode : ''}
                                    onChange={(e) => setSelectedEstablishment(prev => ({ ...prev, city: e.target.value }))}
                                />
                            </div>
                            <div style={{ display: 'flex', gap: 20, justifyContent: "center" }}>
                                <TextField
                                    label="Capacidade"
                                    id="filled-size-normal"
                                    variant="filled"
                                    name="capacity"
                                    value={selectedEstablishment ? selectedEstablishment.capacity : ''}
                                    onChange={(e) => setSelectedEstablishment(prev => ({ ...prev, capacity: e.target.value }))}
                                />
                            </div>
                            <div style={{ display: 'flex', gap: 20 }}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="upload-button"
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                                <label htmlFor="upload-button">
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        component="span"
                                        startIcon={<CloudUploadIcon />}
                                        style={{ flex: 2, padding: '13px', fontSize: '0.8rem', width: 220 }}
                                        onClick={handleClick}
                                    >
                                        Upload de Imagem
                                    </Button>
                                </label>
                                <div style={{ display: "flex" }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="medium"
                                        disabled={!selectedFile}
                                        onClick={handleUpload}
                                        sx={{
                                            marginTop: 'auto',
                                            borderColor: 'black',
                                            backgroundColor: 'red',
                                            color: 'white',
                                            height: "100%",
                                            width: 220
                                        }}
                                    >
                                        Enviar Imagem
                                    </Button>
                                </div>

                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                <Button variant="contained" color="success" style={{ width: 'auto', height: 'auto' }}
                                    onClick={() => {
                                        setOpenGerenciarModal(false);
                                    }}>
                                    Salvar
                                </Button>
                                <Button variant="contained" color="error" style={{ width: 'auto', height: 'auto' }}
                                    onClick={async () => {
                                        try {
                                            // Primeiro, inativa/exclui o estabelecimento
                                            await handleInactivateEstablishment(selectedEstablishment.id);
                                            console.log('Estabelecimento inativado/excluído com sucesso!');
                                    
                                            // Em seguida, fecha o modal
                                            setOpenGerenciarModal(false);
                                    
                                            // Por fim, busca os estabelecimentos atualizados
                                            await getEstablishments();
                                            console.log('Estabelecimentos atualizados após a inativação/exclusão.');
                                    
                                        } catch (error) {
                                            console.error('Erro ao realizar operações após inativar/excluir o estabelecimento:', error);
                                        }
                                    }}>
                                    Excluir
                                </Button>
                            </div>
                        </Box>

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
                            onClick={async () => {
                                try {
                                    // Primeiro, cria o estabelecimento
                                    await handleCreateEstablishment();
                                    console.log('Estabelecimento criado com sucesso!');
                        
                                    // Em seguida, fecha o modal
                                    setOpenCreateModal(false);
                        
                                    // Em seguida, redefina o estado
                                    handleReset();
                        
                                    // Por fim, busca os estabelecimentos atualizados
                                    await getEstablishments();
                                    console.log('Estabelecimentos atualizados após a criação.');
                        
                                } catch (error) {
                                    console.error('Erro ao realizar operações após criar o estabelecimento:', error);
                                }
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