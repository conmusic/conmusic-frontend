function getFormattedAddress({ address, city, state }) {
    return `${address}. ${city} - ${state}`;
}

function getFormattedPaymentValue(value) {
    return `R$ ${Number(value).toFixed(2).replace('.', ',')}`
}

function getFormattedCouvertCharge(value) {
    return `${String(value).replace('.', ',')}%`
}

const eventPropsHelper = {
    getFormattedAddress,
    getFormattedPaymentValue,
    getFormattedCouvertCharge
}

export default eventPropsHelper;