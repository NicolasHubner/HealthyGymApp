import { Image } from 'react-native';
import { Container, Loading } from './styles';

import logoImg from '@/assets/logo.png';

export function PageLoading() {
    return (
        <Container>
            <Image source={logoImg} alt="Logo" resizeMethod="resize" resizeMode="contain" />
            <Loading />
        </Container>
    );
}
