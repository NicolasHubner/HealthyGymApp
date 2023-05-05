import { Section, SectionTitle } from '../../styles';
import {
    ContainerTexts,
    TextDescription,
    TextDescriptionIdeal,
    TextPrincipalValue,
    TextSecondaryValue,
    TextSecondaryValueTitle,
    TextTitle,
    ViewCotainerValues,
    ViewMostImportantValues,
    ViewText,
    ViewValues,
} from './style';

export const ImportValues: React.FC = () => {
    const values = [
        {
            color: '#FFF3CE',
            textPrincipal: '12',
            type: 'kg',
            textSecondary: 'Está abaixo',
            textSecondaryTitle: 'Massa muscular',
            subtitle:
                'É a quantidade de músculos no nosso corpo. É importante para a saúde e aparência atlética.',
            colorText: '#C9A331',
            ideal: '24 à 30,3kg',
        },
        {
            color: '#E2FFE3',
            colorText: '#27B22B',
            textPrincipal: '22',
            type: '%',
            textSecondaryTitle: 'Gordura Corporal',
            subtitle:
                'É a quantidade de gordura que temos no nosso corpo. Em excesso pode causar problemas de saúde.',
            textSecondary: 'Ótimo',
            ideal: '21 à 32,9%',
        },
        {
            color: '#FFEAE5',
            colorText: '#BF3D3D',
            textPrincipal: '8',
            type: ' ',
            ideal: '1 à 2',
            textSecondary: 'Está acima',
            subtitle:
                'É a gordura localizada em torno dos órgãos internos na região abdominal. É considerada a mais perigosa.',
            textSecondaryTitle: 'Gordura Visceral',
        },
    ];

    return (
        <Section>
            <SectionTitle>Valores importantes</SectionTitle>
            <ViewMostImportantValues>
                {values.map((value, index) => (
                    <ViewCotainerValues key={index} color={value.color}>
                        <ViewValues>
                            <ViewText>
                                <TextPrincipalValue color={value.colorText}>
                                    {value.textPrincipal}
                                </TextPrincipalValue>
                                <TextSecondaryValueTitle color={value.colorText}>
                                    {value.type}
                                </TextSecondaryValueTitle>
                            </ViewText>
                            <TextSecondaryValue color={value.colorText}>
                                {value.textSecondary}
                            </TextSecondaryValue>
                        </ViewValues>

                        <ContainerTexts>
                            <TextTitle color={value.colorText}>
                                {value.textSecondaryTitle}
                            </TextTitle>

                            <TextDescription color={value.colorText}>
                                {value.subtitle}
                            </TextDescription>

                            <TextDescriptionIdeal color={value.colorText}>
                                Ideal: {value.ideal}
                            </TextDescriptionIdeal>
                        </ContainerTexts>
                    </ViewCotainerValues>
                ))}
            </ViewMostImportantValues>
        </Section>
    );
};
