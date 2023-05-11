export const calcularUltimos6Meses = () => {
    const today = new Date();
    const last6Months = new Date(today.setMonth(today.getMonth() - 6));

    // Use an array to map month numbers to their corresponding abbreviations
    const monthsAbbr = [
        'Jan',
        'Fev',
        'Mar',
        'Abr',
        'Mai',
        'Jun',
        'Jul',
        'Ago',
        'Set',
        'Out',
        'Nov',
        'Dez',
    ];

    // If any of the months are in the previous year, add 12 to the negative month number
    const months = [
        last6Months.getMonth(),
        last6Months.getMonth() + 1,
        last6Months.getMonth() + 2,
        last6Months.getMonth() + 3,
        last6Months.getMonth() + 4,
        last6Months.getMonth() + 5,
    ].map(monthNum => {
        const month = new Date(today.getFullYear(), monthNum);
        return monthsAbbr[month.getMonth()];
    });

    return months;
};
