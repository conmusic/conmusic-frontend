function toLocalDateTimeISOString(date) {
    const offsetMs = date.getTimezoneOffset() * 60 * 1000;
    const msLocal = date.getTime() - offsetMs;
    const dateLocal = new Date(msLocal);
    const iso = dateLocal.toISOString();
    return iso.slice(0, 19);
}

const dateHelper = {
    toLocalDateTimeISOString
}

export default dateHelper;