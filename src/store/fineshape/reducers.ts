import { FineShape } from '@/types/fineshape/FineShape';
import { saveFineshapeDataInStorage } from '@/utils/handleStorage';
import { PayloadAction } from '@reduxjs/toolkit';

export const initialState: FineShape = {
    userId: undefined,
    todayDate: undefined,
    userName: undefined,
    userPhone: undefined,
    userAddress: undefined,
    userAddressComplement: undefined,
    userCep: undefined,
    userBirthdate: undefined,
    userEmail: undefined,
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
};

export const fineShapeReducer = {
    setFineshapInfo: (state: FineShape, action: PayloadAction<Partial<FineShape>>) => {
        const fineShape = action.payload;
        const newInfoForState = {
            ...state,
            ...fineShape,
        };

        saveFineshapeDataInStorage({
            ...newInfoForState,
        });

        return {
            ...newInfoForState,
        };
    },
};
