import { User } from '@/types/user';
import { KeyboardTypeOptions } from 'react-native';

export interface FineShape extends User {
    todayDate?: string;
    userCep?: string;
    userCity?: string;
    userState?: string;
    userAddress?: string;
    userEthnicity?: string;
    userAddressComplement?: string;
    isPhoneWhatsapp?: boolean;
    userCpf?: string;
    userWeight?: number;
    userHeight?: number;
    userAge?: number;
    userWaist?: number;
    userBelly?: number;
    userChest?: number;
    // IMC = Peso / (Altura * Altura) <- Peso em kg e Altura em metros ao quadrado
    userImc?: number;
    userFatPercentage?: number;
    userMusclePercentage?: number;
    userVisceralFatPercentage?: number;
    userBodyAge?: number;
    userRM?: number;
}

export interface FineShapeScreen {
    // KeyboardTypeOptions
    id: keyof FineShape;
    title: string;
    placeholder: string;
    buttonText: string;
    keyboardType: KeyboardTypeOptions;
    mask?: (value: any) => any;
    maxLength?: number;
}
