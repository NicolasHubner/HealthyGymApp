import { User } from '@/types/user';
import { KeyboardTypeOptions } from 'react-native';

export interface FineShape {
    id?: number;
    todayDate?: string | null;
    userCep?: string | null;
    userCity?: string | null;
    userState?: string | null;
    userAddress?: string | null;
    userEthnicity?: string | null;
    userAddressComplement?: string | null;
    isPhoneWhatsapp?: boolean;
    name?: string | null;
    phone?: string | null;
    birthdate?: string | null;
    gender?: string | null;
    userCpf?: string | null;
    userWeight?: string;
    userHeight?: string;
    email?: string | null;
    userAge?: string;
    userWaist?: string;
    userBelly?: string;
    userChest?: string;
    // IMC = Peso / (Altura * Altura) <- Peso em kg e Altura em metros ao quadrado
    userImc?: string;
    userFatPercentage?: string;
    userMusclePercentage?: string;
    userVisceralFatPercentage?: string;
    userBodyAge?: string;
    userRM?: string;
    coachId?: number | null;
}

export interface FineShapeScreen {
    // KeyboardTypeOptions
    id: keyof FineShape;
    title: string;
    placeholder: string;
    buttonText: string;
    keyboardType: KeyboardTypeOptions;
    mask: (value: any) => {
        masked: string;
        raw: string;
        error: boolean;
        message: string;
    };
    maxLength?: number;
}

export interface FineShapeFromApi {
    id?: number;
    name?: string;
    phone?: string;
    gender?: string;
    ethnicity?: string;
    address?: string;
    complement?: string;
    zip?: string;
    birthdate?: string;
    city?: string;
    state?: string;
    country?: string;
    isPhoneWhatsapp?: true;
    cpf?: string;
    weight?: number;
    height?: number;
    age?: number;
    waist?: number;
    belly?: number;
    chest?: number;
    imc?: number;
    body_fat?: number;
    body_age?: number;
    muscle?: number;
    visceral_fat?: number;
    rm?: number;
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
    email?: string;
    coach: {
        data: {
            attributes: User;
        } | null;
    };
}

export interface FineShapeResponse {
    data: {
        id?: number;
        attributes?: FineShapeFromApi;
    }[];
    meta: {
        pagination: {
            page?: number;
            pageSize?: number;
            pageCount?: number;
            total?: number;
        };
    };
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

export interface FineShapeEvaluationDetail {
    id?: number;
    user: {
        name?: string | null;
        email?: string | null;
        age?: number | null;
        gender?: string | null;
        height?: number | null;
        bodyMass?: number | null;
        bodyAge?: number | null;
        bodyFat?: number | null;
        visceralFat?: number | null;
        bustSize?: number | null;
        bellySize?: number | null;
        waistSize?: number | null;
        basalMetabolism?: number | null;
        weight?: number | null;
        imc?: number | null;
    };
    histories?: {
        weight?: number[];
        imc?: number[];
        bodyAge?: number[];
        month?: string[];
    };
}
