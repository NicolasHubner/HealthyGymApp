import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import Ionicons from '@expo/vector-icons/Ionicons';

interface DropDownProps {
  setFood: React.Dispatch<React.SetStateAction<string>>;
  food: string;
  foods: {
    id: number;
    name: string;
  }[];
}

export function DropDown({ setFood, food, foods }: DropDownProps) {
  return (
    <>
      <RNPickerSelect
        style={{
          inputIOS: {
            // width: '90%',
            fontSize: 16,
            color: '#4C5980',
            paddingVertical: 12,
            borderRadius: 8,
            backgroundColor: '#F7F8F8',
            borderColor: 'purple',
            height: 56,
            fontFamily: 'Rubik_400Regular',
          },
          inputAndroidContainer: {
            backgroundColor: '#F7F8F8',
            paddingLeft: 20,
            borderRadius: 8,
            // width: '90%',
          },
          inputAndroid: {
            backgroundColor: '#F7F8F8',
            paddingVertical: 8,
            borderRadius: 8,
            height: 56,
            fontSize: 16,
            color: '#4C5980',
            fontFamily: 'Rubik_400Regular',
          },
          placeholder: {
            color: '#B7B7CC',
            fontSize: 16,
          },
          viewContainer: {
            backgroundColor: '#F7F8F8',
            paddingLeft: 45,
            borderRadius: 8,
          },
          iconContainer: {
            borderRadius: 8,
            top: 18,
            right: 12,
            height: 56,
          },
        }}
        placeholder={{
          label: foods[0].name,
          value: foods[0].name,
        }}
        useNativeAndroidPickerStyle={false}
        Icon={() => <Ionicons name="chevron-down" size={22} color="gray" />}
        onValueChange={value => setFood(value)}
        value={food}
        items={[
          { label: foods[1].name, value: foods[1].name },
          { label: foods[2].name, value: foods[2].name },
        ]}
      />
    </>
  );
}
