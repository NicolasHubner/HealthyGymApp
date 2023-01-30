import { TextRequired } from '@/components/atoms/TextRequired';
import { RegisterInput } from '@/components/molecules/RegisterInput';
import { Controller, ControllerRenderProps, FieldErrorsImpl } from 'react-hook-form';
import { KeyboardTypeOptions } from 'react-native';
import { ContainerKGandM, InputContainerWeightAndHeight, TextKGandM } from './styles';

interface ControlledInputProps {
  hookFormValidations: {
    control: any;
    errors: Partial<FieldErrorsImpl<any>>;
  };
  isRequired?: boolean;
  inputName: string;
  iconName?: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  errorMessage?: string;
  unitIndicador?: string;
  render?: (field: Partial<ControllerRenderProps>) => React.ReactElement;
}

export function ControlledInput({
  hookFormValidations,
  isRequired = true,
  inputName,
  iconName,
  placeholder = '',
  keyboardType = 'default',
  errorMessage,
  unitIndicador,
  render = undefined,
}: ControlledInputProps) {
  const { control, errors } = hookFormValidations;

  return (
    <>
      <Controller
        control={control}
        rules={{
          required: isRequired,
        }}
        name={inputName ?? 'default-input-name'}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            {!!render && render({ onBlur, onChange, value })}

            {!render && (
              <InputContainerWeightAndHeight>
                <RegisterInput
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  iconName={iconName}
                  placeholder={placeholder}
                  keyboardType={keyboardType}
                />
                {!!unitIndicador && (
                  <ContainerKGandM>
                    <TextKGandM>{unitIndicador}</TextKGandM>
                  </ContainerKGandM>
                )}
              </InputContainerWeightAndHeight>
            )}

            {errors[inputName] && !!errorMessage && (
              <TextRequired width={90}>{errorMessage}</TextRequired>
            )}
          </>
        )}
      />
    </>
  );
}
