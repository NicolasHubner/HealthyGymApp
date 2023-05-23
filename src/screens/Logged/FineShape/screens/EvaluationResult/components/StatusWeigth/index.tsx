import { useEffect, useState } from 'react';
import { Section, SectionTitle } from '../../styles';
import { ImageWeight, TextPressables, ViewBox, ViewBoxSelectWeight, ViewBoxWeight } from './style';

interface StatusWeigthProps {
    status: string;
    gender: string;
}

export const StatusWeigth = ({ status, gender }: StatusWeigthProps) => {
    const [statuss, setStatus] = useState('normal');

    useEffect(() => {
        setStatus(status);
    }, [status]);
    // console.log('gender', status);
    const data = [
        {
            id: 1,
            status: 'Abaixo',
            image:
                gender === 'feminino'
                    ? require('@/assets/StatusWeight/abaixo.png')
                    : require('@/assets/StatusWeight/male/abaixoMale.png'),
            color: '#FFF3CE',
            text: 'Abaixo',
            colorText: '#C9A331',
        },
        {
            id: 2,
            status: 'Normal',
            image:
                gender === 'feminino'
                    ? require('@/assets/StatusWeight/normal.png')
                    : require('@/assets/StatusWeight/male/normalMale.png'),
            text: 'Normal',
            color: '#E2FFE3',
            colorText: '#27B22B',
        },
        {
            id: 3,
            status: 'Acima',
            image:
                gender === 'feminino'
                    ? require('@/assets/StatusWeight/acima.png')
                    : require('@/assets/StatusWeight/male/acimaMale.png'),
            text: 'Acima',
            color: '#FFC0C0',
            colorText: '#EB5757',
        },
    ];
    // console.log(statuss);
    return (
        <Section>
            <SectionTitle>Status de massa</SectionTitle>
            <ViewBoxSelectWeight>
                {data.map(item => (
                    <ViewBox key={item.id}>
                        <TextPressables color={statuss === item.status ? item.colorText : ''}>
                            {item.text}
                        </TextPressables>
                        <ViewBoxWeight
                            bgColor={statuss === item.status ? item.color : 'transparent'}>
                            <ImageWeight source={item.image} />
                        </ViewBoxWeight>
                    </ViewBox>
                ))}
            </ViewBoxSelectWeight>
        </Section>
    );
};
