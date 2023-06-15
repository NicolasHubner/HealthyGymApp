import React from 'react';
import { Linking, Pressable } from 'react-native';
import { Text } from 'native-base';
import { useTheme } from 'styled-components';

export function OmsAdvise() {
    const { colors } = useTheme();
    return (
        <Pressable
            onPress={() =>
                Linking.openURL('https://www.who.int/health-topics/healthy-diet#tab=tab_1')
            }>
            <Text color={colors.blue_metal[500]} fontSize="12px" textDecorationLine="underline">
                *Veja as informações da OMS aqui.
            </Text>
            <Text color={colors.blue_metal[500]} fontSize="12px">
                *Procure sempre um nutricionista para te auxiliar.
            </Text>
        </Pressable>
    );
}
