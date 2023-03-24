import { TouchableOpacity } from 'react-native-gesture-handler';

import ArrowLeft from '@/assets/svg/arrow-left.svg';

import { Container } from './styles';
import { useNavigation } from '@react-navigation/native';
import { HeaderBackButtonProps } from '@react-navigation/native-stack/lib/typescript/src/types';

export function HeaderGoBackButton({ canGoBack }: HeaderBackButtonProps) {
    const { goBack } = useNavigation();

    return (
        <TouchableOpacity onPress={() => (canGoBack ? goBack() : null)}>
            <Container>
                <ArrowLeft />
            </Container>
        </TouchableOpacity>
    );
}
