import React from 'react';
import { InputCreateFood } from './style';
import { KeyboardType, NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';
import { TextRequired } from '@/components/atoms/TextRequired';

interface CreateFoodInputProps {
    placeholder?: string;
    onChangeText?: ((text: string) => void) | undefined;
    value?: string;
    secureTextEntry?: boolean;
    maxLength?: number;
    multiline?: boolean;
    keyboardType?: KeyboardType;
    onBlur?: ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void) | undefined;
    error?: string;
}

export default function CreateFoodInput({
    placeholder,
    onChangeText,
    value,
    secureTextEntry = false,
    maxLength = 9999,
    keyboardType = 'default',
    onBlur,
    multiline = false,
    error,
}: CreateFoodInputProps) {
    return (
        <>
            <InputCreateFood
                placeholder={placeholder}
                onChangeText={onChangeText}
                value={value}
                secureTextEntry={secureTextEntry}
                maxLength={maxLength}
                keyboardType={keyboardType}
                onBlur={onBlur}
                multiline={multiline}
                style={multiline ? { textAlignVertical: 'top', height: 100, paddingTop: 8 } : {}}
            />
            {!!error && <TextRequired>{error}</TextRequired>}
        </>
    );
}
