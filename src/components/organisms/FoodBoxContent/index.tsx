import { FoodCard } from '@/components/molecules/FoodCard';
import { IFood } from '@/screens/Logged/Food/Daily/helpers/functions';
import { Fragment, useCallback } from 'react';

import {
    Box,
    BoxButtonPlus,
    // BoxCardFooter,
    // BoxCardFooterLink,
    // BoxCardFooterText,
    BoxContent,
    BoxHeader,
    BoxHeaderWrapper,
    // BoxKcal,
    // BoxKcalText,
    BoxTitle,
    // BoxTitleContent,
    Divider,
    // FlameIcon,
    PlusIcon,
} from './styles';
import { useNavigation } from '@react-navigation/native';
import { INavigation } from '@/helpers/interfaces/INavigation';
import { RouteNames } from '@/routes/routes_names';
import { TouchableOpacity } from 'react-native-gesture-handler';

// const DATA = [0, 1, 2];

interface FoodBoxContent {
    title: string;
    data: IFood[];
    dataTotal?: IFood[];
}

export function FoodBoxContent({ title, data, dataTotal }: FoodBoxContent) {
    const renderDivider = useCallback(() => <Divider />, []);
    const navigate = useNavigation() as INavigation;

    let sorted: IFood[] = [];

    if (dataTotal && dataTotal.length > 0) {
        sorted = dataTotal.sort((a, b) => {
            return a?.attributes?.title?.localeCompare(b?.attributes?.title);
        });
    }

    return (
        <Box style={!dataTotal && { marginBottom: 64 }}>
            {dataTotal && dataTotal.length > 0 && (
                <>
                    <BoxHeaderWrapper>
                        <BoxHeader>
                            <BoxTitle>{title ?? 'Café da manhã'}</BoxTitle>
                            {/* <BoxTitleContent>
                        <FlameIcon />
                        <BoxKcal>120</BoxKcal>
                        <BoxKcalText>kcal / 450 kcal</BoxKcalText>
                    </BoxTitleContent> */}
                        </BoxHeader>
                        <TouchableOpacity
                            onPress={() =>
                                navigate.navigate(RouteNames.logged.food.searchFood, {
                                    title: title ?? 'Café da manhã',
                                    data: sorted,
                                })
                            }>
                            <BoxButtonPlus>
                                <PlusIcon />
                            </BoxButtonPlus>
                        </TouchableOpacity>
                    </BoxHeaderWrapper>

                    <Divider />
                </>
            )}

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
