import React from 'react';
import { Text, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';
import Picker from '@ouroboros/react-native-picker';

import { useTheme } from 'styled-components';

interface DropDownProps {
    setFood: React.Dispatch<React.SetStateAction<string>>;
    food: string;
    foods: {
        id: number;
        name: string;
    }[];
}

const renderIcon = () => <Ionicons name="chevron-down" size={22} color="gray" />;

export function DropDown({ setFood, food, foods }: DropDownProps) {
    const { colors, font_family } = useTheme();

    const renderDropdownContent = () => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: colors.gray[100],
                    borderRadius: 16,
                    justifyContent: 'space-between',
                    width: '100%',
                    paddingVertical: 12,
                    paddingHorizontal: 20,
                }}>
                <Text style={{ color: colors.blue_metal[500] }}>{food}</Text>
                {renderIcon()}
            </View>
        );
    };

    return (
        <View>
            <Picker
                onChanged={setFood}
                options={foods.map(item => ({ value: item.name, text: item.name }))}
                style={{
                    fontFamily: font_family.regular,
                    color: colors.blue_metal[500],
                    fontSize: 13,
                    letterSpacing: 0.5,
                    width: '100%',
                }}
                value={food}
                component={renderDropdownContent}
            />
        </View>
    );
}
