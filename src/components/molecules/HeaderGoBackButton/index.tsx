import { TouchableOpacity } from 'react-native-gesture-handler';

import ArrowLeft from '@/assets/svg/arrow-left.svg';

import { Container } from './styles';
import { useNavigation } from '@react-navigation/native';

interface HeaderGoBackButtonProps {
    canGoBack?: boolean;
    onPress?: () => void;
}

export function HeaderGoBackButton({ canGoBack, onPress = undefined }: HeaderGoBackButtonProps) {
    const { goBack } = useNavigation();

    return (
        <TouchableOpacity
            onPress={() => (canGoBack && !onPress ? goBack() : onPress ? onPress() : null)}>
            <Container>
                <ArrowLeft />
            </Container>
        </TouchableOpacity>
    );
}
