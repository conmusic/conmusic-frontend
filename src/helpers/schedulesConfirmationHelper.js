function getConfirmationName(status) {
    let displayName = status
    
    switch (displayName) {
        case true:
            displayName = "Alocado"
            break;
        case false:
            displayName = "Horario livre"
            break;
    }

    return displayName
}

const scheduleConfirmationHelper = {
    getConfirmationName
}

export default scheduleConfirmationHelper;