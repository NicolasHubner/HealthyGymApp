import { WeightHistoryResponse } from '@/types/full-history';

export const getWeightDay = (weightHistory: WeightHistoryResponse['data'], date: string) => {
    const sortedWeightHistory = weightHistory.sort(
        (a, b) =>
            new Date(a.attributes.datetime).getTime() - new Date(b.attributes.datetime).getTime()
    );

    const day = sortedWeightHistory.find(weight => weight.attributes.datetime.startsWith(date));

    if (!day) {
        const targetDate = new Date(date);
        targetDate.setDate(targetDate.getDate() - 1); // Subtract 1 day from the target date

        let nearestWeight;
        let nearestWeightDate = 0;

        for (let i = 0; i < sortedWeightHistory.length; i++) {
            const weight = sortedWeightHistory[i];
            const weightDate = new Date(weight.attributes.datetime).getTime();

            if (weightDate <= targetDate.getTime() && weightDate > nearestWeightDate) {
                nearestWeight = weight;
                nearestWeightDate = weightDate;
            }
        }

        return nearestWeight ? nearestWeight.attributes.weight : 0;
    }

    return day.attributes.weight;
};
