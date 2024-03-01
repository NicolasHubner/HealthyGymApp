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
    const colorSituation = (situacao: string) => {
        switch (situacao) {
            case 'Abaixo':
                return {
                    color: '#FFF3CE',
                    colorText: '#C9A331',
                };
            case 'Ótimo':
                return {
                    color: '#E2FFE3',
                    colorText: '#27B22B',
                };
            case 'Normal':
                return {
                    color: '#E2FFE3',
                    colorText: '#27B22B',
                };
            case 'Acima':
                return {
                    color: '#FFEAE5',
                    colorText: '#BF3D3D',
                };
            default:
                return {
                    color: '#FFEAE5',
                    colorText: '#C9A331',
                };
        }
    };

    const calcularVisceralColor = (viscFat: number) => {
        if (viscFat < 4) {
            return {
                color: '#E2FFE3',
                colorText: '#27B22B',
            };
        } else if (viscFat >= 4 && viscFat <= 9) {
            return {
                color: '#FFF3CE',
                colorText: '#C9A331',
            };
        } else if (viscFat >= 10 && viscFat <= Infinity) {
            return {
                color: '#FFEAE5',
                colorText: '#BF3D3D',
            };
        }
        return {
            color: '#FFEAE5',
            colorText: '#BF3D3D',
        };
    };

    const values = [
        {
            color: colorSituation(massMuscule.intervalo).color,
            colorText: colorSituation(massMuscule.intervalo).colorText,
            textPrincipal: massMuscule.percentil.toString(),
            type: '%',
            textSecondary: massMuscule.intervalo,
            textSecondaryTitle: 'Massa muscular',
            subtitle:
                'É a quantidade de músculos no nosso corpo. É importante para a saúde e aparência atlética.',
            ideal: `${massMuscule.range.replace('-', ' à ')}%`,
        },
        {
            color: colorSituation(massFat.situacao).color,
            colorText: colorSituation(massFat.situacao).colorText,
            textPrincipal: fat,
            type: '%',
            textSecondaryTitle: 'Gordura Corporal',
            subtitle:
                'É a quantidade de gordura que temos no nosso corpo. Em excesso pode causar problemas de saúde.',
            textSecondary: massFat.situacao,
            ideal: `${massFat.intervaloIdeal}%`,
        },
        {
            color: calcularVisceralColor(visceralFat).color,
            colorText: calcularVisceralColor(visceralFat).colorText,
            textPrincipal: visceralFat.toString(),
            type: ' ',
            ideal: '1 à 2',
            textSecondary: calcularVisceral(visceralFat)?.type,
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
