import { useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { ClockTimeContainer, PickerSeparator } from './styles';

interface TimePickerProps {
    hour: number;
    minutes: number;
    setHour: (hour: number) => void;
    setMinutes: (minutes: number) => void;
}

export function TimePicker({ hour, minutes, setHour, setMinutes }: TimePickerProps) {
    const [isEditable, setIsEditable] = useState(false);
    const [time, setTime] = useState({
        hour: '',
        minutes: '',
    });

    const hourRef = useRef<TextInput>(null);
    const minuteRef = useRef<TextInput>(null);

    const renderTimeInput = (type: string, ref: React.RefObject<TextInput>) => {
        return (
            <TextInput
                ref={ref}
                placeholder={
                    type === 'hour'
                        ? String(hour).padStart(2, '0')
                        : String(minutes).padStart(2, '0')
                }
                autoFocus={type === 'hour' && isEditable}
                maxLength={2}
                value={type === 'hour' ? time.hour : time.minutes}
                keyboardType="numeric"
                onBlur={() => {
                    if (type === 'hour') {
                        setHour(Number(time.hour));
                        return;
                    }
                    setMinutes(Number(time.minutes));
                    setIsEditable(false);
                }}
                onChangeText={e => {
                    if (e.length <= 0) {
                        setTime(current => {
                            return {
                                ...current,
                                [type]: '',
                            };
                        });
                        return;
                    }

                    const changedValueParsed = Number(
                        e.replace(/,/g, '.').replace(/-/g, '').replace(' ', '').replace(/\.+/g, '.')
                    );

                    if (isNaN(changedValueParsed)) {
                        setTime(current => {
                            return {
                                ...current,
                                [type]: '',
                            };
                        });
                        return;
                    }

                    if (String(changedValueParsed).length <= 0) {
                        setTime(current => {
                            return {
                                ...current,
                                [type]: '',
                            };
                        });
                        return;
                    }

                    if (type === 'hour') {
                        setTime(current => {
                            if (changedValueParsed > 23) {
                                return {
                                    ...current,
                                    hour: '23',
                                };
                            } else if (changedValueParsed < 0) {
                                return {
                                    ...current,
                                    hour: '0',
                                };
                            }

                            return {
                                ...current,
                                hour: String(changedValueParsed),
                            };
                        });

                        if (e.length >= 2) {
                            minuteRef.current?.focus();
                        }
                    } else {
                        setTime(current => {
                            if (changedValueParsed > 59) {
                                return {
                                    ...current,
                                    minutes: '59',
                                };
                            } else if (changedValueParsed < 0) {
                                return {
                                    ...current,
                                    minutes: '0',
                                };
                            }

                            return {
                                ...current,
                                minutes: String(changedValueParsed),
                            };
                        });

                        if (String(changedValueParsed).length === 2) {
                            minuteRef.current?.blur();
                            setIsEditable(false);
                        }
                    }
                }}
                onSubmitEditing={() => {
                    if (type === 'hour') {
                        minuteRef.current?.focus();
                    }
                }}
                style={{
                    fontFamily: 'Rubik_700Bold',
                    color: '#2c2c2c',
                    letterSpacing: 0.5,
                    width: 60,
                    fontSize: 40,
                    height: 'auto',
                }}
            />
        );
    };

    useEffect(() => {
        if (time.hour.length === 2) {
            setHour(Number(time.hour));
        }

        if (time.minutes.length === 2) {
            setMinutes(Number(time.minutes));
        }
    }, [time, setHour, setMinutes]);

    return (
        <ClockTimeContainer>
            {isEditable ? (
                <>
                    <View>{renderTimeInput('hour', hourRef)}</View>
                    <PickerSeparator>:</PickerSeparator>
                    <View>{renderTimeInput('minutes', minuteRef)}</View>
                </>
            ) : (
                <TouchableOpacity
                    onPress={() => setIsEditable(true)}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <View>
                        <Text
                            style={{
                                fontFamily: 'Rubik_700Bold',
                                color: '#2c2c2c',
                                letterSpacing: 0.5,
                                width: 60,
                                fontSize: 40,
                                height: 'auto',
                            }}>
                            {String(hour).padStart(2, '0')}
                        </Text>
                    </View>
                    <PickerSeparator>:</PickerSeparator>
                    <View>
                        <Text
                            style={{
                                fontFamily: 'Rubik_700Bold',
                                color: '#2c2c2c',
                                letterSpacing: 0.5,
                                width: 60,
                                fontSize: 40,
                                height: 'auto',
                            }}>
                            {String(minutes).padStart(2, '0')}
                        </Text>
                    </View>
                </TouchableOpacity>
            )}
        </ClockTimeContainer>
    );
}
