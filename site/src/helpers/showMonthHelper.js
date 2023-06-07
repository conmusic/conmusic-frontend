function getDisplayMonth(month) {
    let displayMonth = month
    
    switch (displayMonth) {
        case "January":
            displayMonth = "Janeiro"
            break;
        case "February":
            displayMonth = "Fevereiro"
            break;
        case "March":
            displayMonth = "Março"
            break;
        case "April":
            displayMonth = "Abril"
            break
        case "May":
            displayMonth = "Maio"
            break
        case "June":
            displayMonth = "Junho"
            break
        case "July":
            displayMonth = "Julho"
            break
        case "August":
            displayMonth = "Agosto"
            break
        case "September":
            displayMonth = "Setembro"
            break
        case "October":
            displayMonth = "Outubro"
            break
        case "November":
            displayMonth = "Nobembro"
            break
        case "December":
        displayMonth = "Dezembro"
        break
        default:
            displayMonth = "Indefinido"
            break;
    }

    return displayMonth
}

const showMonthHelper = {
    displayMonth
}

export default showMonthHelper;