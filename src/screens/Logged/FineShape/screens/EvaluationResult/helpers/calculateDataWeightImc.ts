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
