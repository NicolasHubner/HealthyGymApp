import React from 'react';
import { Easing, Pressable } from 'react-native';
import { Text, useTheme, View } from 'native-base';
import { format } from 'date-fns';

import DateTimePicker from '@react-native-community/datetimepicker';
import { Fontisto } from '@expo/vector-icons';

import Collapsible from 'react-native-collapsible';

interface IphoneDatePickerProps {
    date: Date;
    showDatePicker: boolean;
    onChange: (event: any, selectedDate: any) => void;
    setShowDatePicker: React.Dispatch<React.SetStateAction<boolean>>;
}

export function IphoneDatePicker({
    date,
    showDatePicker,
    onChange,
    setShowDatePicker,
}: IphoneDatePickerProps) {
    const { colors } = useTheme();

    return (
        <View
            bg="green.500"
            pt="16px"
            px="16px"
            pb="32px"
            w="100%"
            alignItems="center"
            justifyContent="space-between">
            <View>
                <View>
                    <Pressable onPress={() => setShowDatePicker(curr => !curr)}>
                        <View flexDir="row" alignItems="center" justifyContent="space-between">
                            <View flexDir="row" alignItems="center" style={{ gap: 8 }}>
                                <Fontisto name="date" size={16} color="white" />
                                <Text
                                    fontSize={18}
                                    color="white"
                                    textDecorationLine="underline"
                                    fontWeight="bold">
                                    {showDatePicker ? 'Esconder calendário' : 'Alterar data'}
                                </Text>
                            </View>
                            <Text
                                textDecorationLine="underline"
                                color="white"
                                fontWeight="bold"
                                fontSize={18}>
                                {format(date, 'dd/MM/yyyy')}
                            </Text>
                        </View>
                    </Pressable>
                </View>
                <View mt="8px">
                    <Collapsible
                        collapsed={!showDatePicker}
                        align="bottom"
                        duration={500}
                        easing={Easing.ease}>
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode="date"
                            display="inline"
                            themeVariant="dark"
                            locale="pt-BR"
                            textColor={colors.white}
                            accentColor={colors.white}
                            style={{ width: '100%', minWidth: '100%' }}
                            maximumDate={new Date(Date.now())}
                            onChange={onChange}
                        />
                    </Collapsible>
                </View>
            </View>
        </View>
    );
}
