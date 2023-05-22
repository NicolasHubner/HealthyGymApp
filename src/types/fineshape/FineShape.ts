import { User } from '@/types/user';
import { KeyboardTypeOptions } from 'react-native';

export interface FineShape {
    id?: number;
    todayDate?: string;
    userCep?: string;
    userCity?: string;
    userState?: string;
    userAddress?: string;
    userEthnicity?: string;
    userAddressComplement?: string;
    isPhoneWhatsapp?: boolean;
    name?: string;
    phone?: string;
    birthdate?: string;
    gender?: string;
    userCpf?: string;
    userWeight?: number;
    userHeight?: number;
    email?: string;
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
    coachId?: number;
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
    };
}
