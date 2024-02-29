import React from 'react';
import { Pressable } from 'react-native';
import { Text, useTheme, View } from 'native-base';
import { format } from 'date-fns';

import DateTimePicker from '@react-native-community/datetimepicker';
import { Fontisto } from '@expo/vector-icons';

interface AndroidDatePickerProps {
    date: Date;
    toggleDatePicker: () => void;
    showDatePicker: boolean;
    onChange: (event: any, selectedDate: any) => void;
    title?: string;
}

export function AndroidDatePicker({
    date,
    showDatePicker,
    toggleDatePicker,
    onChange,
    title,
}: AndroidDatePickerProps) {
    const { colors } = useTheme();

    return (
        <View bg="green.500" px="16px" w="100%" flexDir="row" justifyContent="space-between">
            <View flexDir="row" style={{ gap: 8 }}>
                <Text fontSize={18} fontWeight="bold" color="white">
                    {title || 'Data:'}
                </Text>
                {date && (
                    <Text fontSize={18} color="white">
                        {format(date, 'dd/MM/yyyy')}
                    </Text>
                )}
            </View>
            <Pressable onPress={toggleDatePicker}>
                <View flexDir="row" alignItems="center" style={{ gap: 8 }}>
                    <Fontisto name="date" size={12} color="white" />
                    <Text fontSize={16} color="white" textDecorationLine="underline">
                        Alterar data
                    </Text>
                </View>
            </Pressable>
            {showDatePicker && (
                <View mt="16px" w="100%">
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode="date"
                        themeVariant="light"
                        textColor={colors.black}
                        style={{
                            minWidth: '100%',
                            width: '100%',
                        }}
                        accentColor={colors.green[600]}
                        maximumDate={new Date(Date.now())}
                        onChange={onChange}
                    />
                </View>
            )}
        </View>
    );
}
