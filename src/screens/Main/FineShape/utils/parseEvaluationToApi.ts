import { FineShape } from '@/types/fineshape/FineShape';

export function parseEvaluationDataToApi(fineShape: FineShape) {
    const { name, phone, gender, birthdate, isPhoneWhatsapp, email, coachId } = fineShape;

    const height = Number(fineShape.userHeight) / 100;
    const weight = Number(fineShape?.userWeight);

    // eslint-disable-next-line prettier/prettier
    const imc = weight && height ? weight / (height ** 2) : 0;

    const parsedBirthdate = (value?: string | null) => {
        if (!value) return value;

        const cleaned = value?.replace(/\D/g, '');
        const match = cleaned?.match(/^(\d{2})(\d{2})(\d{4})$/);

        if (match) {
            return `${match[3]}-${match[2]}-${match[1]}`;
        }

        return value;
    };

    return {
        name,
        phone,
        gender: gender?.toLowerCase() === 'masculino' ? 'M' : 'F',
        ethnicity: fineShape.userEthnicity,
        address: fineShape.userAddress,
        complement: fineShape?.userAddressComplement ?? '',
        zip: fineShape.userCep,
        birthdate: parsedBirthdate(birthdate),
        city: fineShape.userCity,
        state: fineShape.userState,
        country: 'Brasil',
        isPhoneWhatsapp,
        cpf: fineShape.userCpf,
        weight: fineShape.userWeight,
        height: fineShape.userHeight,
        age: fineShape.userAge,
        waist: fineShape.userWaist,
        belly: fineShape.userBelly,
        chest: fineShape.userChest,
        imc: imc.toFixed(1),
        body_fat: fineShape.userFatPercentage,
        body_age: fineShape.userBodyAge,
        muscle: fineShape.userMusclePercentage,
        visceral_fat: fineShape.userVisceralFatPercentage,
        rm: fineShape.userRM,
        email,
        coach: coachId,
    };
}
