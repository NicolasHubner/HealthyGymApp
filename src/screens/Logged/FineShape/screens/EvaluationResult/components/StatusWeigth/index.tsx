import { useState } from 'react';
import { Section, SectionTitle } from '../../styles';
import { ImageWeight, TextPressables, ViewBox, ViewBoxSelectWeight, ViewBoxWeight } from './style';

export const StatusWeigth: React.FC = () => {
    const [status, setStatus] = useState('normal');

    const data = [
        {
            id: 1,
            status: 'abaixo',
            image: require('@/assets/StatusWeight/abaixo.png'),
            color: '#FFF3CE',
            text: 'Abaixo',
            colorText: '#C9A331',
        },
        {
            id: 2,
            status: 'normal',
            image: require('@/assets/StatusWeight/normal.png'),
            text: 'Normal',
            color: '#E2FFE3',
            colorText: '#27B22B',
        },
        {
            id: 3,
            status: 'acima',
            image: require('@/assets/StatusWeight/acima.png'),
            text: 'Acima',
            color: '#FFC0C0',
            colorText: '#EB5757',
        },
    ];

    return (
        <Section>
            <SectionTitle>Status de massa</SectionTitle>
            <ViewBoxSelectWeight>
                {data.map(item => (
                    <ViewBox key={item.id}>
                        <TextPressables color={status === item.status ? item.colorText : ''}>
                            {item.text}
                        </TextPressables>
                        <ViewBoxWeight
                            bgColor={status === item.status ? item.color : 'transparent'}>
                            <ImageWeight source={item.image} />
                        </ViewBoxWeight>
                    </ViewBox>
                ))}
            </ViewBoxSelectWeight>
        </Section>
    );
};
