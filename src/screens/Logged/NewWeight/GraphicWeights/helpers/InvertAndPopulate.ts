export function InvertAndPopulate(arr: string[]) {
    if (arr.length > 6) return Array.from(arr.splice(0, 6)).reverse();

    const filledArr = arr.concat(Array(6 - arr.length).fill(''));

    return Array.from(filledArr).reverse();
}

export const last6DaysAndMonths = (days: string[]) => {
    const NewArray = InvertAndPopulate(days);

    const dates = NewArray.map(day => {
        if (!day) return '';
        const date = new Date(day);
        const dayOfMonth = date.getDate();
        const month = date.getMonth() + 1;

        return `${dayOfMonth < 10 ? `0${dayOfMonth}` : dayOfMonth}/${
            month < 10 ? `0${month}` : month
        }`;
    });

    return dates;
};
