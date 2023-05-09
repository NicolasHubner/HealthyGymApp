import { FineShape } from '@/types/fineshape/FineShape';
import { saveFineshapeDataInStorage } from '@/utils/handleStorage';
import { PayloadAction } from '@reduxjs/toolkit';

export const initialState: FineShape = {
    id: undefined,
    token: undefined,
    username: undefined,
    email: undefined,
    provider: undefined,
    confirmed: undefined,
    blocked: undefined,
    name: undefined,
    birthdate: undefined,
    gender: undefined,
    weight: undefined,
    height: undefined,
    createdAt: undefined,
    updatedAt: undefined,
    goal_type: undefined,
    phone: undefined,
    foodRestrictions: undefined,
    passwordForRegister: undefined,
    isLogged: undefined,
    isCoach: undefined,
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
