import { generateRandomUuid } from '@/helpers/functions/generateUuid';
import { ContentBody, IconWrapper, InfoRow, InfoTitle, InfoValue } from './styles';

import ListIcon from '@/assets/svg/coach/students/list.svg';
import ClothIcon from '@/assets/svg/coach/students/cloth.svg';
import DoubleArrowIcon from '@/assets/svg/coach/students/double-arrow-top-bottom.svg';
// import HandStopIcon from '@/assets/svg/coach/students/hand-stop.svg';
// import BottleIcon from '@/assets/svg/coach/students/bottle.svg';
// import DollarIcon from '@/assets/svg/coach/students/dollar.svg';
import { StudentDetails } from '@/types/coach/Students';
import { parseHeight } from '@/helpers/functions/metrics/parseHeight';

interface ContentInfoProps {
    user: StudentDetails;
}

export function ContentInfo({ user }: ContentInfoProps) {
    const detailsList = [
        {
            id: generateRandomUuid(),
            title: 'Sexo',
            value: user?.gender === 'M' ? 'Masculino' : 'Feminino',
            Icon: ListIcon,
        },
        {
            id: generateRandomUuid(),
            title: 'Peso',
            value: `${user?.weight ?? 60}kg`,
            Icon: ClothIcon,
        },
        {
            id: generateRandomUuid(),
            title: 'Altura',
            value: parseHeight(user?.height),
            Icon: DoubleArrowIcon,
        },
        // {
        //     id: generateRandomUuid(),
        //     title: 'Engajamento',
        //     value: user?.engagement ?? 'Médio',
        //     Icon: HandStopIcon,
        // },
        // {
        //     id: generateRandomUuid(),
        //     title: 'Suplementa',
        //     value: user?.supplement ?? 'Não',
        //     Icon: BottleIcon,
        // },
        // {
        //     id: generateRandomUuid(),
        //     title: 'Mensalidade',
        //     value: user?.monthlyFeeStatus ?? 'Em dia',
        //     Icon: DollarIcon,
        // },
    ];

    return (
        <ContentBody>
            {detailsList.map(({ Icon, ...detail }) => (
                <InfoRow key={detail.id}>
                    <IconWrapper>
                        <Icon />
                    </IconWrapper>
                    <InfoTitle>{detail.title}</InfoTitle>
                    <InfoValue>{detail.value}</InfoValue>
                </InfoRow>
            ))}
        </ContentBody>
    );
}
