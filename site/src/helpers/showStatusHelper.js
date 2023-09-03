function getDisplayName(status) {
    let displayName = status
    
    switch (displayName) {
        case "MANAGER_PROPOSAL":
        case "ARTIST_PROPOSAL":
            displayName = "Proposta Enviada"
            break;
        case "NEGOTIATION":
            displayName = "Negociando"
            break;
        case "ARTIST_ACCEPTED":
            displayName = "Artista Aceitou"
            break;
        case "MANAGER_ACCEPTED":
            displayName = "Gerente Aceitou"
            break
        case "CONFIRMED":
            displayName = "Confirmado"
            break
        case "CONCLUDED":
            displayName = "Concluido"
            break
        case "MANAGER_REJECTED":
        case "ARTIST_REJECTED":
            displayName = "Proposta Recusada"
            break
        case "ARTIST_WITHDRAW":
            displayName = "Artista Desistiu"
            break
        case "MANAGER_WITHDRAW":
            displayName = "Gerente Desistiu"
            break
        case "MANAGER_CANCELED":
        case "ARTIST_CANCELED":
            displayName = "Show Cancelado"
            break;
        default:
            displayName = "Indefinido"
            break;
    }

    return displayName
}

const showStatusHelper = {
    getDisplayName
}

export default showStatusHelper;