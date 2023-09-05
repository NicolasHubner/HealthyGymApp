import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Text } from 'native-base';
import { useTheme } from 'styled-components';
import React from 'react';

export const setNameGoals = (goal: string) => {
    switch (goal) {
        case 'moderate-cardio':
            return 'Voltar à forma';
        case 'advanced-cardio':
            return 'Defina o corpo';
        case 'strength-muscle':
            return 'Aumente a massa';
        case 'desafio-15':
            return 'Desafio 15';
        default:
            return 'Voltar à forma';
    }
};

interface IStudentLevel {
    name: string;
    id: string;
}

export const ArrayGoals: IStudentLevel[] = [
    {
        id: 'moderate-cardio',
        name: 'Voltar à forma',
    },
    {
        id: 'advanced-cardio',
        name: 'Defina o corpo',
    },
    {
        id: 'strength-muscle',
        name: 'Aumente a massa',
    },
    {
        id: 'desafio-15',
        name: 'Desafio 15',
    },
];

interface IRenderCard {
    item: IStudentLevel;
    index: number;
    setStudentLevel: React.Dispatch<React.SetStateAction<string>>;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RenderCard = ({ item, index, setStudentLevel, setModal }: IRenderCard) => {
    const { colors } = useTheme();
    return (
        <TouchableOpacity
            key={index}
            style={{
                flexDirection: 'row',
                gap: 20,
                borderRadius: 8,
                // backgroundColor: colors.gray[200],
                alignItems: 'center',
                // height: 40,
                paddingHorizontal: 16,
                paddingVertical: 12,
                marginVertical: 8,
            }}
            onPress={() => {
                setStudentLevel(setNameGoals(item.id));
                setModal(false);
            }}>
            <MaterialIcons name="group" size={20} color={colors.gray[600]} />
            <Text
                fontFamily={'Rubik_500Medium'}
                fontSize={14}
                letterSpacing={0.5}
                color={colors.black}>
                {item.name}
            </Text>
        </TouchableOpacity>
    );
};
