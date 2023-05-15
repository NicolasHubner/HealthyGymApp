import { SituacaoPeso } from '../../helpers/calculateMass';
import { calcularVisceral } from '../../helpers/calculateVisceral';
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

interface ImportValuesProps {
    massMuscule: {
        percentil: number;
        ideal: number;
        range: string;
        intervalo: string;
    };
    massFat: SituacaoPeso;
    visceralFat: number;
    fat: number;
}

export const ImportValues = ({ massMuscule, massFat, visceralFat, fat }: ImportValuesProps) => {
    const values = [
        {
            color: '#FFF3CE',
            textPrincipal: massMuscule.percentil.toString(),
            type: '%',
            textSecondary: massMuscule.intervalo,
            textSecondaryTitle: 'Massa muscular',
            subtitle:
                'É a quantidade de músculos no nosso corpo. É importante para a saúde e aparência atlética.',
            colorText: '#C9A331',
            ideal: `${massMuscule.range.replace('-', ' à ')}%`,
        },
        {
            color: '#E2FFE3',
            colorText: '#27B22B',
            textPrincipal: fat,
            type: '%',
            textSecondaryTitle: 'Gordura Corporal',
            subtitle:
                'É a quantidade de gordura que temos no nosso corpo. Em excesso pode causar problemas de saúde.',
            textSecondary: massFat.situacao,
            ideal: `${massFat.intervaloIdeal}%`,
        },
        {
            color: '#FFEAE5',
            colorText: '#BF3D3D',
            textPrincipal: visceralFat.toString(),
            type: ' ',
            ideal: '1 à 2',
            textSecondary: calcularVisceral(visceralFat).type,
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
