import { format } from "date-fns";
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

const dateHelper = {
    toLocalDateTimeISOString,
    getFormattedScheduleDate
}

export default dateHelper;