export const applyDateMask = (text: string) => {
    if (text.length <= 0) return '';

    const onlyNumbers = text.replace(/\D/g, '');

    let day = onlyNumbers.slice(0, 2);
    let month = onlyNumbers.slice(2, 4);
    let year = onlyNumbers.slice(4, 8);

    if (
        Number(year) > new Date().getFullYear() ||
        year === '0000' ||
        (Number(year) < 1900 && year.length >= 4)
    ) {
        year = `${new Date().getFullYear()}`;
    }

    if (Number(month) > 12 || month === '00') {
        month = '12';
    }

    if (Number(day) > 31 || day === '00') {
        day = '31';
    }

    if (onlyNumbers.length === 8) {
        return `${day}/${month}/${year}`;
    }

    return `${day}${month}${year}`;
};

export const applyPhoneMask = (value: string) => {
    if (value.length <= 0) return '';

    const onlyNumbers = value.replace(/\D/g, '');

    if (onlyNumbers.length >= 11)
        return `(${onlyNumbers.slice(0, 2)}) ${onlyNumbers.slice(2, 7)}-${onlyNumbers.slice(
            7,
            11
        )}`;

    return onlyNumbers;
};
