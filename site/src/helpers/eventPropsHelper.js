function getFormattedAddress({ address, city, state }) {
    return `${address}. ${city} - ${state}`;
}

function getFormattedPaymentValue(value) {
    return `R$ ${Number(value).toFixed(2).replace('.', ',')}`
}

function getFormattedCouvertCharge(value) {
    return `${String(value).replace('.', ',')}%`
}

function getFormattedZipCode(value) {
    const text = String(value)

    return `${text.substring(0, text.length - 3)}-${text.substring(text.length - 3)}`
}

function getFormattedPhoneNumber(value) {
    const text = String(value)

    return `+55 (${text.substring(0, 2)}) ${text.substring(2, text.length - 4)}-${text.substring(text.length - 4)}`
}

const eventPropsHelper = {
    getFormattedAddress,
    getFormattedPaymentValue,
    getFormattedCouvertCharge,
    getFormattedZipCode,
    getFormattedPhoneNumber
}

export default eventPropsHelper;