import React from 'react';
import { CheckBox, ContainerCheckBox, TextCheckBox } from './style';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface CheckBoxProps {
    setGender: React.Dispatch<React.SetStateAction<string>>;
    genreState: string;
}

export default function NewCheckBox({ setGender, genreState }: CheckBoxProps) {
    return (
        <ContainerCheckBox>
            <TouchableOpacity onPress={() => setGender('M')}>
                <CheckBox>
                    <MaterialCommunityIcons
                        // onPress={() => setGender}
                        name={genreState === 'M' ? 'checkbox-marked' : 'checkbox-blank-outline'}
                        size={24}
                        color={genreState === 'M' ? '#90D692' : '#7B6F72'}
                    />
                    <TextCheckBox>Masculino</TextCheckBox>
                </CheckBox>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setGender('F')}>
                <CheckBox>
                    <MaterialCommunityIcons
                        // onPress={() => setGender}
                        name={genreState === 'F' ? 'checkbox-marked' : 'checkbox-blank-outline'}
                        size={24}
                        color={genreState === 'F' ? '#90D692' : '#7B6F72'}
                    />
                    <TextCheckBox>Feminino</TextCheckBox>
                </CheckBox>
            </TouchableOpacity>
        </ContainerCheckBox>
    );
}
