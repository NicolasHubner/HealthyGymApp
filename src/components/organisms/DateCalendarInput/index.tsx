import React, { useState } from 'react';
import { DateRangeProps, getUsefulInfoByDate } from '@/hooks/useCalendar';
import { Platform, Pressable } from 'react-native';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Modal, Text, useTheme, View } from 'native-base';
import { format } from 'date-fns';

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
        if(Platform.OS === 'ios'){
            setShowDatePicker(false)
        }

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
            px="16px"
            flexDir={'column'}
            >
            <View flexDir={'column'}>
                <View>
                    <Pressable onPress={() => setShowDatePicker(curr => !curr)}>
                        <View flexDir="column" alignItems="center" justifyContent="space-between">
                        <Text
                            fontSize={14}
                            color={'green.800'}
                            fontWeight={500}
                            textTransform={'uppercase'}>
                            {title || 'Alterar data'}
                        </Text>
                        <View
                            
                            borderColor={'black'}
                            borderWidth={2}
                            p={1}
                            px={4}
                            borderRadius={12}>
                                <Text
                                    fontSize={18}
                                    color="black"
                                    textDecorationLine="underline"
                                    fontWeight={500}>
                                    {format(initialDate, 'dd/MM/yyyy')}
                                </Text>
                                </View>
                        </View>
                    </Pressable>
                </View>
                <Modal
                isOpen={showDatePicker}
                >
                    <Pressable
                    onPress={() => setShowDatePicker(false)}
                    style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                        
                    <View width={'90%'} borderRadius={16} height={'45%'} backgroundColor={'gray.700'}>

                        <DateTimePicker
                            testID="dateTimePicker"
                            value={initialDate}
                            mode="date"
                            display="inline"
                            themeVariant="dark"
                            locale="pt-BR"
                            textColor={colors.green[600]}
                            accentColor={colors.green[600]}
                            style={{ width: '100%', minWidth: '100%', height: '80%' }}
                            maximumDate={new Date(Date.now())}
                            onChange={onChange}
                        />
                    </View>
                    </Pressable>    
                    </Modal>
                
            </View>
        </View>
    );
}
