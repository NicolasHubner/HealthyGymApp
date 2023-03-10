import { View } from 'react-native';
import { useTheme } from 'styled-components';

import { AntDesign } from '@expo/vector-icons';

import { Container, Title, Text, VerticalBar } from './styles';

interface SuccessToast {
    title: string;
    text: string;
    type: 'success' | 'warning' | 'error';
    onPress?: () => void;
}

export function Toast({ title, text, type = 'success' }: SuccessToast) {
    const { colors } = useTheme();

    return (
        <Container>
            <VerticalBar type={type} />

            {type === 'success' && (
                <AntDesign name="checkcircle" size={24} color={colors.green[700]} />
            )}

            {type === 'error' && <AntDesign name="closecircle" size={24} color={colors.red[500]} />}

            {type === 'warning' && (
                <AntDesign name="infocirlce" size={24} color={colors.blue[300]} />
            )}

            <View
                style={{
                    width: '85%',
                    height: '100%',
                    justifyContent: 'center',
                    gap: 2,
                }}>
                <Title>{title} </Title>
                <Text>{text}</Text>
            </View>
        </Container>
    );
}
