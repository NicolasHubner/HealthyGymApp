interface IGoals {
    goal_type: string;
    weight: number;
    gender: string;
}

interface IReturnGoals {
    cal_burn: number;
    fat_burn: number;
    carbo_burn: number;
    protein_burn: number;
    water_ingest: number;
}

export const getGoalsUser = ({ goal_type, weight, gender }: IGoals): IReturnGoals => {
    if (gender === 'M') {
        switch (goal_type) {
            case 'moderate-cardio':
                return {
                    cal_burn: 20 * weight,
                    fat_burn: 1 * weight,
                    carbo_burn: 2 * weight,
                    protein_burn: 1.2 * weight,
                    water_ingest: 0.035 * weight,
                };
            case 'advanced-cardio':
                return {
                    cal_burn: 25 * weight,
                    fat_burn: 1 * weight,
                    carbo_burn: 2 * weight,
                    protein_burn: 1.5 * weight,
                    water_ingest: 0.035 * weight,
                };
            case 'strength-muscle':
                return {
                    cal_burn: 30 * weight,
                    fat_burn: 1 * weight,
                    carbo_burn: 4 * weight,
                    protein_burn: 2 * weight,
                    water_ingest: 0.035 * weight,
                };
        }
    }

    if (gender === 'F')
        switch (goal_type) {
            case 'moderate-cardio':
                return {
                    cal_burn: 20 * weight,
                    fat_burn: 1 * weight,
                    carbo_burn: 2 * weight,
                    protein_burn: 1.2 * weight,
                    water_ingest: 0.035 * weight,
                };
            case 'advance-cardio':
                return {
                    cal_burn: 25 * weight,
                    fat_burn: 1 * weight,
                    carbo_burn: 2 * weight,
                    protein_burn: 1.5 * weight,
                    water_ingest: 0.035 * weight,
                };
            case 'strength-muscle':
                return {
                    cal_burn: 30 * weight,
                    fat_burn: 1 * weight,
                    carbo_burn: 4 * weight,
                    protein_burn: 2 * weight,
                    water_ingest: 0.035 * weight,
                };
        }
    return {
        cal_burn: 0,
        fat_burn: 0,
        carbo_burn: 0,
        protein_burn: 0,
        water_ingest: 0,
    };
};
