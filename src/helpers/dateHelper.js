import { differenceInYears, format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

function toLocalDateTimeISOString(date) {
    const offsetMs = date.getTimezoneOffset() * 60 * 1000;
    const msLocal = date.getTime() - offsetMs;
    const dateLocal = new Date(msLocal);
    const iso = dateLocal.toISOString();
    return iso.slice(0, 19);
}

function getFormattedScheduleDate(date) {
    return format(new Date(date), "eee, Pp", { locale: ptBR })
}

function getFormattedAge(date) {
    if (date === null || date === "") {
        return ''
    }

    const birthDate = new Date(date)
    const age = differenceInYears(new Date(), birthDate)

    return `${birthDate.toLocaleDateString('pt-BR')} - ${age} anos`
}

function getDate(date) {
    if (date === null || date === "") {
        return ''
    }

    return format(new Date(date), "dd/MM/yy", { locale: ptBR })
}

const dateHelper = {
    toLocalDateTimeISOString,
    getFormattedScheduleDate,
    getFormattedAge,
    getDate
}

export default dateHelper;