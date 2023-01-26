import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import Ionicons from '@expo/vector-icons/Ionicons';

interface DropDownProps {
  setGender: React.Dispatch<React.SetStateAction<string>>;
  gender: string;
}

export function DropDown({ setGender, gender }: DropDownProps) {
  return (
    <RNPickerSelect
      style={{
        inputIOS: {
          fontSize: 12,
          color: '#9C9EB9',
          paddingVertical: 12,
          borderRadius: 8,
          backgroundColor: '#F7F8F8',
          borderColor: 'purple',
          fontFamily: 'Rubik_400Regular',
          height: 48,
        },
        inputAndroidContainer: {
          backgroundColor: '#F7F8F8',
          paddingHorizontal: 45,
          borderRadius: 8,
        },
        inputAndroid: {
          backgroundColor: '#F7F8F8',
          paddingVertical: 8,
          fontFamily: 'Rubik_400Regular',
          borderRadius: 8,
          height: 48,
          fontSize: 12,
          color: '#9C9EB9',
        },
        placeholder: {
          color: '#B7B7CC',
          fontSize: 12,
        },
        viewContainer: {
          backgroundColor: '#F7F8F8',
          paddingLeft: 45,
          borderRadius: 8,
        },
        iconContainer: {
          borderRadius: 8,
          top: 10,
          right: 12,
          height: 48,
        },
      }}
      placeholder={{
        label: 'Escolha o Sexo',
        value: null,
      }}
      Icon={() => <Ionicons name="chevron-down" size={22} color="gray" />}
      useNativeAndroidPickerStyle={false}
      onValueChange={value => setGender(value)}
      value={gender}
      items={[
        { label: 'Masculino', value: 'male' },
        { label: 'Feminino', value: 'female' },
      ]}
    />
  );
}
