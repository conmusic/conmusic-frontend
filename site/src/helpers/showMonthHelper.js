function getDisplayMonth(month) {
    let displayMonth = month
    
    switch (month) {
        case 1:
            displayMonth = "Janeiro"
            break;
        case 2:
            displayMonth = "Fevereiro"
            break;
        case 3:
            displayMonth = "Março"
            break;
        case 4:
            displayMonth = "Abril"
            break
        case 5:
            displayMonth = "Maio"
            break
        case 6:
            displayMonth = "Junho"
            break
        case 7:
            displayMonth = "Julho"
            break
        case 8:
            displayMonth = "Agosto"
            break
        case 9:
            displayMonth = "Setembro"
            break
        case 10:
            displayMonth = "Outubro"
            break
        case 11:
            displayMonth = "Nobembro"
            break
        case 12:
            displayMonth = "Dezembro"
            break
        default:
            displayMonth = "Indefinido"
            break;
    }

    return displayMonth
}

const showMonthHelper = {
    getDisplayMonth
}

export default showMonthHelper;