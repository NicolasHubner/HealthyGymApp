import TitlePattern from '@/components/atoms/TitlePattern';
import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import Cards from './components/Cards';
import Topics from './components/Topics';
import { ContainerTitle, Input, InputContainer, InputSearchIcon } from './style';

export default function Explorer() {
    return (
        <ScrollablePageWrapper padding={false}>
            <ContainerTitle>
                <TitlePattern size={32}>Explorar</TitlePattern>
            </ContainerTitle>
            <InputContainer>
                <InputSearchIcon />
                <Input placeholder="Pesquisar tópico" />
            </InputContainer>
            <Cards />
            <Topics />
        </ScrollablePageWrapper>
    );
}
