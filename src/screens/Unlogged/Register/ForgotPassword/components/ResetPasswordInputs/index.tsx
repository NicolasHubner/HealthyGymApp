import { ControlledInput } from '@/components/organisms/ControlledInput';
// import { renderPasswordInput } from '../PasswordInput';

interface ResetPasswordInputsProps {
  control: any;
  errors: any;
}

export function ResetPasswordInputs({ control, errors }: ResetPasswordInputsProps) {
  return (
    <>
      <ControlledInput
        hookFormValidations={{ control, errors }}
        inputName="code"
        errorMessage="Insira um código válido"
        placeholder="Insira seu código aqui"
        iconName="email-lock"
        isRequired
      />

      <ControlledInput
        hookFormValidations={{ control, errors }}
        inputName="newPassword"
        placeholder="Digite sua nova senha"
        errorMessage="A senha deve ter 6 dígitos"
        iconName="lock-outline"
        isRequired
        secureTextEntry
        // render={({ onChange, value }) =>
        //   renderPasswordInput({ onChange, value, placeholder: 'Digite sua nova senha' })
        // }
      />

      <ControlledInput
        hookFormValidations={{ control, errors }}
        inputName="newPasswordRepeat"
        errorMessage="A senha deve ter 6 dígitos"
        placeholder="Repita sua nova senha"
        iconName="lock-outline"
        isRequired
        secureTextEntry
        // render={({ onChange, value }) =>
        //   renderPasswordInput({ onChange, value, placeholder: 'Repita sua nova senha' })
        // }
      />
    </>
  );
}
