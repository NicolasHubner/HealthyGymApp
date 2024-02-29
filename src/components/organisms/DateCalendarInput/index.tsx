import React, { useState } from 'react';
import { DateRangeProps, getUsefulInfoByDate } from '@/hooks/useCalendar';
import { Easing, Platform, Pressable } from 'react-native';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Text, useTheme, View } from 'native-base';
import { format } from 'date-fns';
import { Fontisto } from '@expo/vector-icons';
import Collapsible from 'react-native-collapsible';

type DateCalendarInputProps = {
    setDateForParent?: (date: Date) => void;
    initialDate: Date;
    title?: string;
};

export function DateCalendarInput({
    setDateForParent,
    initialDate,
    title,
}: DateCalendarInputProps): JSX.Element {
    const [selectedDate, setSelectedDate] = useState<DateRangeProps>({} as DateRangeProps);

    const [showDatePicker, setShowDatePicker] = useState(false);
    const { colors } = useTheme();

    const onChange = (_: any, selecteDate: any) => {
        const currentDate = selecteDate;
        const infoFromDate = getUsefulInfoByDate(currentDate);

        setSelectedDate(infoFromDate);

        if (setDateForParent) {
            setDateForParent(currentDate);
        }
    };

    const toggleDatePicker = () => {
        if (Platform.OS === 'android') {
            setShowDatePicker(false);
            DateTimePickerAndroid.open({
                value: initialDate,
                onChange,
                mode: 'date',
                is24Hour: true,
                maximumDate: new Date(Date.now()),
                display: 'spinner',
            });
        } else {
            setShowDatePicker(curr => !curr);
        }
    };
    if (Platform.OS === 'android') {
        return (
            <View px="16px" flexDir="row" justifyContent="space-between">
                <Pressable onPress={toggleDatePicker}>
                    <View alignItems={'center'} flexDir={'column'}>
                        <Text
                            fontSize={14}
                            color={'green.800'}
                            fontWeight={500}
                            textTransform={'uppercase'}>
                            {title || 'Alterar data'}
                        </Text>
                        <View
                            flexDir="row"
                            style={{ gap: 8 }}
                            borderColor={'black'}
                            borderWidth={2}
                            p={1}
                            px={4}
                            borderRadius={12}>
                            {initialDate && (
                                <Text fontSize={18} color="black" fontWeight={500}>
                                    {format(initialDate, 'dd/MM/yyyy')}
                                </Text>
                            )}
                        </View>
                    </View>
                </Pressable>

                {showDatePicker && (
                    <View mt="16px" w="100%">
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={initialDate}
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

    return (
        <View
            bg="green.500"
            pt="16px"
            px="16px"
            pb="32px"
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
                                {format(initialDate, 'dd/MM/yyyy')}
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
                            value={initialDate}
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
