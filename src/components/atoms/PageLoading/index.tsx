import { Container, ImageLogo, Loading } from './styles';

import logoImg from '@/assets/icone.png';

export function PageLoading() {
    return (
        <Container>
            <ImageLogo source={logoImg} alt="Logo" />
            <Loading />
        </Container>
    );
}
