import { User } from '@/types/user';
import { KeyboardTypeOptions } from 'react-native';

export interface FineShapeScreen {
    // KeyboardTypeOptions
    id: keyof FineShape;
    title: string;
    placeholder: string;
    buttonText: string;
    keyboardType: KeyboardTypeOptions;
}

export interface FineShape {
    userId?: User['id'];
    todayDate?: string;
    userName?: string;
    userPhone?: string;
    userAddress?: string;
    userAddressComplement?: string;
    userCep?: string;
    userBirthdate?: string;
    userEmail?: string;
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
    userRM?: number;
}

export interface PersonFineShape {
    name: string;
    phone: string;
    genre: string;
    etnia: string;
    endereco: string;
    complement?: string;
    cep: string;
    data_nasc: string;
    city: string;
    state: string;
    email: string;
    isPhoneWhatsapp: boolean;
    cpf: string;
    weight: number;
    height: number;
    age: number;
    waist: number;
    belly: number;
    chest: number;
    imc: number;
    body_fat: number;
    body_age: number;
    muscle: number;
    visceral_fat: number;
    rm: number;
}
