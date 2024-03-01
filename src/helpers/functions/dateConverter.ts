export function dateConverter(date: Date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const dateFormatted = `${day < 10 ? `0${day}` : day}/${
        month < 10 ? `0${month}` : month
    }/${year}`;
    return dateFormatted;
}

export function createNewDateWithBrazilianTimezone(date: Date) {
    const newDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours() - 3,
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
    );

    return newDate;
}
