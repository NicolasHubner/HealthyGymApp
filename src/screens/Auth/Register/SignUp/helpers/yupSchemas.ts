import * as yup from 'yup';

const passwordSchema = yup
    .string()
    .required('O campo de senha não pode estar vazio')
    .min(6, 'São necessários pelo menos 6 caracteres');

const emailSchema = yup
    .string()
    .required('O campo de e-mail é obrigatório')
    .email('Insira um e-mail válido');

const formShape = yup.object().shape({
    name: yup.string().required('O campo "Nome" é obrigatório'),
    phone: yup
        .string()
        .required('O campo "Telefone" é obrigatório')
        .transform((value, original) => {
            if (original) {
                return original.replace(/\D/g, '');
            }

            return value;
        })
        .max(11)
        .matches(/^\d{11}$/, 'Número de telefone inválido'),
    password: passwordSchema,
    email: emailSchema,
});

export { formShape };
