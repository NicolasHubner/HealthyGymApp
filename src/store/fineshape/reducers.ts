import { FineShape } from '@/types/fineshape/FineShape';
import { PayloadAction } from '@reduxjs/toolkit';

export const initialState: FineShape = {
    id: undefined,
    userAddress: undefined,
    userAddressComplement: undefined,
    userCep: undefined,
    isPhoneWhatsapp: undefined,
    userCpf: undefined,
    userWeight: undefined,
    userHeight: undefined,
    userAge: undefined,
    userWaist: undefined,
    userBelly: undefined,
    userChest: undefined,
    userImc: undefined,
    userFatPercentage: undefined,
    userMusclePercentage: undefined,
    userVisceralFatPercentage: undefined,
    userRM: undefined,
    userBodyAge: undefined,
    userEthnicity: undefined,
    userCity: undefined,
    userState: undefined,
    todayDate: undefined,
};

export const fineShapeReducer = {
    setFineShapeIntoState: (state: FineShape, action: PayloadAction<Partial<FineShape>>) => {
        const fineShape = action.payload;
        const newInfoForState = {
            ...state,
            ...fineShape,
        };

        return {
            ...newInfoForState,
        };
    },
};
