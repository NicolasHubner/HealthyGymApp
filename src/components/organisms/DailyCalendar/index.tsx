import React, { useState } from 'react';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
import { DateRangeProps, getUsefulInfoByDate } from '@/hooks/useCalendar';

import { AndroidDatePicker } from '@/components/refactor/AndroidDatePicker';
import { IphoneDatePicker } from '@/components/refactor/IphoneDatePicker';

type DailyCalendarProps = {
    yearLimit?: number;
    setDateForParent?: (date: Date) => void;
    title?: string;
};

export function DailyCalendar({ setDateForParent, title }: DailyCalendarProps) {
    const [selectedDate, setSelectedDate] = useState<DateRangeProps>({} as DateRangeProps);
    const [date, setDate] = useState(new Date(Date.now()));
    const [showDatePicker, setShowDatePicker] = useState(false);

    const onChange = (_: any, selecteDate: any) => {
        const currentDate = selecteDate;
        const infoFromDate = getUsefulInfoByDate(currentDate);

        setDate(currentDate);
        setSelectedDate(infoFromDate);

        if (setDateForParent) {
            setDateForParent(currentDate);
        }
    };

    const toggleDatePicker = () => {
        if (Platform.OS === 'android') {
            setShowDatePicker(false);
            DateTimePickerAndroid.open({
                value: date,
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
            <AndroidDatePicker
                title={title}
                date={date}
                onChange={onChange}
                toggleDatePicker={toggleDatePicker}
                showDatePicker={showDatePicker}
            />
        );
    }

    return (
        <IphoneDatePicker
            date={date}
            onChange={onChange}
            showDatePicker={showDatePicker}
            setShowDatePicker={setShowDatePicker}
        />
    );
}
