import * as yup from 'yup';

export const fieldsValidationSchema = yup.object().shape({
    email: yup.string().required('O email não pode ser vazio').email('Digite um email válido'),
    password: yup
        .string()
        .required('A senha não pode ser vazia')
        .min(6, 'A senha deve conter pelo menos 6 dígitos'),
});
