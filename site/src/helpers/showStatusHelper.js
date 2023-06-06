function getDisplayName(status) {
    let displayName = status
    
    switch (displayName) {
        case "ARTIST_PROPOSAL", "MANAGER_PROPOSAL":
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
        case "ARTIST_REJECTED", "MANAGER_REJECTED":
            displayName = "Proposta Recusada"
            break
        case "ARTIST_WITHDRAW":
            displayName = "Artista Desistiu"
            break
        case "MANAGER_WITHDRAW":
            displayName = "Gerente Desistiu"
            break
        case "ARTIST_CANCELED", "MANAGER_CANCELED":
            displayName = "Show Cancelado"
            
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