import { FoodCard } from '@/components/molecules/FoodCard';
import { IFood } from '@/screens/Logged/Food/Daily/helpers/functions';
import { Fragment, useCallback } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {
    Box,
    BoxButtonPlus,
    BoxCardFooter,
    BoxCardFooterLink,
    BoxCardFooterText,
    BoxContent,
    BoxHeader,
    BoxHeaderWrapper,
    BoxKcal,
    BoxKcalText,
    BoxTitle,
    BoxTitleContent,
    Divider,
    FlameIcon,
    PlusIcon,
} from './styles';

const DATA = [0, 1, 2];

interface FoodBoxContent {
    title: string;
    data: IFood[];
}

export function FoodBoxContent({ title, data }: FoodBoxContent) {
    const renderDivider = useCallback(() => <Divider />, []);

    return (
        <Box>
            <BoxHeaderWrapper>
                <BoxHeader>
                    <BoxTitle>{title ?? 'Café da manhã'}</BoxTitle>
                    {/* <BoxTitleContent>
                        <FlameIcon />
                        <BoxKcal>120</BoxKcal>
                        <BoxKcalText>kcal / 450 kcal</BoxKcalText>
                    </BoxTitleContent> */}
                </BoxHeader>

                <TouchableOpacity>
                    <BoxButtonPlus>
                        <PlusIcon />
                    </BoxButtonPlus>
                </TouchableOpacity>
            </BoxHeaderWrapper>

            <Divider />

            <BoxContent>
                {data.map((item, index) => (
                    <Fragment key={index}>
                        <FoodCard key={index} data={item} />
                        {index !== data.length - 1 && renderDivider()}
                    </Fragment>
                ))}
            </BoxContent>

            <Divider />

            {/* <BoxCardFooter>
                <BoxCardFooterText>
                    Sua sopa de abóbora é rica em carboidratos. Tente substituir…
                </BoxCardFooterText>
                <BoxCardFooterLink>Veja mais</BoxCardFooterLink>
            </BoxCardFooter> */}
        </Box>
    );
}
