import { Section, SectionTitle } from '../../styles';
import {
    ImageSizeImport,
    TextCm,
    TextSize,
    TextTitle,
    TextsContainer,
    ViewImageInfo,
    ViewTextSize,
    ViewTextsSizes,
} from './style';

interface ImportantSizesProps {
    waist: number;
    belly: number;
    chest: number;
    gender: string;
}

export const ImportantsSizes = ({ waist, belly, chest, gender }: ImportantSizesProps) => {
    const data = [
        {
            id: 1,
            title: 'Medida busto',
            color: '#F2C94C',
            value: chest.toString(),
        },
        {
            id: 2,
            title: 'Medida barriga',
            color: '#2F80ED',
            value: belly.toString(),
        },
        {
            id: 3,
            title: 'Medida cintura',
            color: '#9B51E0',
            value: waist.toString(),
        },
    ];

    return (
        <Section>
            <SectionTitle>Medidas importantes</SectionTitle>

            <ViewImageInfo>
                <ImageSizeImport
                    source={
                        gender === 'feminino'
                            ? require('@/assets/importSizes.png')
                            : require('@/assets/StatusWeight/male/Ricardo.png')
                    }
                />

                <TextsContainer>
                    {data.map(item => (
                        <ViewTextsSizes key={item.id}>
                            <TextTitle>{item.title}</TextTitle>

                            <ViewTextSize>
                                <TextSize color={item.color}>{item.value}</TextSize>
                                <TextCm>cm</TextCm>
                            </ViewTextSize>
                        </ViewTextsSizes>
                    ))}
                </TextsContainer>
            </ViewImageInfo>
        </Section>
    );
};
