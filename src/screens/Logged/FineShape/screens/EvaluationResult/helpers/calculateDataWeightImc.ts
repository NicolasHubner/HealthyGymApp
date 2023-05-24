interface ICalculteDataWeightImc {
    weight: number[];
    height: number;
}

export const calculateDataWeighImc = ({ weight, height }: ICalculteDataWeightImc) => {
    const imc = weight.map(w => {
        return w / (height * height);
    });

    return imc;
};

export const InvertArray = (array: number[]) => {
    const newArray = array.map((item, index) => {
        return array[array.length - index - 1];
    });

    return newArray;
};

export function InvertAndFill(arr: number[]) {
    const invertedArr = InvertArray(arr);
    const filledArr = invertedArr.concat(Array(6 - arr.length).fill(0));
    return InvertArray(filledArr);
}
// I need to create a function than can invert a Array and fill the rest with the value 0

//I need to create a function can take the an array and pick only the last 6 values

export const calculateLast6 = (months: number[]) => {
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

    const currentMonthIndex = new Date().getMonth(); // Obtém o índice do mês atual
    const last6Months = [];

    for (let i = 5; i >= 0; i--) {
        const monthIndex = (currentMonthIndex - i + 12) % 12; // Calcula o índice do mês desejado

        if (i >= months.length) {
            last6Months.push(monthsAbbr[monthIndex]);
        } else {
            last6Months.push(monthsAbbr[months[i]]);
        }
    }

    return last6Months;
};

