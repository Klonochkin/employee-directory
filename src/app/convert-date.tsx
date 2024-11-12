const months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
];
export function convertTextToDate(value: string) {
    const [day, monthName, year] = value.split(' ');
    if (!day || !monthName || !year) {
        const newDate = new Date(value);
        newDate.setDate(newDate.getDate() + 1);
        return newDate;
    }
    const monthIndex = months.indexOf(monthName);
    return new Date(Number(year), monthIndex, Number(day));
}

export function convertDateToISO(value: string) {
    const [day, monthName, year] = value.split(' ');
    if (!day || !monthName || !year) {
        const newDate = new Date(value);
        newDate.setDate(newDate.getDate() + 1);
        return newDate.toISOString().slice(0, 10);
    }
    const monthIndex = months.indexOf(monthName);
    const newDate = new Date(Number(year), monthIndex, Number(day));
    newDate.setDate(newDate.getDate() + 1);
    return newDate.toISOString().slice(0, 10);
}

export function convertDateToText(info: string) {
    const date = new Date(info);
    const result =
        date.getDate() +
        ' ' +
        months[date.getMonth()] +
        ' ' +
        date.getFullYear();
    return result;
}
