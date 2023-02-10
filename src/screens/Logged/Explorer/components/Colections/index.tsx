import TitlePattern from '@/components/atoms/TitlePattern';
import { ContainerColection, ContainerSubtitle } from './style';

export default function Colections() {
    return (
        <ContainerColection>
            <ContainerSubtitle>
                <TitlePattern size={20}>Coleções</TitlePattern>
            </ContainerSubtitle>
        </ContainerColection>
    );
}
