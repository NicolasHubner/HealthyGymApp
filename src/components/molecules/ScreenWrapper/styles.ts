import { Platform } from 'react-native';
import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const Container = styled.View`
    padding: 16px;
    align-items: center;
`;

export const KeyboardAvoidingContainer = styled.KeyboardAvoidingView.attrs({
    behavior: Platform.OS === 'ios' ? 'padding' : undefined,
})`
    flex: 1;
    width: 100%;
`;

export const ScrollableContainer = styled.ScrollView.attrs({
    contentContainerStyle: {
        padding: scale(16),
    },
})`
    flex: 1;
    width: 100%;
`;
