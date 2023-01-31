import { KeyboardTypeOptions, NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';

import { Container, InputWeightAndHeight, Icon } from './styles';

interface RegisterInputProps {
  onBlur: ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void) | undefined;
  onChangeText: ((text: string) => void) | undefined;
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
  iconName?: string;
  value?: string;
  secureTextEntry?: boolean;
}

export function RegisterInput({
  onBlur,
  onChangeText,
  keyboardType = 'default',
  placeholder = undefined,
  iconName = undefined,
  value,
  secureTextEntry = false,
}: RegisterInputProps) {
  return (
    <Container>
      {!!iconName && <Icon name={iconName} size={20} />}

      <InputWeightAndHeight
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        returnKeyType="next"
        placeholder={placeholder}
        autoCapitalize="none"
      />
    </Container>
  );
}
